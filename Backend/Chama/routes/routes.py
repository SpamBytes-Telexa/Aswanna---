from fastapi import APIRouter, HTTPException, Depends
from models.schemas import FormData, CropRecommendation, HealthResponse
from services.mapping_service import MappingService
from services.model_service import ModelService
from services.gemini_service import GeminiService
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

# Dependency injection
def get_mapping_service():
    return MappingService()

def get_model_service():
    return ModelService()

def get_gemini_service():
    return GeminiService()

@router.post("/recommend-crop", response_model=CropRecommendation)
async def recommend_crop(
    form_data: FormData,
    mapping_service: MappingService = Depends(get_mapping_service),
    model_service: ModelService = Depends(get_model_service),
    gemini_service: GeminiService = Depends(get_gemini_service)
):
    """Main endpoint for crop recommendation"""
    try:
        logger.info(f"Processing crop recommendation request for location: {form_data.location}")
        
        # Step 1: Map form inputs to model inputs
        model_inputs = mapping_service.map_form_to_model_inputs(form_data)
        
        # Step 2: Get crop prediction
        recommended_crop, confidence = model_service.predict_crop(model_inputs)
        
        # Step 3: Get detailed advice from Gemini
        gemini_response = await gemini_service.get_crop_advice(
            recommended_crop, form_data, model_inputs
        )
        
        # Step 4: Prepare response
        response = CropRecommendation(
            recommendedCrop=recommended_crop,
            confidence=confidence,
            modelInputs={
                "N": model_inputs.N,
                "P": model_inputs.P,
                "K": model_inputs.K,
                "temperature": model_inputs.temperature,
                "humidity": model_inputs.humidity,
                "ph": model_inputs.ph,
                "rainfall": model_inputs.rainfall
            },
            geminiResponse=gemini_response
        )
        
        logger.info(f"Successfully generated recommendation: {recommended_crop}")
        return response
        
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")