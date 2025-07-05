from pydantic import BaseModel

class ChatRequest(BaseModel):
    language: str  # "English" or "සිංහල"
    query: str
