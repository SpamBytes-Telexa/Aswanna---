from fastapi import APIRouter, Query
import requests

router = APIRouter()

API_KEY = "d8af54d3d4ebbd0aeb21c7247d84ae67"
BASE_URL = "https://pro.openweathermap.org/data/2.5/forecast/climate"

@router.get("/weather")
async def get_weather(lat: float = Query(...), lon: float = Query(...), days: int = Query(30)):
    """
    Returns the 30-day weather forecast for given coordinates (latitude & longitude).
    """

    print(f"📍 Getting weather for lat={lat}, lon={lon}, days={days}")

    params = {
        "lat": lat,
        "lon": lon,
        "cnt": days,
        "appid": API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(BASE_URL, params=params)
        if response.status_code == 200:
            data = response.json()
            print("✅ Weather data fetched successfully")
            return {"status": "success", "data": data}
        else:
            print(f"❌ Weather API failed: {response.status_code}")
            return {"status": "error", "code": response.status_code, "details": response.text}
    except Exception as e:
        print(f"🔥 Exception in weather API: {e}")
        return {"status": "error", "details": str(e)}
