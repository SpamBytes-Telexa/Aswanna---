import React from "react";
import ChatbotButton from "../components/chatbotbutton";
import { motion } from "framer-motion";
import paddy from "../../assets/tea4.jpeg";

const features = [
  {
    title: "පළිබෝධ හඳුනා ගැනීම",
    emoji: "📷",
    description: "ඔබගේ බෝගයේ රෝග සහ පළිබෝධ ඡායාරූපයකින් හඳුනා ගන්න",
  },
  {
    title: "වගා නිර්දේශ",
    emoji: "🌱",
    description: "භූමි ප්‍රදේශය, කාලගුණය අනුව සුදුසු බෝග තෝරන්න",
  },
  {
    title: "වෙළඳ මිල තොරතුරු",
    emoji: "💰",
    description: "වෙළඳපොලේ ඇති බෝග මිල දිස්ත්‍රික්ක අනුව බලන්න",
  },
  {
    title: "කාලගුණ අනාවැකි",
    emoji: "🌦",
    description: "අලුත්ම කාලගුණ තොරතුරු සහ අනතුරු ඇඟවීම්",
  },
  {
    title: "ගොවියන්ගේ සමාජ ජාලය",
    emoji: "🧑‍🌾",
    description: "වෙනත් ගොවින් සමඟ පළපුරුදු හුවමාරු කරන්න",
  },
  {
    title: "වට්ටම් සහ මිල",
    emoji: "🏷",
    description: "පොහොර හා උපකරණ සඳහා වට්ටම් බලන්න",
  },
];


// Animation Variants
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

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
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
      stiffness: 100
    }
  }),
  hover: {
    y: [0, -10, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${paddy})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/80 min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-80 px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
          >
            

            <motion.h1 
            className="mt-5 text-[120px] font-bold text-green-800 mb-4"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            >
            {"අස්වැන්න".split("").map((letter, index) => (
                <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                style={{ display: "inline-block" }}
                whileHover={{ scale: 1.2, color: "#14532d" }}
                >
                {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
            </motion.h1>

            <motion.h2
              className="mt-20 text-3xl sm:text-5xl font-semibold text-yellow-600 mb-6"
              initial="hidden"
              whileInView="visible"
              variants={fadeInVariant}
              viewport={{ once: true }}
            >
              අස්වැන්න වෙත පිළිගනිමු!
            </motion.h2>

            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              variants={fadeInVariant}
              viewport={{ once: true }}
            >
              <p className="text-xl text-gray-700 mb-6">
                ශ්‍රී ලංකාවේ ගොවීන්ගේ සංකෘතිමත් අනාගතය සදහා නවීන තාක්ෂණික විසඳුම්.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                අපගේ වේදිකාව ඔබට ලබා දෙන්නේ පළිබෝධ හඳුනාගැනීම, වගා නිර්දේශ,
                කාලගුණ තොරතුරු සහ වෙළඳපල මිල දත්ත ඇතුළත් සම්පූර්ණ කෘෂිකර්මාන්ත
                සහය පද්ධතියක්.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        

        <section className="py-10 px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
            {features.map((feature, index) => (
            <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                y: -8, 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 border-l-4 border-green-500 p-6
                        hover:border-green-600 hover:bg-green-50 group"
            >
                {/* Animated background element */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-yellow-50 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                {/* Emoji with pop effect */}
                <motion.div 
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-4xl mb-3 inline-block"
                >
                {feature.emoji}
                </motion.div>
                
                {/* Text with subtle color change */}
                <h3 className="text-lg font-bold text-green-800 mb-2 group-hover:text-green-900 transition-colors">
                {feature.title}
                </h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                {feature.description}
                </p>
                
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
            ))}
        </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          className="bg-green-800 text-white py-4 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <h3 className="text-xl font-bold mb-1">අස්වැන්න</h3>
              <p className="text-green-100 text-sm">
                ශ්‍රී ලංකාවේ ගොවීන් සඳහා නවීන තාක්ෂණික විසඳුම්.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-1">සබැඳි</h4>
              <ul className="space-y-0.5 text-sm">
                <li>
                  <a href="#" className="hover:text-yellow-300 transition">
                    ගිණුම
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition">
                    සේවා
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition">
                    රහස්‍යතා ප්‍රතිපත්තිය
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-1">අමතන්න</h4>
              <p className="text-green-100 text-sm">info@aswana.lk</p>
              <p className="text-green-100 text-sm">+94 76 123 4567</p>
              <div className="flex space-x-2 mt-1">
                <a href="#" className="text-lg hover:text-yellow-300">📱</a>
                <a href="#" className="text-lg hover:text-yellow-300">💬</a>
                <a href="#" className="text-lg hover:text-yellow-300">📧</a>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-3 pt-3 text-center text-green-100 text-sm">
            <p>© {new Date().getFullYear()} අස්වැන්න. සියලුම හිමිකම් ඇවිරිණි.</p>
          </div>
        </motion.footer>

        <ChatbotButton />
      </div>
    </div>
  );
};

export default Home;
