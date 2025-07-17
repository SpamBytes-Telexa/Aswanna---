import Navbar from "../madhuni/components/Navbar";
import { motion } from "framer-motion";

const defaultPrices = [
    {
        name: "Urea",
        price: 3500,
        discount: "20%",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Muriate of Potash (MOP)",
        price: 4200,
        discount: "15%",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Triple Super Phosphate (TSP)",
        price: 3900,
        discount: "18%",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Eppawala Rock Phosphate",
        price: 2500,
        discount: "10%",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Ammonium Sulphate",
        price: 3200,
        discount: "12%",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Organic Fertilizer",
        price: 2800,
        discount: "25%",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9f3?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Neem Cake",
        price: 3000,
        discount: "30%",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9f3?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Gypsum",
        price: 2700,
        discount: "15%",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9f3?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Dolomite",
        price: 3100,
        discount: "20%",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9f3?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Micronutrients",
        price: 4000,
        discount: "15%",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9f3?auto=format&fit=crop&w=200&q=80"
    }
]

function Discounts() {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen mx-auto items-center justify-center bg-gradient-to-tr from-green-100 to-green-50 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl text-green-900 text-center font-bold mb-6">වට්ටම් සහ මිල</h1>
                <p className="mb-4 text-green-600 text-center">පොහොර හා උපකරණ සඳහා වට්ටම් සහ මිල තොරතුරු මෙහි ඇත.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {defaultPrices.map((item, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 items-center justify-center">
                            <div className="flex flex-col items-center justify-center">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-0 mb-2" />
                                <div>
                                    <h2 className="text-xl font-semibold m-2 text-center">{item.name}</h2>
                                    <p className="text-gray-700 m-1 text-center">මිල: Rs. {item.price}</p>
                                    <p className="text-green-600 m-1 text-center">වට්ටම: {item.discount}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
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

        </div>
    )
}

export default Discounts;