from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma

print("Start creating vector store!")

# Load embeddings
embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# Your price data
price_data = []
with open("price_data.txt", "r", encoding="utf-8") as f:
    for line in f:
        if ':' in line:
            name, content = line.strip().split(":", 1)
            price_data.append({
                "name": name.strip(),
                "content": content.strip()
            })

# Convert to Documents
docs = [
    Document(page_content=item["content"], metadata={"source": item["name"]})
    for item in price_data
]

# Create and persist vector store
vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=embedding,
    persist_directory="chroma_price_db"
)
vectorstore.persist()
print("Done creating vector store!")