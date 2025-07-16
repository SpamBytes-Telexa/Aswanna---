import requests
import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY')


def classify_query(query: str) -> str:
    prompt = f"""
You are a smart classifier that labels user queries into 3 categories:
- "legal" if the question is about rules, law, or regulations.
- "prices" if the question is about costs, payments, or pricing.
- "other" if it's anything else.

Only return the label. Do not explain.

Query: "{query}"
Label:"""

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama3-8b-8192",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0,
            "max_tokens": 5,
        }
    )

    try:
        label = response.json()["choices"][0]["message"]["content"].strip().lower()
    except Exception as e:
        print("Error:", e)
        print("Response:", response.json())
        return "other"  # fallback

    # Normalize and match
    if "legal" in label:
        return "legal"
    elif "price" in label:
        return "prices"
    else:
        return "other"
