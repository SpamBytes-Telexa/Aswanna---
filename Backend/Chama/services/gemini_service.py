import google.generativeai as genai
import logging
from typing import Dict, Optional
from ..models.schemas import FormData, ModelInputs, GeminiResponse
from ..core.config import settings

logger = logging.getLogger(__name__)

class GeminiService:
    """Service for Gemini AI operations"""
    
    def __init__(self):
        self.model = None
        if settings.GEMINI_API_KEY:
            try:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.model = genai.GenerativeModel('gemini-1.5-flash')
                logger.info("Gemini AI configured successfully")
            except Exception as e:
                logger.error(f"Error configuring Gemini AI: {e}")
                self.model = None
        else:
            logger.warning("Gemini API key not configured")
    
    def is_configured(self) -> bool:
        
        return self.model is not None
    
    async def get_crop_advice(self, crop: str, form_data: FormData, model_inputs: ModelInputs) -> GeminiResponse:
        
        
        if not self.is_configured():
            return self._get_fallback_advice(crop, form_data)
        
        try:
            prompt = self._create_advice_prompt(crop, form_data, model_inputs)
            response = self.model.generate_content(prompt)
            content = response.text
            
            # Parse the response
            parsed_response = self._parse_gemini_response(content)
            return GeminiResponse(**parsed_response)
            
        except Exception as e:
            logger.error(f"Error getting Gemini advice: {e}")
            return self._get_fallback_advice(crop, form_data)
    
    def _create_advice_prompt(self, crop: str, form_data: FormData, model_inputs: ModelInputs) -> str:
        """Create comprehensive prompt for Gemini AI"""
        
        return f"""
        ගොවියෙකුට {crop} වගා කිරීම සඳහා සිංහල භාෂාවෙන් සම්පූර්ණ මාතෘකාව පිළිබඳ විස්තරාත්මකව උපදෙස් ලබා දෙන්න.
        
        ගොවි බිම් තොරතුරු:
        - ස්ථානය: {form_data.location}
        - පස වර්ගය: {form_data.soilType}
        - pH මට්ටම: {form_data.soilPH}
        - දේශගුණය: {form_data.climate}
        - වගා සමය: {form_data.season}
        - අත්දැකීම: {form_data.experience}
        
        
        මාදිලියේ පරාමිති:
        - නයිට්‍රජන්: {model_inputs.N}
        - පොස්පරස්: {model_inputs.P}
        - පොටෑසියම්: {model_inputs.K}
        - උෂ්ණත්වය: {model_inputs.temperature}°C
        - ආර්ද්‍රතාව: {model_inputs.humidity}%
        - pH: {model_inputs.ph}
        - වර්ෂාපතනය: {model_inputs.rainfall}mm
        
        කරුණාකර පහත ආකෘතියෙන් උත්තර දෙන්න:
        
        OVERVIEW:
        [බෝගය පිළිබඳ සංක්ෂිප්ත විස්තරයක් 2-3 වාක්‍ය]
        
        BENEFITS:
        - [ප්‍රතිලාභය 1]
        - [ප්‍රතිලාභය 2]
        - [ප්‍රතිලාභය 3]
        - [ප්‍රතිලාභය 4]
        
        EXPECTED_RESULTS:
        - [අපේක්ෂිත ප්‍රතිඵලය 1]
        - [අපේක්ෂිත ප්‍රතිඵලය 2]
        - [අපේක්ෂිත ප්‍රතිඵලය 3]
        
        PLANTING_SCHEDULE:
        [වගා කිරීමේ කාලසටහන විස්තරාත්මකව]
        
        SEED_PREPARATION:
        [බීජ සකස් කිරීමේ ක්‍රමය විස්තරාත්මකව බෝගයට අනුව]
        
        SOIL_PREPARATION:
        [පස සකස් කිරීමේ ක්‍රමය විස්තරාත්මකව බෝගයට අනුව]
        
        WATERING:
        [ජල සම්පාදන උපදෙස් විස්තරාත්මකව බෝගයට අනුව]
        
        FERTILIZING:
        [පෝෂණ ක්‍රමය විස්තරාත්මකව බෝගයට අනුව]

        PEST_CONTROL:
        [පළිබෝධ හා රෝග පාලන ක්‍රම විස්තරාත්මකව බෝගයට අනුව]
        
        TIPS:
        - [උපදෙස 1]
        - [උපදෙස 2]
        - [උපදෙස 3]
        - [උපදෙස 4]
        
        ADDITIONAL_INFO:
        [අමතර වැදගත් තොරතුරු]
        
        සියලු උත්තර සිංහල භාෂාවෙන් ලබා දෙන්න. සරල හා පැහැදිලි විස්තරාත්මකව භාෂාවක් භාවිතා කරන්න.
        """
    
    def _parse_gemini_response(self, content: str) -> Dict:
        """Parse Gemini response into structured format"""
        
        sections = {}
        current_section = None
        current_content = []
        
        for line in content.split('\n'):
            line = line.strip()
            if not line:
                continue
            
            # Check for section headers
            section_keywords = {
                'OVERVIEW': 'overview',
                'BENEFITS': 'benefits',
                'EXPECTED_RESULTS': 'expectedResults',
                'PLANTING_SCHEDULE': 'plantingSchedule',
                'SEED_PREPARATION': 'seedPreparation',
                'SOIL_PREPARATION': 'soilPreparation',
                'WATERING': 'watering',
                'FERTILIZING': 'fertilizing',
                'PEST_CONTROL': 'pestControl',
                'TIPS': 'tips',
                'ADDITIONAL_INFO': 'additionalInfo'
            }
            
            found_section = None
            for keyword, section_name in section_keywords.items():
                if keyword in line.upper():
                    found_section = section_name
                    break
            
            if found_section:
                # Save previous section
                if current_section:
                    sections[current_section] = self._process_section_content(
                        current_section, current_content
                    )
                
                current_section = found_section
                current_content = []
            else:
                if current_section:
                    current_content.append(line)
        
        # Add the last section
        if current_section:
            sections[current_section] = self._process_section_content(
                current_section, current_content
            )
        
        return sections
    
    def _process_section_content(self, section_name: str, content: list) -> any:
        """Process section content based on section type"""
        
        if section_name in ['benefits', 'expectedResults', 'tips']:
            # Convert to list, removing bullet points
            return [
                line.strip('- ').strip() 
                for line in content 
                if line.strip() and line.strip() != '-'
            ]
        else:
            # Join as string
            return '\n'.join(content).strip()
    
    def _get_fallback_advice(self, crop: str, form_data: FormData) -> GeminiResponse:
        """Fallback advice when Gemini is not available"""
        
        return GeminiResponse(
            overview=f"{crop} යනු ඔබේ ගොවි බිම් තත්ත්වයන් සඳහා සුදුසු බෝගයකි. මෙය හොඳ අස්වැන්නක් ලබා දිය හැකි බෝගයකි.",
            benefits=[
                "හොඳ අස්වැන්නක් ලබා ගත හැක",
                "වෙළඳපොළ ඉල්ලුමක් ඇත",
                "ඔබේ දේශගුණයට සුදුසුයි",
                "කළමනාකරණය කිරීමට පහසුයි"
            ],
            expectedResults=[
                "ප්‍රමිතිමත් අස්වැන්නක්",
                "හොඳ ගුණාත්මක බවක්",
                "ලාභදායී ආදායමක්"
            ],
            plantingSchedule="ඔබේ ප්‍රදේශයේ දේශගුණික තත්ත්වයන් අනුව සුදුසුම කාලය තෝරා ගන්න.",
            seedPreparation="ගුණාත්මක බීජ තෝරා ගෙන නිසි ආකාරයෙන් සකස් කරන්න.",
            soilPreparation="පස හොඳින් සකස් කර අවශ්‍ය පෝෂක ද්‍රව්‍ය එකතු කරන්න.",
            watering="නිතිපතා ජලය ලබා දී පස තෙත්ව පවත්වා ගන්න.",
            fertilizing="නිසි කාලයට පෝෂක ද්‍රව්‍ය ලබා දෙන්න.",
            pestControl="පළිබෝධ හා රෝග වලින් ආරක්ෂා වීමට නිසි ක්‍රම අනුගමනය කරන්න.",
            tips=[
                "නිතිපතා ඔබේ බෝග පරීක්ෂා කරන්න",
                "කාලගුණ තත්ත්වයන් නිරීක්ෂණය කරන්න",
                "ප්‍රදේශීය කෘෂිකර්ම නිලධාරියාගෙන් උපදෙස් ලබා ගන්න",
                "අත්දැකීම් සහිත ගොවීන්ගෙන් ඉගෙන ගන්න"
            ],
            additionalInfo="වැඩි විස්තර සඳහා ප්‍රදේශීය කෘෂිකර්ම දෙපාර්තමේන්තුව සමඟ සම්බන්ධ වන්න."
        )
