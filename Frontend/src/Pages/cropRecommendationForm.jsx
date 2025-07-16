// import { useState, useEffect } from "react";
// import {
//   MapPin,
//   Thermometer,
//   Droplets,
//   Beaker,
//   Calendar,
//   Loader2,
//   Sparkles,
//   ChevronDown,
//   CheckCircle,
// } from "lucide-react";

// export default function CropRecommendationForm({ onSubmit, loading }) {
//   const [formData, setFormData] = useState({
//     location: "",
//     soilType: "",
//     soilPH: "",
//     climate: "",
//     season: "",
//     farmSize: "",
//     experience: "",
//     goals: [],
//   });

//   const [completedFields, setCompletedFields] = useState(new Set());
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (value) {
//       setCompletedFields((prev) => new Set([...prev, name]));
//     } else {
//       setCompletedFields((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(name);
//         return newSet;
//       });
//     }
//   };

//   const handleGoalChange = (goal) => {
//     setFormData((prev) => ({
//       ...prev,
//       goals: prev.goals.includes(goal)
//         ? prev.goals.filter((g) => g !== goal)
//         : [...prev.goals, goal],
//     }));
//   };

//   // Map form data to model inputs
//   const mapFormDataToModelInputs = (data) => {
//     // Define mapping ranges based on form inputs
//     const soilTypeToNPK = {
//       clay: { N: 85, P: 60, K: 45 },
//       sandy: { N: 40, P: 35, K: 20 },
//       loam: { N: 70, P: 50, K: 40 },
//       silt: { N: 65, P: 45, K: 35 },
//       chalky: { N: 50, P: 40, K: 30 },
//       peaty: { N: 90, P: 70, K: 50 },
//     };

//     const climateToTemp = {
//       tropical: 28,
//       subtropical: 24,
//       temperate: 18,
//       continental: 15,
//       arid: 32,
//       mediterranean: 22,
//     };

//     const climateToHumidity = {
//       tropical: 80,
//       subtropical: 70,
//       temperate: 60,
//       continental: 55,
//       arid: 30,
//       mediterranean: 65,
//     };

//     const seasonToRainfall = {
//       spring: 150,
//       summer: 80,
//       fall: 120,
//       winter: 200,
//       "year-round": 140,
//     };

//     const phMapping = {
//       acidic: 5.5,
//       neutral: 6.8,
//       alkaline: 7.8,
//       unknown: 6.5,
//     };

//     const npk = soilTypeToNPK[data.soilType] || { N: 60, P: 45, K: 35 };

//     return {
//       N: npk.N,
//       P: npk.P,
//       K: npk.K,
//       temperature: climateToTemp[data.climate] || 25,
//       humidity: climateToHumidity[data.climate] || 65,
//       ph: phMapping[data.soilPH] || 6.5,
//       rainfall: seasonToRainfall[data.season] || 120,
//       // Additional context for Gemini
//       originalData: data,
//     };
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const modelInputs = mapFormDataToModelInputs(formData);
//     onSubmit(modelInputs);
//   };

//   const progressPercentage = (completedFields.size / 7) * 100;

//   return (
//     <section
//       className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://www.mindinventory.com/blog/wp-content/uploads/2024/01/ai-in-agriculture.webp')",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/20"></div>
//       <div className="relative z-10 max-w-5xl mx-auto">
//         <div
//           className={`text-center mb-12 transform transition-all duration-1000 ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }`}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
//             ඔබේ වගාවට නිර්දේශ ලබා ගන්න
//           </h2>
//           <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
//             ඔබේ වතුයාය පිළිබඳ විස්තර ලබා දී, ඔබ වෙනුවෙන්ම හැඳින්වූ බීජ හා වගා
//             නිර්දේශ ලබා ගන්න.
//           </p>
//         </div>

//         <div
//           className={`mb-8 transform transition-all duration-1000 delay-300 ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }`}
//         >
//           <div className="bg-white rounded-full p-1 shadow-lg">
//             <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-2 px-4">
//               <span>ප්‍රගති</span>
//               <span>{Math.round(progressPercentage)}% සම්පූර්ණයි</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//               <div
//                 className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-700 ease-out shadow-sm"
//                 style={{ width: `${progressPercentage}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         <div
//           className={`transform transition-all duration-1000 delay-500 ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }`}
//         >
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Location & Climate Section */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
//               <div className="flex items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-800">
//                   ස්ථානය සහ දේශගුණය
//                 </h3>
//               </div>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//                     <MapPin className="h-4 w-4 mr-2 text-blue-500" />
//                     ස්ථානය
//                     {completedFields.has("location") && (
//                       <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
//                     )}
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     placeholder="නගරය, දිස්ත්‍රික්කය/රට"
//                     className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//                     <Thermometer className="h-4 w-4 mr-2 text-blue-500" />
//                     දේශගුණ කලාපය
//                     {completedFields.has("climate") && (
//                       <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
//                     )}
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="climate"
//                       value={formData.climate}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
//                       required
//                     >
//                       <option value="">දේශගුණය තෝරන්න</option>
//                       <option value="tropical">ඝර්ම</option>
//                       <option value="subtropical">උපඝර්ම</option>
//                       <option value="temperate">සීතල</option>
//                       <option value="continental">භූමිමධ්‍ය</option>
//                       <option value="arid">වියළි / කාන්තාර</option>
//                       <option value="mediterranean">මැදිපෙරදිග</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//                     <Calendar className="h-4 w-4 mr-2 text-blue-500" />
//                     වගා සමය
//                     {completedFields.has("season") && (
//                       <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
//                     )}
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="season"
//                       value={formData.season}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
//                       required
//                     >
//                       <option value="">සමය තෝරන්න</option>
//                       <option value="spring">වසන්තය</option>
//                       <option value="summer">ගිණිකාලය</option>
//                       <option value="fall">සරත්</option>
//                       <option value="winter">හෙමන්තය</option>
//                       <option value="year-round">සියලු කාලයම</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Soil Information Section */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
//               <div className="flex items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-800">
//                   පස පිළිබද තොරතුරු
//                 </h3>
//               </div>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//                     <Beaker className="h-4 w-4 mr-2 text-green-500" />
//                     පස වර්ගය
//                     {completedFields.has("soilType") && (
//                       <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
//                     )}
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="soilType"
//                       value={formData.soilType}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
//                       required
//                     >
//                       <option value="">පස වර්ගය තෝරන්න</option>
//                       <option value="clay">මැටි</option>
//                       <option value="sandy">වැලි සහිත</option>
//                       <option value="loam">ලෝම්</option>
//                       <option value="silt">සීලට්</option>
//                       <option value="chalky">චාල්කි</option>
//                       <option value="peaty">පීට්</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//                     <Droplets className="h-4 w-4 mr-2 text-green-500" />
//                     පස pH මට්ටම
//                     {completedFields.has("soilPH") && (
//                       <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
//                     )}
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="soilPH"
//                       value={formData.soilPH}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
//                       required
//                     >
//                       <option value="">පස pH මට්ටම තෝරන්න</option>
//                       <option value="acidic">ආම්ලික (4.0-6.0)</option>
//                       <option value="neutral">මධ්යස්ථ (6.0-7.0)</option>
//                       <option value="alkaline">ඇල්කලයින් (7.0-8.5)</option>
//                       <option value="unknown">නොදන්නා</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Farm Details Section */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
//               <div className="flex items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-800">
//                   ගොවි බිම් විස්තර
//                 </h3>
//               </div>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//                     ගොවි බිම් ප්‍රමාණය
//                     {completedFields.has("farmSize") && (
//                       <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
//                     )}
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="farmSize"
//                       value={formData.farmSize}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
//                       required
//                     >
//                       <option value="">ගොවි බිම් ප්‍රමාණය තෝරන්න</option>
//                       <option value="small">කුඩා (&lt; 1 acre)</option>
//                       <option value="medium">මධ්‍යම (1-10 acres)</option>
//                       <option value="large">විශාල (10+ acres)</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//                     අත්දැකීම් මට්ටම
//                     {completedFields.has("experience") && (
//                       <CheckCircle className="h-4 w-4 ml-2 text-green-500 animate-bounce" />
//                     )}
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="experience"
//                       value={formData.experience}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 appearance-none cursor-pointer"
//                       required
//                     >
//                       <option value="">අත්දැකීම් මට්ටම තෝරන්න</option>
//                       <option value="beginner">අරඹන්නා (0-2 years)</option>
//                       <option value="intermediate">මධ්‍යම (3-10 years)</option>
//                       <option value="expert">විශේෂඥ (10+ years)</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Goals Section */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
//               <h3 className="text-2xl font-bold text-gray-800 mb-6">
//                 ඔබේ වගා ඉලක්ක
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 ඔබේ වගා ඉලක්ක සඳහා යෙදුම් කරන සියල්ල තෝරන්න
//               </p>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {[
//                   "උපරිම අස්වැන්න",
//                   "කාබනික ගොවිතැන",
//                   "පළිබෝධ ප්‍රතිරෝධය",
//                   "ජල සංරක්ෂණය",
//                   "පාංශු සෞඛ්‍යය",
//                   "වෙළඳපොළ වටිනාකම",
//                 ].map((goal) => (
//                   <label
//                     key={goal}
//                     className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
//                       formData.goals.includes(goal)
//                         ? "border-green-500 bg-green-50 shadow-lg"
//                         : "border-gray-200 bg-white/50 hover:border-green-300"
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={formData.goals.includes(goal)}
//                       onChange={() => handleGoalChange(goal)}
//                       className="sr-only"
//                     />
//                     <div
//                       className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
//                         formData.goals.includes(goal)
//                           ? "border-green-500 bg-green-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {formData.goals.includes(goal) && (
//                         <CheckCircle className="h-3 w-3 text-white" />
//                       )}
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">
//                       {goal}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="text-center pt-8">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[300px]"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="relative flex items-center">
//                   {loading ? (
//                     <>
//                       <Loader2 className="animate-spin h-6 w-6 mr-3" />
//                       <span className="animate-pulse">
//                         ඔබේ ගොවි දත්ත විශ්ලේෂණය වෙමින්...
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles className="h-6 w-6 mr-3 group-hover:animate-spin" />
//                       මගේ AI නිර්දේශ ලබා ගන්න
//                     </>
//                   )}
//                 </div>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
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
  DollarSign,
  Star,
  Loader,
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
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate form progress
  const totalFields = 6;
  const filledFields = Object.values(formData).filter(
    (value) => value !== ""
  ).length;
  const progressPercentage = (filledFields / totalFields) * 100;

  // Update completed fields when form data changes
  useEffect(() => {
    const completed = new Set();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        completed.add(key);
      }
    });
    setCompletedFields(completed);
  }, [formData]);

  // Form Component
  const CropForm = ({ onSubmit }) => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            🌱 AI වගා නිර්දේශ
          </h1>
          <p className="text-gray-600">
            ඔබේ ගොවිබිම සඳහා හොඳම බෝග නිර්දේශ කරමු
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                ප්‍රගතිය
              </span>
              <span className="text-sm font-medium text-gray-700">
                {filledFields}/{totalFields} සම්පූර්ණ
              </span>
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
                    ප්‍රදේශය
                    {completedFields.has("location") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="උදා: කොළඹ,ගාල්ල,මාතර..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-1" />
                    දේශගුණය
                    {completedFields.has("climate") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.climate}
                  onChange={(e) =>
                    setFormData({ ...formData, climate: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">තෝරන්න</option>
                  <option value="hot">උණුසුම්</option>
                  <option value="cold">සීතල</option>
                  <option value="temperate">මධ්‍යස්ථ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    වාරය
                    {completedFields.has("season") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.season}
                  onChange={(e) =>
                    setFormData({ ...formData, season: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">තෝරන්න</option>
                  <option value="yala">යළ</option>
                  <option value="maha">මහ</option>
                  <option value="spring">වසන්ත</option>
                  <option value="year-round">සියලු වාර</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Leaf className="h-4 w-4 mr-1" />
                    පස වර්ගය
                    {completedFields.has("soilType") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) =>
                    setFormData({ ...formData, soilType: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">තෝරන්න</option>
                  <option value="loam">ලෝම්</option>
                  <option value="clay">මැටි</option>
                  <option value="sandy">වැලි</option>
                  <option value="silt">සීලට්</option>
                  <option value="chalky">චාල්කි</option>
                  <option value="peaty">පීට්</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Droplets className="h-4 w-4 mr-1" />
                    පස pH
                    {completedFields.has("soilPH") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.soilPH}
                  onChange={(e) =>
                    setFormData({ ...formData, soilPH: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">තෝරන්න</option>
                  <option value="acidic">ආම්ලික (0-6.5)</option>
                  <option value="neutral">මධ්‍යස්ථ (6.5-7.5)</option>
                  <option value="alkaline">ක්ෂාරික (7.5-)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    අත්දැකීම්
                    {completedFields.has("experience") && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </span>
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">තෝරන්න</option>
                  <option value="new">අලුත්</option>
                  <option value="intermediate">මධ්‍යම</option>
                  <option value="expert">ප්‍රවීණ</option>
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
                  සැකසෙමින්...
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
  const CropResults = ({ recommendations, onBack, onNewRecommendation }) => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            ආපසු
          </button>
          <button
            onClick={onNewRecommendation}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            නව නිර්දේශයක්
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            🌾 ඔබේ AI වගා නිර්දේශ
          </h1>
          <p className="text-gray-600">
            ඔබේ ගොවිබිම සඳහා විශේෂයෙන් නිර්දේශ කරන ලද බෝග
          </p>
        </div>

        {/* Farm Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            ගොවිබිම් තොරතුරු
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">ප්‍රදේශය</p>
              <p className="font-semibold text-blue-600">{formData.location}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Thermometer className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">දේශගුණය</p>
              <p className="font-semibold text-green-600">{formData.climate}</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">වාරය</p>
              <p className="font-semibold text-yellow-600">{formData.season}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Leaf className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">පස වර්ගය</p>
              <p className="font-semibold text-purple-600">
                {formData.soilType}
              </p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <Droplets className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">පස pH</p>
              <p className="font-semibold text-red-600">{formData.soilPH}</p>
            </div>
            <div className="text-center p-3 bg-indigo-50 rounded-lg">
              <Star className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">අත්දැකීම්</p>
              <p className="font-semibold text-indigo-600">
                {formData.experience}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((crop, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {crop.name || `බෝගය ${index + 1}`}
                    </h3>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {crop.suitability || "90"}% සුදුසු
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">අස්වැන්න</p>
                      <p className="font-bold text-blue-600 text-sm">
                        {crop.yield || "හොඳ"}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Clock className="h-5 w-5 text-green-500 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">කාලය</p>
                      <p className="font-bold text-green-600 text-sm">
                        {crop.time || "3-4 මාස"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      ප්‍රතිලාභ
                    </h4>
                    <p className="text-sm text-gray-600">
                      {crop.benefits || "ඔබේ ගොවිබිමට ඉතා සුදුසුයි"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                      අවවාද
                    </h4>
                    <p className="text-sm text-gray-600">
                      {crop.warnings || "නිසි ජල කළමනාකරණය අවශ්‍යයි"}
                    </p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300">
                    විස්තර
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">නිර්දේශ සොයා ගත නොහැකි විය</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // API call function
  const fetchRecommendations = async (data) => {
    try {
      setLoading(true);
      setError("");

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

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const result = await response.json();
      setRecommendations(result.recommendations || result);
      setCurrentView("results");
    } catch (err) {
      setError("සේවාව සම්බන්ධ කර ගත නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.");
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
    setRecommendations(null);
    setError("");
  };

  const handleNewRecommendation = () => {
    setCurrentView("form");
    setRecommendations(null);
    setFormData({
      location: "",
      climate: "",
      season: "",
      soilType: "",
      soilPH: "",
      experience: "",
    });
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
            ✕
          </button>
        </div>
      )}

      {currentView === "form" ? (
        <CropForm onSubmit={handleSubmit} />
      ) : (
        <CropResults
          recommendations={recommendations}
          onBack={handleBack}
          onNewRecommendation={handleNewRecommendation}
        />
      )}
    </div>
  );
}
