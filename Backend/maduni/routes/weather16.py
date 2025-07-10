from fastapi import APIRouter, Query
import requests

router = APIRouter()

OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

def decode_weathercode(code):
    if code == 0:
        return "Sunny"
    elif code in [1, 2, 3]:
        return "Cloudy"
    elif code in [45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]:
        return "Rainy"
    else:
        return "Unknown"

@router.get("/forecast")
async def get_weather_forecast(
    lat: float = Query(..., description="Latitude of the location"),
    lon: float = Query(..., description="Longitude of the location")
):
    try:
        response = requests.get(
            OPEN_METEO_URL,
            params={
                "latitude": lat,
                "longitude": lon,
                "daily": [
                    "temperature_2m_max",
                    "temperature_2m_min",
                    "weathercode",
                    "precipitation_sum",
                    "windspeed_10m_max"
                ],
                "forecast_days": 16,
                "timezone": "auto"
            }
        )

        if response.status_code != 200:
            return {
                "status": "error",
                "code": response.status_code,
                "details": response.text
            }

        data = response.json()
        forecast = []

        for i in range(len(data["daily"]["time"])):
            forecast.append({
                "date": data["daily"]["time"][i],
                "max_temp": data["daily"]["temperature_2m_max"][i],
                "min_temp": data["daily"]["temperature_2m_min"][i],
                "weather": decode_weathercode(data["daily"]["weathercode"][i]),
                "precipitation_mm": data["daily"]["precipitation_sum"][i],
                "wind_speed_kmh": data["daily"]["windspeed_10m_max"][i]
            })

        return {
            "status": "success",
            "location": {
                "latitude": lat,
                "longitude": lon
            },
            "forecast": forecast
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
