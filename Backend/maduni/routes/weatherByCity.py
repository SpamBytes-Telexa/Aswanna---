from fastapi import APIRouter, Query
import requests

router = APIRouter()

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
WEATHER_API_KEY = "d8af54d3d4ebbd0aeb21c7247d84ae66"
WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@router.get("/weather-by-city")
async def get_weather_by_city(
    city: str = Query(..., description="City name to get weather"),
    lang: str = Query("en", description="Language of the response (en or si)"),
    units: str = Query("metric", description="Units (metric, imperial, or standard)")
):
    try:
        # Step 1: Get coordinates from city name
        nominatim_response = requests.get(
            NOMINATIM_URL,
            params={
                "q": city,
                "format": "json",
                "limit": 1
            },
            headers={
                "User-Agent": "YourAppName/1.0 (your-email@example.com)"
            }
        )
        if nominatim_response.status_code != 200:
            return {
                "status": "error",
                "code": nominatim_response.status_code,
                "details": nominatim_response.text
            }

        nominatim_data = nominatim_response.json()
        if not nominatim_data:
            return {
                "status": "error",
                "message": "City not found"
            }

        lat = nominatim_data[0]["lat"]
        lon = nominatim_data[0]["lon"]

        # Step 2: Get weather from coordinates
        weather_response = requests.get(
            WEATHER_BASE_URL,
            params={
                "lat": lat,
                "lon": lon,
                "appid": WEATHER_API_KEY,
                "units": units,
                "lang": lang
            }
        )
        if weather_response.status_code != 200:
            return {
                "status": "error",
                "code": weather_response.status_code,
                "details": weather_response.text
            }

        # Step 3: Return weather data with coordinates
        return {
            "status": "success",
            "data": {
                "city": city,
                "coordinates": {"lat": lat, "lon": lon},
                "weather": weather_response.json()
            }
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
