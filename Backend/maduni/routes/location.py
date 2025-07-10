from fastapi import APIRouter, Query
import requests

router = APIRouter()

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"

@router.get("/get-coordinates")
async def get_coordinates(city: str = Query(..., description="City name to get coordinates")):
    try:
        print(f"Fetching coordinates for: {city}")
        response = requests.get(
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
        print(f"🌐Request URL: {response.url}")
        if response.status_code != 200:
            return {
                "status": "error",
                "code": response.status_code,
                "details": response.text
            }

        data = response.json()
        if not data:
            return {
                "status": "error",
                "message": "City not found"
            }

        lat = data[0]["lat"]
        lon = data[0]["lon"]
        print(f"✅ Coordinates: lat={lat}, lon={lon}") 

        return {
            "status": "success",
            "data": {
                "lat": lat,
                "lon": lon
            }
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
