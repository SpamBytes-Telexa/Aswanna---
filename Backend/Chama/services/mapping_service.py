from ..models.schemas import FormData, ModelInputs
import logging

logger = logging.getLogger(__name__)

class MappingService:
    """Service for mapping form data to model inputs"""
    
    def __init__(self):
        # Enhanced soil type to NPK mapping based on agricultural data
        self.soil_npk_mapping = {
            "clay": {"N": 85, "P": 60, "K": 45},      # Clay soils retain nutrients well
            "sandy": {"N": 40, "P": 35, "K": 20},     # Sandy soils drain quickly, lower nutrients
            "loam": {"N": 70, "P": 50, "K": 40},      # Balanced soil, good nutrient retention
            "silt": {"N": 65, "P": 45, "K": 35},      # Good water retention, moderate nutrients
            "chalky": {"N": 50, "P": 40, "K": 30},    # Alkaline, some nutrient limitations
            "peaty": {"N": 90, "P": 70, "K": 50}      # High organic matter, rich in nutrients
        }
        
        # Climate to temperature mapping (average temperatures in Celsius)
        self.climate_temp_mapping = {
            "hot": (28),
            "temperate": (18),
            "cold": (3),

        }
        
        # Climate to humidity mapping (percentage)
        self.climate_humidity_mapping = {
            "hot": 80,
            "temperate": 60,
            "cold": 30,
            
        }
        
        # Season to rainfall mapping (mm per month)
        self.season_rainfall_mapping = {
            "spring": 150,
            "yala": 80,
            "maha": 120,
            "year-round": 140
        }
        
        # pH mapping
        self.ph_mapping = {
            "acidic": 5.5,
            "neutral": 6.8,
            "alkaline": 7.8,
            
        }
    
    def map_form_to_model_inputs(self, form_data: FormData) -> ModelInputs:
        """Map form inputs to model expected inputs with realistic ranges"""
        
        try:
            # Get mapped values
            npk_values = self.soil_npk_mapping.get(
                form_data.soilType, 
                {"N": 60, "P": 45, "K": 35}
            )
            
            temperature = self.climate_temp_mapping.get(form_data.climate, 25)
            humidity = self.climate_humidity_mapping.get(form_data.climate, 65)
            rainfall = self.season_rainfall_mapping.get(form_data.season, 120)
            ph = self.ph_mapping.get(form_data.soilPH, 6.5)
            
            # Apply seasonal adjustments to temperature
            temp_adjustment = self._get_seasonal_temp_adjustment(form_data.season)
            adjusted_temperature = temperature + temp_adjustment
            
            # # Apply farm size adjustments (larger farms might have different microclimates)
            # size_adjustment = self._get_farm_size_adjustment(form_data.farmSize)
            
            model_inputs = ModelInputs(
                N=npk_values["N"],
                P=npk_values["P"],
                K=npk_values["K"],
                temperature=adjusted_temperature,
                humidity=humidity,
                ph=ph,
                rainfall=rainfall,
                originalData=form_data.dict()
            )
            
            logger.info(f"Mapped form data to model inputs: {model_inputs}")
            return model_inputs
            
        except Exception as e:
            logger.error(f"Error mapping form data: {e}")
            raise
    
    def _get_seasonal_temp_adjustment(self, season: str) -> float:
        """Get temperature adjustment based on season"""
        adjustments = {
            "spring": 0,
            "yala": 3,
            "maha": -2,
            "year-round": 0
        }
        return adjustments.get(season, 0)
    
    # def _get_farm_size_adjustment(self, farm_size: str) -> dict:
    #     """Get nutrient adjustment based on farm size"""
    #     adjustments = {
    #         "small": {"N": 1.0, "P": 1.0, "K": 1.0},      # No adjustment
    #         "medium": {"N": 1.1, "P": 1.05, "K": 1.05},   # Slight increase
    #         "large": {"N": 1.2, "P": 1.1, "K": 1.1}       # Higher nutrients for large farms
    #     }
    #     return adjustments.get(farm_size, {"N": 1.0, "P": 1.0, "K": 1.0})
