import requests
from maduni.services.gemini_module import get_gemini_response


# ---- Option 1: Using Gemini for Translation (Recommended) ----
def translate_to_english(sinhala_text: str) -> str:
    """Translates Sinhala → English using Gemini."""
    prompt = f"Translate this Sinhala text to English: '{sinhala_text}'. Return only the translation."
    return get_gemini_response(prompt)  # Reuse your existing Gemini function

def translate_to_sinhala(english_text: str) -> str:
    """Translates English → Sinhala using Gemini."""
    prompt = f"Translate this English text to Sinhala: '{english_text}'. Return only the translation."
    return get_gemini_response(prompt)

# ---- Option 2: Using Google Translate API (Alternative) ----
# Requires `googletrans` (pip install googletrans==4.0.0-rc1)
"""
from googletrans import Translator

def translate_to_english(sinhala_text: str) -> str:
    translator = Translator()
    result = translator.translate(sinhala_text, src='si', dest='en')
    return result.text

def translate_to_sinhala(english_text: str) -> str:
    translator = Translator()
    result = translator.translate(english_text, src='en', dest='si')
    return result.text
"""