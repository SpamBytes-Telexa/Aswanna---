from fastapi import HTTPException
from typing import Optional

class CropRecommendationException(Exception):
    """Base exception for crop recommendation system"""
    pass

class ModelLoadException(CropRecommendationException):
    """Exception raised when model fails to load"""
    pass

class PredictionException(CropRecommendationException):
    """Exception raised during prediction"""
    pass

class GeminiException(CropRecommendationException):
    """Exception raised during Gemini AI operations"""
    pass

class MappingException(CropRecommendationException):
    """Exception raised during data mapping"""
    pass

def create_http_exception(
    status_code: int,
    message: str,
    detail: Optional[str] = None
) -> HTTPException:
    """Create HTTP exception with custom message"""
    return HTTPException(
        status_code=status_code,
        detail={"error": message, "detail": detail}
    )
