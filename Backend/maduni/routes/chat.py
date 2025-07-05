from fastapi import APIRouter
from maduni.chatmodel import ChatRequest
from maduni.services.llama_classifier import classify_query
from maduni.services.gemini_module import get_gemini_response
from maduni.services.tavily_module import get_tavily_response
from maduni.services.translate_module import translate_to_sinhala

router = APIRouter()

@router.post("/chat")
async def chatbot(request: ChatRequest):
    query_type = classify_query(request.query)

    if query_type in ["legal", "prices"]:
        response = get_tavily_response(request.query)
    else:
        response = get_gemini_response(request.query)

    if request.language == "සිංහල":
        response = translate_to_sinhala(response)

    return {"response": response}
