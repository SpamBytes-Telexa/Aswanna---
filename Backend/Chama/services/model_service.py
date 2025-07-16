import joblib
import numpy as np
import requests
import os
import logging
from typing import Tuple, Optional
from ..models.schemas import ModelInputs
from ..core.config import settings

logger = logging.getLogger(__name__)

class ModelService:
    """Service for ML model operations"""
    
    def __init__(self):
        self.crop_model = None
        self.crop_mapping = {
            "rice": "සහල්",
            "maize": "ඉරිඟු", 
            "sugarcane": "උක්",
            "wheat": "තිරිඟු",
            "cotton": "කපු",
            "groundnut": "රටකජු",
            "coconut": "පොල්",
            "tea": "තේ",
            "rubber": "රබර්",
            "banana": "කෙසෙල්",
            "mango": "අඹ",
            "papaya": "පැපොල්",
            "tomato": "තක්කාලි",
            "potato": "අල",
            "onion": "ලූණු"
        }
    
    async def initialize(self):
        """Initialize the model service"""
        await self.load_model()
    
    async def load_model(self):
        """Load the ML model from GitHub release or local file"""
        try:
            # Try to load from local file first
            if os.path.exists(settings.MODEL_PATH):
                self.crop_model = joblib.load(settings.MODEL_PATH)
                logger.info("Model loaded from local file")
                return
            
            # Download from GitHub release
            logger.info(f"Downloading model from {settings.MODEL_URL}")
            
            response = requests.get(settings.MODEL_URL)
            if response.status_code == 200:
                with open(settings.MODEL_PATH, "wb") as f:
                    f.write(response.content)
                self.crop_model = joblib.load(settings.MODEL_PATH)
                logger.info("Model downloaded and loaded successfully")
            else:
                logger.error(f"Failed to download model: {response.status_code}")
                self.crop_model = None
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            self.crop_model = None
    
    def is_model_loaded(self) -> bool:
        """Check if model is loaded"""
        return self.crop_model is not None
    
    def is_gemini_configured(self) -> bool:
        """Check if Gemini is configured"""
        return settings.GEMINI_API_KEY is not None and settings.GEMINI_API_KEY != ""
    
    def predict_crop(self, model_inputs: ModelInputs) -> Tuple[str, float]:
        """Predict crop using the ML model or fallback"""
        if self.crop_model is None:
            return self._predict_crop_fallback(model_inputs)
        
        try:
            # Prepare input array for the model
            input_array = np.array([[
                model_inputs.N,
                model_inputs.P,
                model_inputs.K,
                model_inputs.temperature,
                model_inputs.humidity,
                model_inputs.ph,
                model_inputs.rainfall
            ]])
            
            # Get prediction
            prediction = self.crop_model.predict(input_array)[0]
            
            # Get prediction probabilities for confidence
            if hasattr(self.crop_model, 'predict_proba'):
                probabilities = self.crop_model.predict_proba(input_array)[0]
                confidence = float(np.max(probabilities) * 100)
            else:
                confidence = 85.0  # Default confidence
            
            # Convert to Sinhala if needed
            sinhala_crop = self.crop_mapping.get(prediction.lower(), prediction)
            
            logger.info(f"Model prediction: {prediction} -> {sinhala_crop} (confidence: {confidence}%)")
            return sinhala_crop, confidence
            
        except Exception as e:
            logger.error(f"Error in model prediction: {e}")
            return self._predict_crop_fallback(model_inputs)
    
    def _predict_crop_fallback(self, model_inputs: ModelInputs) -> Tuple[str, float]:
        """Fallback rule-based crop prediction"""
        
        temp = model_inputs.temperature
        humidity = model_inputs.humidity
        rainfall = model_inputs.rainfall
        ph = model_inputs.ph
        
        # Rule-based prediction logic
        if temp > 26 and humidity > 75 and rainfall > 150:
            if ph < 6.5:
                crop = "rice"
            else:
                crop = "sugarcane"
        elif temp > 24 and humidity > 60:
            if model_inputs.N > 70:
                crop = "maize"
            elif rainfall > 120:
                crop = "banana"
            else:
                crop = "coconut"
        elif temp < 22 and rainfall > 100:
            if ph < 6.0:
                crop = "tea"
            else:
                crop = "wheat"
        elif temp > 28 and humidity < 50:
            crop = "cotton"
        else:
            if model_inputs.P > 50:
                crop = "groundnut"
            else:
                crop = "mango"
        
        sinhala_crop = self.crop_mapping.get(crop, crop)
        confidence = 75.0  # Default confidence for rule-based
        
        logger.info(f"Fallback prediction: {crop} -> {sinhala_crop} (confidence: {confidence}%)")
        return sinhala_crop, confidence
