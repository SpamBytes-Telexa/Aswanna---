import google.generativeai as genai

# Load API Key
GEMINI_API_KEY = "AIzaSyDUxPhoax4CvZ2F3Ek20kDmjOHPINoF5RI"
genai.configure(api_key=GEMINI_API_KEY)

# Load Gemini model
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

def get_gemini_response(query: str) -> str:
    try:
        response = model.generate_content(query)
        return response.text
    except Exception as e:
        return f"Error while getting Gemini response: {str(e)}"
