import google.generativeai as genai
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

class GeminiHandler:
    def __init__(self):
        GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
        genai.configure(api_key=GEMINI_API_KEY)
        self.client = genai.GenerativeModel("gemini-2.0-flash")
    
    def generate_response(self, query: str) -> str:
        prompt = (
            f"You are AgroBot, an AI assistant for agriculture in Sri Lanka. 🌾\n"
            f"- Always provide prices in Sri Lankan Rupees (LKR). If the user or content mentions prices in USD, $, €, etc., convert it to LKR and say so clearly. 💱\n"
            f"- Give information based on Sri Lankan climate, regions, farming practices, and laws. Mention district-specific or province-specific info if location is mentioned. 📍\n"
            f"- Use simple, easy-to-read language that a low-literacy farmer can understand. 👨‍🌾\n"
            f"- Format the answer in short bullet points or line by line, like a conversation in a chat. 📝\n"
            f"- Use emojis where helpful to make it more friendly and easy to read. 😊\n"
            f"Question: {query}\n"
            f"Response:"
        )
        try:
            response = self.client.generate_content(prompt)
            return response.text if hasattr(response, "text") and response.text else self._fallback_response()
        except Exception as e:
            print(f"Error generating response: {e}")
            return self._fallback_response()
    
    def translate_si_to_en(self, text: str) -> Optional[str]:
        prompt = (
            f"You are a translation assistant. Translate the following text from Sinhala to English.\n"
            f"Use simple English words so that it is easy to understand.\n"
            f"Text: {text}\n"
            f"Translation:"
        )
        return self._safe_translate(prompt)
    
    def translate_en_to_si(self, text: str) -> Optional[str]:
        prompt = (
            f"You are a translation assistant. Translate the following text from English to Sinhala.\n"
            f"Use simple Sinhala that even a low-literacy person can understand.\n"
            f"- Always provide prices in Sri Lankan Rupees (LKR). If the user or content mentions prices in USD, $, €, etc., convert it to LKR and say so clearly. 💱\n"
            f"Text: {text}\n"
            f"Translation:"
        )
        return self._safe_translate(prompt)
    
    def _safe_translate(self, prompt: str) -> Optional[str]:
        try:
            response = self.client.generate_content(prompt)
            return response.text.strip() if hasattr(response, "text") and response.text else None
        except Exception as e:
            print(f"Translation error: {e}")
            return None
    
    def _fallback_response(self) -> str:
        return "Sorry, something went wrong. Please try again later."