import React from "react";
import { Link } from "react-router-dom";
import ChatbotButton from "../../../madhuni/components/chatbotbutton";
import Navbar from "../../../madhuni/components/Navbar";
import { motion } from "framer-motion";
import GraphemeSplitter from "grapheme-splitter";
import homeImage from "../../../assets/home.jpeg";

const splitter = new GraphemeSplitter();
const letters = splitter.splitGraphemes("අස්වැන්න");

const features = [
  {
    title: "මගේ වගා ගිවිසුම්",
    emoji: "👤",
    description: "ඔබගේ වගා ගිවිසුම් කළමනාකරණය කරන්න",
    path: "contracts",
  },
  {
    title: "ඔබගේ බෝග යෝජනාව පළ කරන්න",
    emoji: "👤",
    description: "ඔබගේ බෝග යෝජනාව පළ කරන්න",
    path: "farmerform",
  },
  {
    title: "පළිබෝධ හඳුනා ගැනීම",
    emoji: "📷",
    description: "ඔබගේ බෝගයේ රෝග සහ පළිබෝධ ඡායාරූපයකින් හඳුනා ගන්න",
    path: "plantDisease",
  },
  {
    title: "වගා නිර්දේශ",
    emoji: "🌱",
    description: "භූමි ප්‍රදේශය, කාලගුණය අනුව සුදුසු බෝග තෝරන්න",
    path: "crop-recommendation",
  },
  {
    title: "වෙළඳ මිල තොරතුරු",
    emoji: "💰",
    description: "වෙළඳපොලේ ඇති බෝග මිල දිස්ත්‍රික්ක අනුව බලන්න",
    path: "buyer",
  },
  {
    title: "කාලගුණ අනාවැකි",
    emoji: "🌦",
    description: "අලුත්ම කාලගුණ තොරතුරු සහ අනතුරු ඇඟවීම්",
    path: "weatherforecast",
  },
  {
    title: "ගොවියන්ගේ සමාජ ජාලය",
    emoji: "🧑‍🌾",
    description: "වෙනත් ගොවින් සමඟ පළපුරුදු හුවමාරු කරන්න",
    path: "farmercommunity",
  },
  {
    title: "වට්ටම් සහ මිල",
    emoji: "🏷",
    description: "පොහොර හා උපකරණ සඳහා වට්ටම් බලන්න",
    path: "discounts",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const letterVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  }),
  hover: {
    y: [0, -10, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sinhala">
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row w-full h-[60vh]">
        {/* Left 1/3 - Text Content */}
        <div className="w-full md:w-1/3 flex flex-col justify-center px-6 sm:px-16 lg:px-16 bg-[#7cb441ff]">
          <motion.h1
            className="text-8xl sm:text-7xl font-extrabold text-green-800 mb-4 flex flex-wrap"
            initial="hidden"
            animate="visible"
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                className="inline-block"
                whileHover={{ scale: 1.8, color: "#21571cff" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          <p className="text-gray-900 text-lg sm:text-xl font-medium mb-4 leading-relaxed">
            ශ්‍රී ලංකාවේ ගොවීන්ගේ අනාගතය වෙනස් කරන නවීන තාක්ෂණික විසඳුමක්.
          </p>

          <p className="text-gray-900 text-base sm:text-lg leading-relaxed">
            වගා නිර්දේශ, කාලගුණ විශ්ලේෂණ, පළිබෝධ හඳුනාගැනීම, වෙළඳ මිල තොරතුරු, සමාජ ජාලය – ඔක්කොම එකම වේදිකාවකින්!
          </p>
        </div>

        {/* Right 2/3 - Image */}
        <div className="w-full md:w-2/3 h-[60vh]">
          <img
            src={homeImage}
            alt="Home"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <Link to={`/${feature.path}`} key={index}>
              <motion.div
                variants={itemVariants}
                whileHover={{
                  scale: 1.06,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(21, 128, 61, 0.3)",
                }}
                className="relative group bg-green-900 border border-green-300 rounded-2xl p-6 h-52 shadow-lg transition-all duration-300 ease-in-out overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#7cb441ff] via-white to-[#7cb441ff] animate-pulse rounded-2xl blur-sm -z-10"></div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, 10, -10, 0], scale: 1.2 }}
                    className="text-5xl mb-3"
                  >
                    {feature.emoji}
                  </motion.div>

                  <h3 className="text-lg font-bold text-white group-hover:text-green-800 transition duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-white group-hover:text-gray-800 transition duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* FOOTER */}
      <motion.footer
        className="bg-green-800 text-white py-12 px-6 border-t border-green-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-3">අස්වැන්න</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              ශ්‍රී ලංකාවේ ගොවීන් සඳහා නවීන තාක්ෂණික විසඳුම්.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3 text-lime-300">සබැඳි</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="#" className="hover:text-lime-300 transition duration-300">ගිණුම</a></li>
              <li><a href="#" className="hover:text-lime-300 transition duration-300">සේවා</a></li>
              <li><a href="#" className="hover:text-lime-300 transition duration-300">රහස්‍යතා ප්‍රතිපත්තිය</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3 text-lime-300">අමතන්න</h4>
            <p className="text-white/80 text-sm">info@aswana.lk</p>
            <p className="text-white/80 text-sm">+94 76 123 4567</p>
            <div className="flex items-center space-x-4 mt-4 text-2xl text-white">
              <a href="#" className="hover:text-lime-300 transition duration-300">📱</a>
              <a href="#" className="hover:text-lime-300 transition duration-300">💬</a>
              <a href="#" className="hover:text-lime-300 transition duration-300">📧</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-green-700 text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} අස්වැන්න. සියලුම හිමිකම් ඇවිරිණි.</p>
        </div>
      </motion.footer>

      <ChatbotButton />
    </div>
  );
};

export default Home;
