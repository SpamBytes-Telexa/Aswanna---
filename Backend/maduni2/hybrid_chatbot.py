from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda
from .gemini_handler import GeminiHandler
from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str
    #user_id: Optional[str] = None  # Optional user identifier

# Response model
class ChatResponse(BaseModel):
    response: str
    source: str  # "chromadb" or "gemini"
    success: bool

def gemini_run(prompt: str) -> str:
    return GeminiHandler().generate_response(prompt)

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
        
        # Load Chroma DB
        self.vectorstore = Chroma(
            persist_directory="maduni2/chroma_price_db",
            embedding_function=self.embedding
        )

        
                
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
            | RunnableLambda(gemini_run)
        )
    
    def is_price_query(self, query: str) -> bool:
        """Determine if query is price-related"""
        price_keywords = [
            "price", "cost", "pricing", "how much", "fee",
            "LKR", "rupees", "rate", "charges"
        ]
        query_lower = query.lower()
        return any(keyword in query_lower for keyword in price_keywords)

        
    async def get_response(self, question: str) -> ChatResponse:
        print(f"🟡 Received question: {question}")
        try:
            if self.is_price_query(question):
                print("🟢 Detected price-related query.")
                result = await self.price_chain.ainvoke(question)
                return ChatResponse(
                    response=result,
                    source="chromadb",
                    success=True
                )
            else:
                result = self.gemini.generate_response(question)
                print("🟣 Detected general (Gemini) query.")
                return ChatResponse(
                    response=result,
                    source="gemini",
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
