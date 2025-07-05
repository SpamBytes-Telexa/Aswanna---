import httpx

TAVILY_API_KEY = "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"

def get_tavily_response(query: str) -> str:
    url = "https://api.tavily.com/search"
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "api_key": TAVILY_API_KEY,
        "query": query,
        "search_depth": "basic",  # or "advanced"
        "include_answer": True
    }

    try:
        response = httpx.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data.get("answer", "No answer found.")
    except Exception as e:
        return f"Error getting Tavily response: {str(e)}"
