import httpx
import os
from dotenv import load_dotenv

load_dotenv()

class TavilyHandler:
    def __init__(self):
        self.api_key = os.getenv('TAVILY_API_KEY')
        self.url = "https://api.tavily.com/search"
        self.headers = {"Content-Type": "application/json"}

    def get_response(self, query: str) -> str:
        payload = {
            "api_key": self.api_key,
            "query": query,
            "search_depth": "basic",  # or "advanced"
            "include_answer": True
        }

        try:
            response = httpx.post(self.url, json=payload, headers=self.headers, timeout=10)
            response.raise_for_status()
            data = response.json()
            return data.get("answer", "No answer found.")
        except Exception as e:
            return f"Error getting Tavily response: {str(e)}"
