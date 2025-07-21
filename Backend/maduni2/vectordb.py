from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma

print("Start creating vector store!")

# Load embeddings
embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# Your price data
price_data = [
    {"name": "fertilizer", "content": "Urea fertilizer costs around 6500 LKR per 50kg bag."},
    {"name": "pesticide", "content": "Pesticides vary by type. The average is 2000 LKR per liter."},
    {"name": "rice_seed", "content": "Rice seeds cost about 120 LKR per kg depending on variety."}
]

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