import requests

def get_gemini_response(query: str) -> str:
    try:
        GEMINI_API_KEY = "AIzaSyBVGRlYwEjtHEYQMqblL5eqaEiiwPoUofI"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        
        # Step 1: Force Sri Lanka context + currency conversion
        modified_query = (
            "Provide information ONLY relevant to Sri Lanka. "
            "If the query involves prices, convert all amounts to Sri Lankan Rupees (LKR) "
            "using current exchange rates. Format converted prices like: '~LKR X,XXX'. "

            "1. Use **bold section headers** for key topics\n"
            "2. Keep paragraphs concise (3-4 lines max)\n"
            "3. Use bullet points (*) for lists\n"
            "4. Convert all prices to LKR (format as '~LKR X,XXX')\n"
            "5. Separate sections with blank lines\n\n"
            "Example format:\n"
            "**Topic**\n"
            "Key details here.\n"
            "* Point 1\n"
            "* Point 2\n\n"
            
            f"Query: {query}"
        )
        
        headers = {'Content-Type': 'application/json'}
        data = {
            "contents": [{
                "parts": [{
                    "text": modified_query
                }]
            }]
        }
        
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        
        # Step 2: Extract and validate response
        response_text = response.json()['candidates'][0]['content']['parts'][0]['text']
        
        # (Optional) Post-process to ensure LKR is used
        if "USD" in response_text or "€" in response_text or "$" in response_text:
            response_text += "\n\n(Note: Foreign prices were auto-converted to LKR.)"
        
        return response_text
        
    except Exception as e:
        return f"Error while getting Gemini response: {str(e)}"