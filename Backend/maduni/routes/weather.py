from fastapi import APIRouter, Query
from pydantic import BaseModel
import requests
from maduni.services.translate_module import translate_to_sinhala, translate_to_english


router = APIRouter()

API_KEY = "d8af54d3d4ebbd0aeb21c7247d84ae66"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@router.get("/weather")
async def get_current_weather(
    lat: float = Query(..., description="Latitude of the location"),
    lon: float = Query(..., description="Longitude of the location"),
    lang: str = Query("en", description="Language of the response (en or si)"),
    units: str = Query("metric", description="Units (metric, imperial, or standard)")
):
    try:
        response = requests.get(
            BASE_URL,
            params={
                "lat": lat,
                "lon": lon,
                "appid": API_KEY,
                "units": units,
                "lang": lang
            }
        )

        if response.status_code != 200:
            return {
                "status": "error",
                "code": response.status_code,
                "details": response.text
            }

        return {
            "status": "success",
            "data": response.json()
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
    
class TextInput(BaseModel):
    text: str
    
@router.post("/sinhala-to-english")
async def sinhala_to_english(data: TextInput):
    translated = translate_to_english(data.text)
    return { "english": translated }

@router.post("/english-to-sinhala")
async def english_to_sinhala(data: TextInput):
    translated = translate_to_sinhala(data.text)
    return { "sinhala": translated }