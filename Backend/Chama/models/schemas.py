from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class FormData(BaseModel):
    location: str
    soilType: str
    soilPH: str
    climate: str
    season: str
    experience: str

   

class ModelInputs(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    originalData: Optional[Dict[str, Any]] = None

class GeminiResponse(BaseModel):
    overview: Optional[str] = None
    benefits: Optional[List[str]] = None
    expectedResults: Optional[List[str]] = None
    plantingSchedule: Optional[str] = None
    seedPreparation: Optional[str] = None
    soilPreparation: Optional[str] = None
    watering: Optional[str] = None
    fertilizing: Optional[str] = None
    pestControl: Optional[str] = None
    tips: Optional[List[str]] = None
    additionalInfo: Optional[str] = None

class CropRecommendation(BaseModel):
    recommendedCrop: str
    confidence: float
    modelInputs: Dict[str, float]
    geminiResponse: Optional[GeminiResponse] = None

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    gemini_configured: bool

class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
