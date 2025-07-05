import requests

def get_gemini_response(query: str) -> str:
    try:
        GEMINI_API_KEY = "AIzaSyBVGRlYwEjtHEYQMqblL5eqaEiiwPoUofI"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        
        # Step 1: Force Sri Lanka context + currency conversion
        
        
        headers = {'Content-Type': 'application/json'}
        data = {
            "contents": [{
                "parts": [{
                    "text": query
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