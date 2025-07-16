import { useState, useEffect } from "react";
import axios from "axios";
import {
  Leaf,
  Calendar,
  Droplets,
  Sun,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Download,
  Share2,
  BookOpen,
  Lightbulb,
  Target,
  Thermometer,
  Beaker,
} from "lucide-react";

export default function CropRecommendationResults({
  recommendation: propRecommendation,
  onBack,
  loading: propLoading = false,
  soilData,
  shouldFetchData = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [recommendation, setRecommendation] = useState(
    propRecommendation || null
  );
  const [loading, setLoading] = useState(propLoading);
  const [error, setError] = useState(null);

  // Function to fetch recommendation from backend
  const fetchRecommendation = async (inputData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "http://127.0.0.1:8000/croprecommend/recommend-crop",
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 second timeout
        }
      );

      if (response.data) {
        setRecommendation(response.data);
      } else {
        throw new Error("නිර්දේශ ලබා ගැනීමට අසමත් විය");
      }
    } catch (err) {
      console.error("API Error:", err);
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED") {
          setError(
            "සේවාව ප්‍රතිචාර දැක්වීමට කාලය ගත විය. කරුණාකර නැවත උත්සාහ කරන්න."
          );
        } else if (err.response) {
          setError(
            `සේවාව දෝෂයක්: ${err.response.status} - ${err.response.statusText}`
          );
        } else if (err.request) {
          setError(
            "සේවාවට සම්බන්ධ වීමට අසමත් විය. ඔබේ අන්තර්ජාල සම්බන්ධතාව පරීක්ෂා කරන්න."
          );
        } else {
          setError("අනපේක්ෂිත දෝෂයක් සිදු විය");
        }
      } else {
        setError("නිර්දේශ ලබා ගැනීමේදී දෝෂයක් සිදු විය");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);

    // If shouldFetchData is true and we have soilData, fetch from backend
    if (shouldFetchData && soilData && !propRecommendation) {
      fetchRecommendation(soilData);
    }
  }, [shouldFetchData, soilData, propRecommendation]);

  // Retry function for error state
  const handleRetry = () => {
    if (soilData) {
      fetchRecommendation(soilData);
    } else {
      onBack();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ඔබේ නිර්දේශ සකස් කරමින්...
          </h2>
          <p className="text-gray-600">
            AI මගින් ඔබේ ගොවිබිම සඳහා හොඳම බෝග නිර්දේශ කරමින්
          </p>
        </div>
      </div>
    );
  }

  if (error || !recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            දෝෂයක් සිදු විය
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "නිර්දේශ ලබා ගැනීමේදී ගැටලුවක් ඇති විය"}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              නැවත උත්සාහ කරන්න
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ආපසු යන්න
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "සාරාංශය", icon: Leaf },
    { id: "planting", label: "වගා කිරීම", icon: Calendar },
    { id: "care", label: "රැකවරණය", icon: Sun },
    { id: "tips", label: "උපදෙස්", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              ආපසු යන්න
            </button>
            <div className="flex space-x-4">
              <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                PDF බාගන්න
              </button>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                බෙදා ගන්න
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Recommendation Card */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {recommendation.recommendedCrop}
                  </h1>
                  <p className="text-xl opacity-90">
                    ඔබේ ගොවිබිම සඳහා නිර්දේශිත බෝගය
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-3xl font-bold">
                      {recommendation.confidence}%
                    </div>
                    <div className="text-sm opacity-90">විශ්වාසනීයත්වය</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="p-8 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Thermometer className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {recommendation.modelInputs?.temperature}°C
                  </div>
                  <div className="text-sm text-gray-600">උෂ්ණත්වය</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Droplets className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {recommendation.modelInputs?.humidity}%
                  </div>
                  <div className="text-sm text-gray-600">ආර්ද්‍රතාව</div>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Beaker className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {recommendation.modelInputs?.ph}
                  </div>
                  <div className="text-sm text-gray-600">pH මට්ටම</div>
                </div>
                <div className="text-center">
                  <div className="bg-cyan-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Sun className="h-8 w-8 text-cyan-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {recommendation.modelInputs?.rainfall}mm
                  </div>
                  <div className="text-sm text-gray-600">වර්ෂාපතනය</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg mb-8">
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center py-4 px-6 font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      බෝගය පිළිබඳ සාරාංශය
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {recommendation.geminiResponse?.overview ||
                        "මෙම බෝගය ඔබේ ගොවිබිමේ තත්ත්වයන් සඳහා ඉතා සුදුසු වේ."}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                        <CheckCircle className="h-6 w-6 mr-2" />
                        ප්‍රතිලාභ
                      </h4>
                      <ul className="space-y-2">
                        {recommendation.geminiResponse?.benefits?.map(
                          (benefit, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-green-700">{benefit}</span>
                            </li>
                          )
                        ) || (
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-green-700">
                              ඉහළ අස්වැන්නක් ලබා ගත හැක
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                        <Target className="h-6 w-6 mr-2" />
                        අපේක්ෂිත ප්‍රතිඵල
                      </h4>
                      <ul className="space-y-2">
                        {recommendation.geminiResponse?.expectedResults?.map(
                          (result, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-blue-700">{result}</span>
                            </li>
                          )
                        ) || (
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-blue-700">
                              හොඳ අස්වැන්නක් අපේක්ෂා කළ හැක
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "planting" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    වගා කිරීමේ උපදෙස්
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 mb-6">
                      <h4 className="text-xl font-bold text-green-800 mb-3">
                        වගා කිරීමේ කාලසටහන
                      </h4>
                      <p className="text-green-700">
                        {recommendation.geminiResponse?.plantingSchedule ||
                          "ඔබේ ප්‍රදේශයේ දේශගුණික තත්ත්වයන් අනුව වගා කිරීමේ සුදුසුම කාලය තෝරා ගන්න."}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          බීජ සකස් කිරීම
                        </h4>
                        <p className="text-gray-700">
                          {recommendation.geminiResponse?.seedPreparation ||
                            "ගුණාත්මක බීජ තෝරා ගෙන නිසි ආකාරයෙන් සකස් කරන්න."}
                        </p>
                      </div>
                      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          පස සකස් කිරීම
                        </h4>
                        <p className="text-gray-700">
                          {recommendation.geminiResponse?.soilPreparation ||
                            "පස හොඳින් සකස් කර අවශ්‍ය පෝෂක ද්‍රව්‍ය එකතු කරන්න."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "care" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    බෝග රැකවරණය
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <Droplets className="h-12 w-12 text-blue-600 mb-4" />
                      <h4 className="text-lg font-bold text-blue-800 mb-3">
                        ජල සම්පාදනය
                      </h4>
                      <p className="text-blue-700">
                        {recommendation.geminiResponse?.watering ||
                          "නිතිපතා ජලය ලබා දී පස තෙත්ව පවත්වා ගන්න."}
                      </p>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-6">
                      <Sun className="h-12 w-12 text-yellow-600 mb-4" />
                      <h4 className="text-lg font-bold text-yellow-800 mb-3">
                        පෝෂණය
                      </h4>
                      <p className="text-yellow-700">
                        {recommendation.geminiResponse?.fertilizing ||
                          "නිසි කාලයට පෝෂක ද්‍රව්‍ය ලබා දෙන්න."}
                      </p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-6">
                      <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
                      <h4 className="text-lg font-bold text-red-800 mb-3">
                        පළිබෝධ පාලනය
                      </h4>
                      <p className="text-red-700">
                        {recommendation.geminiResponse?.pestControl ||
                          "පළිබෝධ හා රෝග වලින් ආරක්ෂා කරන්න."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tips" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    විශේෂ උපදෙස්
                  </h3>
                  <div className="space-y-4">
                    {recommendation.geminiResponse?.tips?.map((tip, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500"
                      >
                        <div className="flex items-start">
                          <Lightbulb className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 text-lg">{tip}</p>
                        </div>
                      </div>
                    )) || (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
                        <div className="flex items-start">
                          <Lightbulb className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 text-lg">
                            නිතිපතා ඔබේ බෝග පරීක්ෂා කර අවශ්‍ය සේවාව ලබා දෙන්න.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-green-600" />
              අමතර තොරතුරු
            </h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {recommendation.geminiResponse?.additionalInfo ||
                  "මෙම බෝගය වගා කිරීමේදී ඔබේ ප්‍රදේශයේ දේශගුණික තත්ත්වයන් සහ පස් තත්ත්වයන් සැලකිල්ලට ගන්න. වැඩි විස්තර සඳහා ප්‍රදේශීය කෘෂිකර්ම නිලධාරියා සමඟ සම්බන්ධ වන්න."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
