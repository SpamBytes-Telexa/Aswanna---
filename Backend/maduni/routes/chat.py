from fastapi import APIRouter
from maduni.chatmodel import ChatRequest
from maduni.services.llama_classifier import classify_query
from maduni.services.gemini_module import get_gemini_response
from maduni.services.tavily_module import get_tavily_response
from maduni.services.translate_module import translate_to_sinhala, translate_to_english

router = APIRouter()

@router.post("/chat")
async def chatbot(request: ChatRequest):
    print(f"🔹 Incoming language: '{request.language}'")
    print(f"User input: {request.query}")
    
    # Step 1: Check if the query is in Sinhala and translate to English if needed
    if request.language == "sinhala":
        translated_query = translate_to_english(request.query)  # Sinhala → English
    else:
        translated_query = request.query  # Keep original (English)

    print(f"User input in sinhala: {translated_query}")

    # Step 2: Classify and get response (Gemini or Tavily)
    query_type = classify_query(translated_query)

    print(f"Type: {query_type}")
    
    if query_type in ["legal", "prices"]:
        response = get_tavily_response(translated_query)
    else:
        response = get_gemini_response(translated_query)

    print(f"User output: {response}")

    # Step 3: Translate response back to Sinhala if needed
    if request.language == "sinhala":
        response = translate_to_sinhala(response)  # English → Sinhala

    print(f"User output: {response}")

    return {"response": response}