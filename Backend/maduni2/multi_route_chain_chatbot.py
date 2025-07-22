from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.runnables import RunnableLambda, RunnableBranch, RunnableMap
from .gemini_handler import GeminiHandler
from .tavily_handler import TavilyHandler
from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str
    language: str

# Response model
class ChatResponse(BaseModel):
    response: str
    source: str  # "chromadb" or "gemini"
    success: bool

def debug_context_and_question(inputs):
    context, question = inputs["context"], inputs["question"]
    print("🔍 DEBUG – Raw context docs:\n", context)
    print("🔍 DEBUG – User question:\n", question)
    return {"context": context, "question": question}

class HybridChatbot:
    def __init__(self):
        # Initialize components
        self.embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.gemini = GeminiHandler()
        self.tavily = TavilyHandler()
        
        # Load Chroma DB
        self.vectorstore = Chroma(
            persist_directory="maduni2/chroma_price_db",
            embedding_function=self.embedding
        )

        #setup for classification
        classification_prompt = PromptTemplate.from_template(
            """
Classify the following question into one of the categories: "price" or "general" or "legal".

Question: {question}

Answer only with one word: "price" or "general or legal".
"""
        )
        self.classification_chain = (
            {"question": RunnablePassthrough()}
            | classification_prompt
            | RunnableLambda(lambda prompt: self.gemini.generate_response(prompt).strip().lower())
        )
        print("⚙️ Classification chain set up.")

        # Setup price retriever
        self.price_retriever = self.vectorstore.as_retriever(search_kwargs={"k": 5})
        self.price_prompt = ChatPromptTemplate.from_template(
            """You are an agricultural product pricing assistant. Answer based on:
            {context}
            
            Question: {question}
            
            If information isn't available, say "I don't have pricing information."
            Keep answers concise with prices in LKR."""
        )
        self.price_chain = (
            {"context": self.price_retriever, "question": RunnablePassthrough()}
            |RunnableLambda(debug_context_and_question)
            | self.price_prompt
            | RunnableLambda(lambda price_prompt: self.gemini.generate_response(price_prompt))
        )

        # 🌐 Gemini fallback chain
        self.gemini_direct_chain = RunnableLambda(lambda q: self.gemini.generate_response(q))

        self.tavily_direct_chain = RunnableLambda(lambda q: self.tavily.get_response(q))

        # conditional branching
        self.router_chain = RunnableBranch(
            (lambda x: x == "price", lambda _: self.price_chain),
            (lambda x: x == "legal", lambda _: self.tavily_direct_chain),
            lambda _: self.gemini_direct_chain
        )

        self.final_chain = (
            {"question": RunnablePassthrough()}
            | RunnableMap({
                "question": lambda q: q,
                "type": self.classification_chain
            })
            | (lambda input: {
                "answer": self.router_chain.invoke(input),
                "type": input["type"]})
        )
        print("⚙️ Final chain assembled.")
        
    async def get_response(self, question: str, language: str) -> ChatResponse:
        print(f"🟡 Received question: {question}")
        try:
            # Detect language (simple check for now, you can improve later)
            
            # 🔁 Translate Sinhala → English if needed
            if language == "sinhala":
                print("🌐 Detected Sinhala – Translating to English...")
                translated_question = self.gemini.translate_si_to_en(question)
                if not translated_question:
                    return ChatResponse(
                        response="⚠️ Failed to translate your question to English. Please try again.",
                        source="translation",
                        success=False
                    )
                print(f"🔁 Translated question: {translated_question}")
            else:
                translated_question = question

            # 🔍 Run through chain
            result = await self.final_chain.ainvoke(translated_question)
            answer = result["answer"]
            query_type = result["type"]

            sources = (
                "chromadb" if query_type == "price" else
                "tavily" if query_type == "legal" else
                "gemini"
            )

            # 🔁 Translate English answer back to Sinhala if needed
            if language == "sinhala":
                print("🔁 Translating answer back to Sinhala...")
                translated_answer = self.gemini.translate_en_to_si(answer)
                if not translated_answer:
                    return ChatResponse(
                        response="⚠️ Got the answer but failed to translate it to Sinhala. Please try again.",
                        source=sources,
                        success=False
                    )
                print(f"✅ Final translated answer: {translated_answer}")
                return ChatResponse(
                    response=translated_answer,
                    source=sources,
                    success=True
                )

            # 🟢 Return English response
            return ChatResponse(
                response=answer,
                source=sources,
                success=True
            )

        except Exception as e:
            import traceback
            traceback.print_exc()
            print(f"🔴 ERROR: {e}")
            return ChatResponse(
                response=f"Error processing request: {str(e)}",
                source="error",
                success=False
            )

    
        
    
        
