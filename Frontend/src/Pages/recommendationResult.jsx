"use client";
import {
  ArrowLeft,
  Star,
  Leaf,
  Shield,
  TrendingUp,
  Info,
  Download,
  Share2,
  Calendar,
  Droplets,
  Sun,
} from "lucide-react";

export default function RecommendationResults({ data, onReset }) {
  const hardcodedRecommendations = {
    primaryCrops: [
      {
        name: "තක්කාලි",
        variety: "චෙරෝකී පර්පල් හෙයාර්ලූම්",
        suitability: 95,
        expectedYield: "පැලයකට රු.8000-10000 ",
        growingSeason: "වසන්තයේ අගභාගයේ සිට සරත් ඍතුවේ මුල් භාගය දක්වා",
        benefits: [
          "විශිෂ්ට රසය සහ වෙළඳපල වටිනාකම",
          "රෝග ප්‍රතිරෝධී ප්‍රභේදය",
          "ගිම්හාන වගාව සඳහා උෂ්ණත්ව ඉවසීම",
          "ප්‍රතිඔක්සිකාරක සහ විටමින් වලින් පොහොසත්",
          "නැවුම් ආහාර සහ ඉවුම් පිහුම් සඳහා පරිපූර්ණ",
        ],
        plantingTips: [
          "අවසාන හිම වැටීමට සති 6-8කට පෙර ගෘහස්ථව බීජ පැළ ඇරඹීම",
          "හොඳින් ජලය බැස යන, සාරවත් පසෙහි රෝපණය කරන්න",
          "කූඩු හෝ කණු සමඟ ශක්තිමත් ආධාරක සපයන්න",
          "රෝග වැළැක්වීම සඳහා පස් මට්ටමින් ජලය දෙන්න",
          "තෙතමනය රඳවා ගැනීම සඳහා පැල වටා මල්ච් කරන්න",
        ],
        companionPlants: ["බැසිල්", "මැරිගෝල්ඩ්", "මිරිස්", "කැරට්"],
        harvestTime: "බද්ධ කිරීමෙන් දින 75-85",
        spacing: "අඟල් 24-36 ක් දුරින්",
        sunRequirement: "සම්පූර්ණ හිරු (දිනකට පැය 6-8)",
        waterNeeds: "සතියකට අඟල් 1-2",
      },
      {
        name: "බෙල් මිරිස්",
        variety: "කැලිෆෝනියා වන්ඩර්",
        suitability: 92,
        expectedYield: "පැලයකට මිරිස් 8-12",
        growingSeason: "වසන්තයේ අගභාගයේ සිට සරත් ඍතුව දක්වා",
        benefits: [
          "ඉහළ විටමින් C අන්තර්ගතය",
          "නැවුම් හෝ පිසින ලද විශිෂ්ට",
          "හොඳ ගබඩා කිරීමේ හැකියාව",
          "ආකර්ෂණීය උද්‍යාන පැල",
          "පළිබෝධ ප්‍රතිරෝධී ප්‍රභේදය",
        ],
        plantingTips: [
          "අවසාන හිම වැටීමට සති 8-10කට පෙර ගෘහස්ථව බීජ පැළ ඇරඹීම",
          "පස උෂ්ණත්වය 65°F දක්වා උණුසුම් වූ පසු බද්ධ කරන්න",
          "පොහොසත්, හොඳින් ජලය බැස යන පසෙහි රෝපණය කරන්න",
          "ස්ථාවර තෙතමනය සපයන්න",
          "බර පලතුරු සහිත පැල සඳහා ආධාරක සපයන්න",
        ],
        companionPlants: ["තක්කාලි", "බැසිල්", "ළූණු", "කැරට්"],
        harvestTime: "බද්ධ කිරීමෙන් දින 70-80",
        spacing: "අඟල් 18-24 ක් දුරින්",
        sunRequirement: "සම්පූර්ණ හිරු",
        waterNeeds: "සතියකට අඟල් 1-1.5",
      },
      {
        name: "සලාද කොළ",
        variety: "බටර්ක්‍රන්ච් බිබ්",
        suitability: 88,
        expectedYield: "පැලයකට 1 හිස, බහු අස්වනු",
        growingSeason: "වසන්ත සහ සරත් (සිසිල් කාලය)",
        benefits: [
          "ඉක්මන් වර්ධනය වන බෝගය",
          "බහු අස්වනු හැකියාව",
          "අනුක්‍රමික වගාව සඳහා විශිෂ්ට",
          "ඉහළ පෝෂණ වටිනාකම",
          "නැවුම් සලාද සඳහා පරිපූර්ණ",
        ],
        plantingTips: [
          "සිසිල් කාලගුණයේ දී සෘජුව වපුරන්න",
          "අඛණ්ඩ අස්වනු සඳහා සති 2කට වරක් වපුරන්න",
          "උණුසුම් කාලගුණයේ දී පස්වරු සෙවණ සපයන්න",
          "පස නිරන්තරයෙන් තෙත්ව තබා ගන්න",
          "කප්-ඇන්ඩ්-කම්-ඇගේන් සඳහා පිටත කොළ අස්වනු ගන්න",
        ],
        companionPlants: ["කැරට්", "රාබු", "චයිව්ස්", "සුදුළූණු"],
        harvestTime: "බීජයෙන් දින 45-65",
        spacing: "අඟල් 8-12 ක් දුරින්",
        sunRequirement: "අර්ධ සෙවණ සිට සම්පූර්ණ හිරු දක්වා",
        waterNeeds: "සතියකට අඟල් 1",
      },
      {
        name: "බෝංචි",
        variety: "ප්‍රොවයිඩර් බුෂ් බීන්",
        suitability: 90,
        expectedYield: "පැලයකට රු.2000-3000",
        growingSeason: "වසන්තයේ අගභාගයේ සිට ගිම්හානය දක්වා",
        benefits: [
          "නයිට්‍රජන් ස්ථිර කරන ලෙගියුම් පස වැඩිදියුණු කරයි",
          "ආරම්භකයින්ට වගා කිරීමට පහසු",
          "සංයුක්ත බුෂ් ප්‍රභේදය ඉඩ ඉතිරි කරයි",
          "ඉහළ ප්‍රෝටීන් අන්තර්ගතය",
          "නැවුම් හෝ සංරක්ෂිත විශිෂ්ට",
        ],
        plantingTips: [
          "පස 60°F දක්වා උණුසුම් වූ පසු සෘජුව වපුරන්න",
          "හොඳින් ජලය බැස යන පසෙහි වපුරන්න",
          "අමතර නයිට්‍රජන් පොහොර අවශ්‍ය නැත",
          "රෝග වැළැක්වීම සඳහා පස් මට්ටමින් ජලය දෙන්න",
          "නිෂ්පාදනය දිරිමත් කිරීම සඳහා නිතිපතා අස්වනු ගන්න",
        ],
        companionPlants: ["ඉරිඟු", "කැරට්", "රාබු", "මැරිගෝල්ඩ්"],
        harvestTime: "බීජයෙන් දින 50-55",
        spacing: "අඟල් 4-6 ක් දුරින්",
        sunRequirement: "සම්පූර්ණ හිරු",
        waterNeeds: "සතියකට අඟල් 1",
      },
      {
        name: "කැරට්",
        variety: "නැන්ටෙස් හාෆ්-ලෝන්ග්",
        suitability: 87,
        expectedYield: "වර්ග අඩියකට රු.400-500",
        growingSeason: "වසන්තයේ සිට සරත් ඍතුව දක්වා",
        benefits: [
          "ලිහිල්, වැලි සහිත පස් සඳහා පරිපූර්ණ",
          "දිගු ගබඩා කිරීමේ ආයුකාලය",
          "ඉහළ බීටා-කැරොටින් අන්තර්ගතය",
          "මිහිරි, හැපෙනසුළු වයනය",
          "අනුක්‍රමික වගාව සඳහා හොඳ",
        ],
        plantingTips: [
          "ලිහිල්, ගල් රහිත පසෙහි සෘජුව වපුරන්න",
          "ප්‍රරෝහණය සඳහා පස නිරන්තරයෙන් තෙත්ව තබා ගන්න",
          "ගහනය වැළැක්වීම සඳහා පැල තුනී කරන්න",
          "තෙතමනය රඳවා ගැනීම සඳහා මල්ච් කරන්න",
          "පස කැටි වීමට පෙර අස්වනු ගන්න",
        ],
        companionPlants: ["ළූණු", "චයිව්ස්", "රෝස්මරි", "සේජ්"],
        harvestTime: "බීජයෙන් දින 70-80",
        spacing: "අඟල් 2-3 ක් දුරින්",
        sunRequirement: "සම්පූර්ණ හිරු සිට අර්ධ සෙවණ දක්වා",
        waterNeeds: "සතියකට අඟල් 1",
      },
    ],
    companionPlants: [
      {
        name: "මැරිගෝල්ඩ්",
        purpose: "ස්වභාවික පළිබෝධ පාලනය",
        benefits: [
          "නෙමටෝඩ් සහ පස් පළිබෝධයන් වළක්වයි",
          "ඇෆිඩ්, සුදු මැස්සන් සහ හෝන්වර්ම් පලවා හරියි",
          "ලේඩිබග් වැනි ප්‍රයෝජනවත් කෘමීන් ආකර්ෂණය කරයි",
          "උද්‍යානයට දීප්තිමත් වර්ණ එක් කරයි",
          "වගා කිරීමට සහ නඩත්තු කිරීමට පහසු",
          "කාලය පුරාවට අඛණ්ඩව මල් පිපෙයි",
        ],
        plantingInstructions:
          "උද්‍යාන මායිම් වටා සහ බෝග පේළි අතර වගා කරන්න. අඟල් 6-12 ක් දුරින් තබන්න.",
        bestCompanions: ["තක්කාලි", "මිරිස්", "බෝංචි", "වට්ටක්කා"],
        bloomTime: "ගිම්හානයේ සිට හිම වැටීම දක්වා",
        height: "ප්‍රභේදය අනුව අඟල් 6-36",
      },
      {
        name: "බැසිල්",
        purpose: "රස වැඩිදියුණු කිරීම සහ පළිබෝධ වළක්වන්නා",
        benefits: [
          "ඇෆිඩ්, මැස්සන් සහ මදුරුවන් පලවා හරියි",
          "අසල ඇති තක්කාලි වල රසය වැඩිදියුණු කරයි",
          "ඉවුම් පිහුම් සඳහා සුගන්ධ ද්‍රව්‍ය",
          "මල් සමඟ පරාගකාරීන් ආකර්ෂණය කරයි",
          "ස්වභාවික දිලීර නාශක ගුණ",
          "අස්වනු ගැනීමට සහ සංරක්ෂණයට පහසු",
        ],
        plantingInstructions:
          "තක්කාලි සහ මිරිස් අසල වගා කරන්න. කොළ වර්ධනය දිරිමත් කිරීම සඳහා මල් නෙලන්න.",
        bestCompanions: ["තක්කාලි", "මිරිස්", "ඔරිගනෝ", "පාස්ලි"],
        bloomTime: "මල් පිපීමට ඉඩ දුන්නොත් මැද ගිම්හානය",
        height: "අඟල් 12-24",
      },
      {
        name: "නැස්ටර්ටියම්",
        purpose: "උගුල් බෝගය සහ බිම් ආවරණය",
        benefits: [
          "ප්‍රධාන බෝගවලින් ඇෆිඩ් ආකර්ෂණය කරයි",
          "ආහාරයට ගත හැකි මල් සහ කොළ (මිරිස් රසය)",
          "නැගෙන ප්‍රභේද සිරස් උනන්දුව සපයයි",
          "පිපිඤ්ඤා කුරුමිණියන් සහ වට්ටක්කා දෝෂ වළක්වයි",
          "ස්වභාවික මල්ච් සමඟ පස වැඩිදියුණු කරයි",
          "ස්වයං බීජ වපන වාර්ෂික",
        ],
        plantingInstructions:
          "මායිම් බෝගයක් ලෙස වගා කරන්න හෝ ආධාරක මත නැගීමට ඉඩ දෙන්න. වසන්තයේ සෘජුව වපුරන්න.",
        bestCompanions: ["පිපිඤ්ඤා", "වට්ටක්කා", "රාබු", "බෝංචි"],
        bloomTime: "ගිම්හානයේ සිට හිම වැටීම දක්වා",
        height: "අඟල් 12 (බුෂ්) සිට අඩි 6 (නැගෙන)",
      },
      {
        name: "චයිව්ස්",
        purpose: "පළිබෝධ වළක්වන්නා සහ සුගන්ධ ද්‍රව්‍ය",
        benefits: [
          "ඇෆිඩ් සහ කැරට් මැස්සන් පලවා හරියි",
          "අසල ඇති පැල වර්ධනය වැඩිදියුණු කරයි",
          "සෑම වසරකම නැවත එන බහු වාර්ෂික සුගන්ධ ද්‍රව්‍ය",
          "ආහාරයට ගත හැකි මල් සහ කොළ",
          "ප්‍රයෝජනවත් කෘමීන් ආකර්ෂණය කරයි",
          "ස්වභාවික දිලීර නාශක ගුණ",
        ],
        plantingInstructions:
          "උද්‍යානය වටා පොකුරු වශයෙන් වගා කරන්න. වසර 3-4කට වරක් පොකුරු බෙදන්න.",
        bestCompanions: ["කැරට්", "තක්කාලි", "රෝස", "ඇපල් ගස්"],
        bloomTime: "වසන්තයේ අගභාගයේ සිට ගිම්හානයේ මුල් භාගය දක්වා",
        height: "අඟල් 12-18",
      },
      {
        name: "කැලෙන්ඩුලා",
        purpose: "ප්‍රයෝජනවත් කෘමි ආකර්ෂකය",
        benefits: [
          "ප්‍රයෝජනවත් කෘමීන් සහ පරාගකාරීන් ආකර්ෂණය කරයි",
          "සලාද සහ තේ සඳහා ආහාරයට ගත හැකි මල්",
          "ස්වභාවික පළිබෝධ වළක්වන්නා",
          "සම රැකවරණය සඳහා ඖෂධීය ගුණ",
          "සිසිල් කාලගුණයේ මල් පිපෙයි",
          "ස්වයං බීජ වපන වාර්ෂික",
        ],
        plantingInstructions:
          "වසන්තයේ මුල් භාගයේ හෝ සරත් ඍතුවේ සෘජුව වපුරන්න. අඛණ්ඩ මල් පිපීම සඳහා මිය ගිය මල් ඉවත් කරන්න.",
        bestCompanions: [
          "බ්‍රැසිකා",
          "තක්කාලි",
          "සුගන්ධ ද්‍රව්‍ය",
          "මූල එළවළු",
        ],
        bloomTime: "වසන්තයේ සිට හිම වැටීම දක්වා",
        height: "අඟල් 12-24",
      },
    ],
    soilRecommendations: [
      {
        category: "පස් සකස් කිරීම",
        recommendations: [
          "පස් ව්‍යුහය සහ සාරවත්කම වැඩිදියුණු කිරීම සඳහා අඟල් 2-4 ක කොම්පෝස්ට් එක් කරන්න",
          "ප්‍රශස්ත පෝෂක ලබා ගැනීම සඳහා පස් pH පරීක්ෂා කර 6.0-7.0 දක්වා සකස් කරන්න",
          "අවශ්‍ය නම් උස් පාත්ති නිර්මාණය කර හොඳ ජල බැසීම සහතික කරන්න",
          "මූල බෝග සාර්ථකත්වය සඳහා ගල් සහ සුන්බුන් ඉවත් කරන්න",
        ],
      },
      {
        category: "පොහොර යෙදීම",
        recommendations: [
          "වගා කරන අවස්ථාවේ සමතුලිත කාබනික පොහොර (10-10-10) යොදන්න",
          "කාලයේ මැද තක්කාලි වැනි බර පෝෂකයන්ට කොම්පෝස්ට් සමඟ පැති-ඇඳුම් කරන්න",
          "වර්ධන කාලයේ ඉක්මන් නයිට්‍රජන් වැඩිකිරීම සඳහා මාළු ඉමල්ෂන් භාවිතා කරන්න",
          "අධික කොළ වර්ධනය වැළැක්වීම සඳහා අධික පොහොර යෙදීම වළකින්න",
        ],
      },
      {
        category: "ජල කළමනාකරණය",
        recommendations: [
          "කාර්යක්ෂම ජල සැපයුම සඳහා බිංදු වාරිමාර්ග හෝ පොකුණු නල් ස්ථාපනය කරන්න",
          "තෙතමනය රඳවා ගැනීම සඳහා අඟල් 2-3 ක කාබනික මල්ච් ස්තරයක් යොදන්න",
          "ගැඹුරු මූල වර්ධනය දිරිමත් කිරීම සඳහා ගැඹුරින් නමුත් අඩු වාර ගණනක් ජලය දෙන්න",
          "රෝග සහ වාෂ්පීකරණය අඩු කිරීම සඳහා උදේ පාන්දර ජලය දෙන්න",
        ],
      },
      {
        category: "පළිබෝධ සහ රෝග වැළැක්වීම",
        recommendations: [
          "පසෙන් බෝවන රෝග වැළැක්වීම සඳහා බෝග භ්‍රමණය ක්‍රියාත්මක කරන්න",
          "පළිබෝධ ශීත නිවාස අඩු කිරීම සඳහා කාලයේ අවසානයේ පැල සුන්බුන් ඉවත් කරන්න",
          "විවිධ වගාවන් සමඟ ප්‍රයෝජනවත් කෘමීන් දිරිමත් කරන්න",
          "මුල් පළිබෝධ හඳුනා ගැනීම සඳහා සතිපතා පැල නිරීක්ෂණය කරන්න",
        ],
      },
    ],
    seasonalCalendar: [
      {
        season: "වසන්තයේ මුල් භාගය",
        tasks: [
          "ගෘහස්ථව තක්කාලි සහ මිරිස් බීජ පැළ ඇරඹීම",
          "සීතල රාමුවේ සලාද කොළ සහ කැරට් සෘජුව වපුරන්න",
          "කොම්පෝස්ට් සමඟ උද්‍යාන පාත්ති සකස් කරන්න",
          "චයිව්ස් සහ අනෙකුත් බහු වාර්ෂික සුගන්ධ ද්‍රව්‍ය වගා කරන්න",
        ],
      },
      {
        season: "වසන්තයේ අගභාගය",
        tasks: [
          "පස 60°F දක්වා ළඟා වූ විට බෝංචි සෘජුව වපුරන්න",
          "මැරිගෝල්ඩ් සහ නැස්ටර්ටියම් වගා කරන්න",
          "සලාද කොළවල අනුක්‍රමික වගාව ආරම්භ කරන්න",
        ],
      },
      {
        season: "ගිම්හානය",
        tasks: [
          "මුල් සලාද කොළ අස්වනු ගෙන සරත් බෝගය වගා කරන්න",
          "තක්කාලි සහ මිරිස් පැලවලට ආධාරක සපයන්න",
          "බෝංචි සහ සුගන්ධ ද්‍රව්‍ය නිතිපතා අස්වනු ගැනීම",
          "ස්ථාවර ජල සැපයුම් කාලසටහන පවත්වා ගැනීම",
        ],
      },
      {
        season: "සරත් ඍතුව",
        tasks: [
          "හිස් පාත්තිවල ආවරණ බෝග වගා කරන්න",
          "ලබන වසර සඳහා බීජ එකතු කර සුරකින්න",
          "උද්‍යාන සුන්බුන් පිරිසිදු කරන්න",
        ],
      },
    ],
    sustainabilityTips: [
      "පළිබෝධනාශක අවශ්‍යතාව අඩු කිරීම සඳහා සහකාර වගාව ක්‍රියාත්මක කරන්න",
      "පස් සෞඛ්‍යය සහ ජල රඳවා ගැනීම වැඩිදියුණු කිරීම සඳහා කාබනික මල්ච් භාවිතා කරන්න",
      "වියළි කාලවලදී වාරිමාර්ග සඳහා වැසි ජලය එකතු කරන්න",
      "ස්වභාවික පොහොර සඳහා කුස්සියේ සුන්බුන් සහ උද්‍යාන අපද්‍රව්‍ය කොම්පෝස්ට් කරන්න",
      "ප්‍රාදේශීය පරාගකාරීන්ට සහාය වීම සඳහා දේශීය මල් වගා කරන්න",
      "ස්වභාවිකව පස් සාරවත්කම පවත්වා ගැනීම සඳහා බෝග භ්‍රමණය ක්‍රියාත්මක කරන්න",
    ],
  };

  const recommendations = hardcodedRecommendations;
  const primaryCrops = recommendations.primaryCrops;
  const companionPlants = recommendations.companionPlants;
  const soilRecommendations = recommendations.soilRecommendations;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onReset}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            ආකෘති පත්‍රයට ආපසු
          </button>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center shadow-lg">
              <Download className="h-4 w-4 mr-2" />
              වාර්තාව බාගන්න
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center shadow-lg">
              <Share2 className="h-4 w-4 mr-2" />
              ප්‍රතිඵල බෙදා ගන්න
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ඔබේ පුද්ගලික බෝග නිර්දේශ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ඔබේ පස් තත්ත්වයන්, දේශගුණය සහ ගොවිතැන් ඉලක්ක සඳහා අනුකූලව සකස් කරන
            ලද AI-බලගන්වන ලද යෝජනා උපරිම සාර්ථකත්වය සඳහා
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {primaryCrops.length}
            </div>
            <div className="text-gray-600 font-medium">නිර්දේශිත බෝග</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {companionPlants.length}
            </div>
            <div className="text-gray-600 font-medium">සහකාර පැල</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
            <div className="text-gray-600 font-medium">සාමාන්‍ය යෝග්‍යතාව</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-orange-100">
            <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
            <div className="text-gray-600 font-medium">වර්ධන කාල</div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="h-10 w-10 mr-4 text-green-600" />
            නිර්දේශිත බෝග
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {primaryCrops.map((crop, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {crop.name}
                    </h3>
                    <p className="text-gray-600 font-medium">{crop.variety}</p>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full">
                    <Star className="h-5 w-5 mr-2" />
                    <span className="font-bold">{crop.suitability}%</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-800">
                        අපේක්ෂිත අස්වනු
                      </span>
                    </div>
                    <p className="text-green-700">{crop.expectedYield}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">
                        වර්ධන කාලය
                      </span>
                    </div>
                    <p className="text-blue-700">{crop.growingSeason}</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Sun className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="font-semibold text-yellow-800">
                        හිරු අවශ්‍යතාව
                      </span>
                    </div>
                    <p className="text-yellow-700">{crop.sunRequirement}</p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Droplets className="h-5 w-5 text-cyan-600 mr-2" />
                      <span className="font-semibold text-cyan-800">
                        ජල අවශ්‍යතා
                      </span>
                    </div>
                    <p className="text-cyan-700">{crop.waterNeeds}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    ප්‍රධාන ප්‍රතිලාභ
                  </h4>
                  <ul className="space-y-2">
                    {crop.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">
                    වගා කිරීමේ උපදෙස්
                  </h4>
                  <ul className="space-y-2">
                    {crop.plantingTips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="text-gray-700 flex items-start bg-gray-50 rounded-lg p-3"
                      >
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-900 mb-3">සහකාර පැල</h4>
                  <div className="flex flex-wrap gap-2">
                    {crop.companionPlants.map((companion, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {companion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
            <Shield className="h-10 w-10 mr-4 text-blue-600" />
            ස්වභාවික පළිබෝධ පාලනය සඳහා සහකාර පැල
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companionPlants.map((plant, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {plant.name}
                    </h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mt-1">
                      {plant.purpose}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    ප්‍රතිලාභ:
                  </h4>
                  <ul className="space-y-1">
                    {plant.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 flex items-start"
                      >
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    වගා කිරීමේ උපදෙස්:
                  </h4>
                  <p className="text-sm text-green-700">
                    {plant.plantingInstructions}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    හොඳම සහකාරීන්:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {plant.bestCompanions.map((companion, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {companion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
            <Info className="h-10 w-10 mr-4 text-amber-600" />
            පස් සහ රැකවරණ නිර්දේශ
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {soilRecommendations.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="flex items-start bg-amber-50 rounded-lg p-3"
                    >
                      <span className="text-amber-600 mr-3 mt-1">•</span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
            <Calendar className="h-10 w-10 mr-4 text-purple-600" />
            කාලීන වගා දින දර්ශනය
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.seasonalCalendar.map((season, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-purple-600 mb-4">
                  {season.season}
                </h3>
                <ul className="space-y-2">
                  {season.tasks.map((task, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 flex items-start"
                    >
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Leaf className="h-8 w-8 mr-3" />
            තිරසාර උපදෙස්
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.sustainabilityTips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start bg-white/10 rounded-lg p-4"
              >
                <span className="text-green-200 mr-3 mt-1">•</span>
                <span className="text-green-50">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            ඔබේ උද්‍යානය ආරම්භ කිරීමට සූදානම්ද?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            සමෘද්ධිමත්, තිරසාර උද්‍යානයක් නිර්මාණය කිරීමට අවශ්‍ය සියල්ල දැන් ඔබ
            සතුව ඇත. අමතර සහාය අවශ්‍යද?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg">
              විශේෂඥයෙකු සමඟ සාකච්ඡා කරන්න
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors text-lg">
              වගා මාර්ගෝපදේශය බාගන්න
            </button>
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors text-lg">
              නිර්දේශ සුරකින්න
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
