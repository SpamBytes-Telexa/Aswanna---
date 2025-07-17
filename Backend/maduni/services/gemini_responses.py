import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

genai.configure(api_key=GEMINI_API_KEY)
gemini_client = genai.GenerativeModel("gemini-2.0-flash")

def generate_response(query: str) -> str:
    
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
        response = gemini_client.generate_content(prompt)
        if hasattr(response, "text") and response.text:
            return response.text
        else:
            return "Sorry, something went wrong. Please try again later."
    except Exception as e:
        print(f"Error generating response: {e}")
        return "Sorry, something went wrong. Please try again later."
    
def translate_si_to_en(text: str) -> str:
    prompt = (
        f"You are a translation assistant. Translate the following text from Sinhala to English.\n"
        f"Use simple English words so that it is easy to understand.\n"
        f"Text: {text}\n"
        f"Translation:"
    )
    try:
        response = gemini_client.generate_content(prompt)
        if hasattr(response, "text") and response.text:
            return response.text.strip()
        else:
            return "⚠️ Could not generate a translation."
    except Exception as e:
        print(f"Error: {e}")
        return "⚠️ Error while translating Sinhala to English."

def translate_en_to_si(text: str) -> str:
    prompt = (
        f"You are a translation assistant. Translate the following text from English to Sinhala.\n"
        f"Use simple Sinhala that even a low-literacy person can understand.\n"
        f"- Always provide prices in Sri Lankan Rupees (LKR). If the user or content mentions prices in USD, $, €, etc., convert it to LKR and say so clearly. 💱\n"
        f"Text: {text}\n"
        f"Translation:"
    )
    try:
        response = gemini_client.generate_content(prompt)
        if hasattr(response, "text") and response.text:
            return response.text.strip()
        else:
            return "⚠️ Could not generate a translation."
    except Exception as e:
        print(f"Error: {e}")
        return "⚠️ Error while translating English to Sinhala."

