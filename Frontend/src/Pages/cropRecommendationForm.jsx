import { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Leaf,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Thermometer,
  Droplets,
  Clock,
  Star,
  Loader,
  Beaker,
} from "lucide-react";

export default function CropRecommendationsApp() {
  const [currentView, setCurrentView] = useState("form");
  const [formData, setFormData] = useState({
    location: "",
    climate: "",
    season: "",
    soilType: "",
    soilPH: "",
    experience: "",
  });
  const [completedFields, setCompletedFields] = useState(new Set());
  const [recommendationData, setRecommendationData] = useState(null); // Changed to hold the full response object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate form progress
  const totalFields = 6;
  const filledFields = Object.values(formData).filter(
    (value) => value !== ""
  ).length;
  const progressPercentage = (filledFields / totalFields) * 100;

  // Add a new `handleInputChange` function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value) {
      setCompletedFields((prev) => new Set([...prev, name]));
    } else {
      setCompletedFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }
  };

  // Form Component
  const CropForm = ({ onSubmit }) => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            {"🌱 AI වගා නිර්දේශ"}
          </h1>
          <p className="text-gray-600">
            {"ඔබේ ගොවිබිම සඳහා හොඳම බෝග නිර්දේශ කරමු"}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {"ප්‍රගතිය"}
              </span>
              <span className="text-sm font-medium text-gray-700">{`${filledFields}/${totalFields} සම්පූර්ණ`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {progressPercentage === 100
                ? "සියලු ක්ෂේත්‍ර සම්පූර්ණයි!"
                : "කරුණාකර සියලු ක්ෂේත්‍ර පුරවන්න"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {"ප්‍රදේශය"}
                    {completedFields.has("location") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.location}
                  name="location"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">{"පළාත තෝරන්න"}</option>
                  <option value="Colombo">{"කොළඹ"}</option>
                  <option value="Gampaha">{"ගම්පහ"}</option>
                  <option value="Kalutara">{"කළුතර"}</option>
                  <option value="Kandy">{"නුවර"}</option>
                  <option value="Matale">{"මාතලේ"}</option>
                  <option value="NuwaraEliya">{"නුවර එළිය"}</option>
                  <option value="Jaffna">{"යාපනය"}</option>
                  <option value="Kilinochchi">{"කිලිනොච්චි"}</option>
                  <option value="Mannar">{"මන්නාරම"}</option>
                  <option value="Vavuniya">{"වවුනියාව"}</option>
                  <option value="Mullaitivu">{"මුල්ලතිව්"}</option>
                  <option value="Anuradhapura">{"අනුරාධපුර"}</option>
                  <option value="Polonnaruwa">{"පොළොන්නරුව"}</option>
                  <option value="Badulla">{"බදුල්ල"}</option>
                  <option value="Monaragala">{"මොනරාගල"}</option>
                  <option value="Ratnapura">{"රත්නපුර"}</option>
                  <option value="Kegalle">{"කෑගල්ල"}</option>
                  <option value="Hambantota">{"හම්බන්තොට"}</option>
                  <option value="Kurunegala">{"කුරුණෑගල"}</option>
                  <option value="Puttalam">{"පුත්තලම"}</option>
                  <option value="Trincomalee">{"ත්‍රිකුණාමලය"}</option>
                  <option value="Galle">{"ගාල්ල"}</option>
                  <option value="Matara">{"මාතර"}</option>
                  <option value="Batticaloa">{"මඩකලපුව"}</option>
                  <option value="Ampara">{"අම්පාර"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-1" />
                    {"දේශගුණය"}
                    {completedFields.has("climate") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.climate}
                  name="climate"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">{"තෝරන්න"}</option>
                  <option value="hot">{"උණුසුම්"}</option>
                  <option value="cold">{"සීතල"}</option>
                  <option value="temperate">{"මධ්‍යස්ථ"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {"වාරය"}
                    {completedFields.has("season") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.season}
                  name="season"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">{"තෝරන්න"}</option>
                  <option value="yala">{"යළ"}</option>
                  <option value="maha">{"මහ"}</option>
                  <option value="spring">{"වසන්ත"}</option>
                  <option value="year-round">{"සියලු වාර"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Leaf className="h-4 w-4 mr-1" />
                    {"පස වර්ගය"}
                    {completedFields.has("soilType") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.soilType}
                  name="soilType"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">{"තෝරන්න"}</option>
                  <option value="loam">{"ලෝම්"}</option>
                  <option value="clay">{"මැටි"}</option>
                  <option value="sandy">{"වැලි"}</option>
                  <option value="silt">{"සීලට්"}</option>
                  <option value="chalky">{"චාල්කි"}</option>
                  <option value="peaty">{"පීට්"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Droplets className="h-4 w-4 mr-1" />
                    {"පස pH"}
                    {completedFields.has("soilPH") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.soilPH}
                  name="soilPH"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">{"තෝරන්න"}</option>
                  <option value="acidic">{"ආම්ලික (0-6.5)"}</option>
                  <option value="neutral">{"මධ්‍යස්ථ (6.5-7.5)"}</option>
                  <option value="alkaline">{"ක්ෂාරික (7.5-)"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {"අත්දැකීම්"}
                    {completedFields.has("experience") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.experience}
                  name="experience"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">{"තෝරන්න"}</option>
                  <option value="beginner">{"ආරම්භක"}</option>
                  <option value="intermediate">{"මධ්‍යම"}</option>
                  <option value="expert">{"ප්‍රවීණ"}</option>
                </select>
              </div>
            </div>
            <button
              onClick={onSubmit}
              disabled={loading || progressPercentage < 100}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  {"සැකසෙමින්..."}
                </div>
              ) : progressPercentage < 100 ? (
                "කරුණාකර සියලු ක්ෂේත්‍ර පුරවන්න"
              ) : (
                "නිර්දේශ ලබා ගන්න"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Results Component
  const CropResults = ({ recommendation, onBack, onNewRecommendation }) => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {"ආපසු"}
          </button>
          <button
            onClick={onNewRecommendation}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            {"නව නිර්දේශයක්"}
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            {"🌾 ඔබේ AI වගා නිර්දේශ"}
          </h1>
          <p className="text-gray-600">
            {"ඔබේ ගොවිබිම සඳහා විශේෂයෙන් නිර්දේශ කරන ලද බෝග"}
          </p>
        </div>
        {/* Farm Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            {"ගොවිබිම් තොරතුරු"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{"ප්‍රදේශය"}</p>
              <p className="font-semibold text-blue-600">{formData.location}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Thermometer className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{"දේශගුණය"}</p>
              <p className="font-semibold text-green-600">{formData.climate}</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{"වාරය"}</p>
              <p className="font-semibold text-yellow-600">{formData.season}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Leaf className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{"පස වර්ගය"}</p>
              <p className="font-semibold text-purple-600">
                {formData.soilType}
              </p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <Droplets className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{"පස pH"}</p>
              <p className="font-semibold text-red-600">{formData.soilPH}</p>
            </div>
            <div className="text-center p-3 bg-indigo-50 rounded-lg">
              <Star className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{"අත්දැකීම්"}</p>
              <p className="font-semibold text-indigo-600">
                {formData.experience}
              </p>
            </div>
          </div>
        </div>
        {/* Recommendations */}
        {recommendation && recommendation.recommendedCrop ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {recommendation.recommendedCrop}
                </h3>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {recommendation.confidence}% {"සුදුසු"}
                </div>
              </div>
              {recommendation.geminiResponse && (
                <>
                  {recommendation.geminiResponse.overview && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-purple-500 mr-1" />
                        {"දළ විශ්ලේෂණය"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recommendation.geminiResponse.overview}
                      </p>
                    </div>
                  )}
                  {recommendation.geminiResponse.benefits &&
                    recommendation.geminiResponse.benefits.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          {"ප්‍රතිලාභ"}
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {recommendation.geminiResponse.benefits.map(
                            (benefit, i) => (
                              <li key={i}>{benefit}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  {recommendation.geminiResponse.expectedResults &&
                    recommendation.geminiResponse.expectedResults.length >
                      0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                          {"අපේක්ෂිත ප්‍රතිඵල"}
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {recommendation.geminiResponse.expectedResults.map(
                            (result, i) => (
                              <li key={i}>{result}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  {recommendation.geminiResponse.plantingSchedule && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                        {"වගා කාලසටහන"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recommendation.geminiResponse.plantingSchedule}
                      </p>
                    </div>
                  )}
                  {recommendation.geminiResponse.seedPreparation && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Leaf className="h-4 w-4 text-green-500 mr-1" />
                        {"බීජ සකස් කිරීම"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recommendation.geminiResponse.seedPreparation}
                      </p>
                    </div>
                  )}
                  {recommendation.geminiResponse.soilPreparation && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Droplets className="h-4 w-4 text-orange-500 mr-1" />
                        {"පස සකස් කිරීම"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recommendation.geminiResponse.soilPreparation}
                      </p>
                    </div>
                  )}
                  {recommendation.geminiResponse.watering && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                        {"ජල සම්පාදනය"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recommendation.geminiResponse.watering}
                      </p>
                    </div>
                  )}
                  {recommendation.geminiResponse.fertilizing && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Beaker className="h-4 w-4 text-gray-700 mr-1" />
                        {"පොහොර යෙදීම"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recommendation.geminiResponse.fertilizing}
                      </p>
                    </div>
                  )}
                  {recommendation.geminiResponse.pestControl && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                        {"පළිබෝධ පාලනය"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recommendation.geminiResponse.pestControl}
                      </p>
                    </div>
                  )}
                  {recommendation.geminiResponse.tips &&
                    recommendation.geminiResponse.tips.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <Sparkles className="h-4 w-4 text-yellow-500 mr-1" />
                          {"ඉඟි"}
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {recommendation.geminiResponse.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {recommendation.geminiResponse.additionalInfo && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-gray-500 mr-1" />
                        {"අමතර තොරතුරු"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {recommendation.geminiResponse.additionalInfo}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">{"නිර්දේශ සොයා ගත නොහැකි විය"}</p>
          </div>
        )}
      </div>
    </div>
  );

  // API call function
  const fetchRecommendations = async (data) => {
    try {
      setLoading(true);
      setError("");
      console.log("Sending data to backend:", data);

      // First, test if backend is reachable with a simple health check
      try {
        const healthResponse = await fetch("http://127.0.0.1:8000/", {
          method: "GET",
        });
        console.log("Health check response:", healthResponse.status);
        if (!healthResponse.ok) {
          throw new Error("Backend health check failed");
        }
      } catch (healthErr) {
        console.error("Backend not reachable:", healthErr);
        throw new Error("Backend server is not running or not reachable");
      }

      const response = await fetch(
        "http://127.0.0.1:8000/croprecommend/recommend-crop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(`API call failed: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      console.log("Received result:", result);
      setRecommendationData(result); // Set the entire result object
      setCurrentView("results");
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        `සේවාව සම්බන්ධ කර ගත නොහැකි විය. ${err.message} කරුණාකර නැවත උත්සාහ කරන්න.`
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecommendations(formData);
  };

  const handleBack = () => {
    setCurrentView("form");
    setRecommendationData(null);
    setError("");
  };

  const handleNewRecommendation = () => {
    setCurrentView("form");
    setRecommendationData(null);
    setFormData({
      location: "",
      climate: "",
      season: "",
      soilType: "",
      soilPH: "",
      experience: "",
    });
    setCompletedFields(new Set());
    setError("");
  };

  return (
    <div>
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
          <p>{error}</p>
          <button
            onClick={() => setError("")}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            {"✕"}
          </button>
        </div>
      )}
      {currentView === "form" ? (
        <CropForm onSubmit={handleSubmit} />
      ) : (
        <CropResults
          recommendation={recommendationData}
          onBack={handleBack}
          onNewRecommendation={handleNewRecommendation}
        />
      )}
    </div>
  );
}
