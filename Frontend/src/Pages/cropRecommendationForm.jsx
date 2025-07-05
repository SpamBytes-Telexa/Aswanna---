import { useState, useEffect } from "react";
import {
  MapPin,
  Thermometer,
  Droplets,
  Beaker,
  Calendar,
  Loader2,
  Sparkles,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

export default function CropRecommendationForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    location: "",
    soilType: "",
    soilPH: "",
    climate: "",
    season: "",
    farmSize: "",
    experience: "",
    goals: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completedFields, setCompletedFields] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const handleGoalChange = (goal) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const progressPercentage = (completedFields.size / 7) * 100;

  return (
    <section
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.mindinventory.com/blog/wp-content/uploads/2024/01/ai-in-agriculture.webp')",
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ඔබේ වගාවට නිර්දේශ ලබා ගන්න
          </h2>
          <p className="text-xl text-600 max-w-2xl mx-auto leading-relaxed">
            ඔබේ වතුයාය පිළිබඳ විස්තර ලබා දී, ඔබ වෙනුවෙන්ම හැඳින්වූ බීජ හා වගා
            නිර්දේශ ලබා ගන්න.
          </p>
        </div>

        <div
          className={`mb-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-full p-1 shadow-lg">
            <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-2 px-4">
              <span>ප්‍රගති</span>
              <span>{Math.round(progressPercentage)}% සම්පූර්ණයි</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Location & Climate Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  ස්ථානය සහ දේශගුණය
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    ස්ථානය
                    {completedFields.has("location") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
                    )}
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="නගරය, දිස්ත්‍රික්කය/රට"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Thermometer className="h-4 w-4 mr-2 text-blue-500" />
                    දේශගුණ කලාපය
                    {completedFields.has("climate") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
                    )}
                  </label>
                  <div className="relative">
                    <select
                      name="climate"
                      value={formData.climate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">දේශගුණය තෝරන්න</option>
                      <option value="tropical">ඝර්ම</option>
                      <option value="subtropical">උපඝර්ම</option>
                      <option value="temperate">සීතල</option>
                      <option value="continental">භූමිමධ්‍ය</option>
                      <option value="arid">වියළි / කාන්තාර</option>
                      <option value="mediterranean">මැදිපෙරදිග</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    වගා සමය
                    {completedFields.has("season") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
                    )}
                  </label>
                  <div className="relative">
                    <select
                      name="season"
                      value={formData.season}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">සමය තෝරන්න</option>
                      <option value="spring">වසන්තය</option>
                      <option value="summer">ගිණිකාලය</option>
                      <option value="fall">සරත්</option>
                      <option value="winter">හෙමන්තය</option>
                      <option value="year-round">සියලු කාලයම</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  පස පිළිබද තොරතුරු
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Beaker className="h-4 w-4 mr-2 text-green-500" />
                    පස වර්ගය
                    {completedFields.has("soilType") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
                    )}
                  </label>
                  <div className="relative">
                    <select
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">පස වර්ගය තෝරන්න</option>
                      <option value="clay">මැටි</option>
                      <option value="sandy">වැලි සහිත</option>
                      <option value="loam">
                        ලෝම්[වැලි, රොන්මඩ සහ මැටි වල සමතුලිත සංයුතිය මගින්
                        සංලක්ෂිත පස් ]
                      </option>
                      <option value="silt">
                        සීලට්[වැලි සහ මැටි අතර ප්‍රමාණයෙන් වැටෙන මධ්‍යම
                        ප්‍රමාණයේ අංශු වලින් සංලක්ෂිත පස්]
                      </option>
                      <option value="chalky">
                        චාල්කි[කැල්සියම් කාබනේට් ඉහළ අන්තර්ගතයකින් සංලක්ෂිත]
                      </option>
                      <option value="peaty">
                        ඉහළ කාබනික ද්‍රව්‍ය අන්තර්ගතයකින් සංලක්ෂිත පස්
                      </option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Droplets className="h-4 w-4 mr-2 text-green-500" />
                    පස pH මට්ටම
                    {completedFields.has("soilPH") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
                    )}
                  </label>
                  <div className="relative">
                    <select
                      name="soilPH"
                      value={formData.soilPH}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">පස pH මට්ටම තෝරන්න</option>
                      <option value="acidic">ආම්ලික (4.0-6.0)</option>
                      <option value="neutral">මධ්යස්ථ (6.0-7.0)</option>
                      <option value="alkaline">ඇල්කලයින් (7.0-8.5)</option>
                      <option value="unknown">නොදන්නා</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center mb-6">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="h-6 w-6 text-white" />
                            </div> */}
                <h3 className="text-2xl font-bold text-gray-800">
                  ගොවි බිම් විස්තර
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    ගොවි බිම් ප්‍රමාණය
                    {completedFields.has("farmSize") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
                    )}
                  </label>
                  <div className="relative">
                    <select
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">ගොවි බිම් ප්‍රමාණය තෝරන්න</option>
                      <option value="small">කුඩා (&lt; 1 acre)</option>
                      <option value="medium">මධ්‍යම (1-10 acres)</option>
                      <option value="large">විශාල (10+ acres)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    අත්දැකීම් මට්ටම
                    {completedFields.has("experience") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
                    )}
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">අත්දැකීම් මට්ටම තෝරන්න</option>
                      <option value="beginner">අරඹන්නා (0-2 years)</option>
                      <option value="intermediate">මධ්‍යම (3-10 years)</option>
                      <option value="expert">විශේෂඥ (10+ years)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                ඔබේ වගා ඉලක්ක
              </h3>
              <p className="text-gray-600 mb-6">
                ඔබේ වගා ඉලක්ක සඳහා යෙදුම් කරන සියල්ල තෝරන්න
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "උපරිම අස්වැන්න",
                  "කාබනික ගොවිතැන",
                  "පළිබෝධ ප්‍රතිරෝධය",
                  "ජල සංරක්ෂණය",
                  "පාංශු සෞඛ්‍යය",
                  "වෙළඳපොළ වටිනාකම",
                ].map((goal) => (
                  <label
                    key={goal}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      formData.goals.includes(goal)
                        ? "border-green-500 bg-green-50 shadow-lg"
                        : "border-gray-200 bg-white/50 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal)}
                      onChange={() => handleGoalChange(goal)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                        formData.goals.includes(goal)
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.goals.includes(goal) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {goal}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[300px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-6 w-6 mr-3" />
                      <span className="animate-pulse">
                        ඔබේ ගොවි දත්ත විශ්ලේෂණය වෙමින්...
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-6 w-6 mr-3 group-hover:animate-spin" />
                      මගේ AI නිර්දේශ ලබා ගන්න
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
