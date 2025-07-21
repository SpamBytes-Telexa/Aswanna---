from fastapi import APIRouter, HTTPException
from maduni2.hybrid_chatbot import HybridChatbot, ChatRequest, ChatResponse

router = APIRouter()

chatbot = HybridChatbot()

# API Endpoint
@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Endpoint for frontend to call"""
    try:
        return await chatbot.get_response(request.question)
    except Exception as e:
        print(f"🔥 Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error. Check server logs.")