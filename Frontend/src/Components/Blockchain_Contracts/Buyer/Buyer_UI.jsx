import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./b_navbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

export default function Marketplace() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [filters, setFilters] = useState({
    crop: "",
    location: "",
    maxPrice: "",
  });

  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:8000/blockchain/marketplace-offers");
      const data = await response.json();
      setOffers(data);
    } catch (err) {
      console.error("Failed to fetch offers", err);
    }
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.user_id);
      setUserName(decoded.sub);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, []);

  const filteredOffers = offers.filter((offer) => {
    return (
      (!filters.crop || offer.product.toLowerCase().includes(filters.crop.toLowerCase())) &&
      (!filters.location || offer.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.maxPrice || offer.price <= parseFloat(filters.maxPrice))
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <div className="mb-8 rounded-2xl border border-green-200 bg-green-50/50 p-6 shadow-sm hover:shadow-md transition">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-800 flex items-center gap-2 mb-3">
            <span>{t("Hello")}, {userName}</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t("Welcome to the Marketplace! Discover fresh agricultural offers directly from our trusted farmers. Enjoy safe transactions and quality produce!")}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6 text-green-800 flex items-center gap-2">
            🛒 {t("Marketplace")}
          </h2>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <input
              type="text"
              name="crop"
              placeholder={t("Crop type")}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder={t("Location")}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder={t("Max price")}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
            />
            <button
              onClick={fetchOffers}
              className="bg-green-700 text-white p-3 rounded-md hover:bg-green-800 transition"
            >
              {t("Refresh")}
            </button>
          </div>

          {/* Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="border rounded-2xl shadow-md bg-white hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <img
                  src={offer.photo}
                  alt={offer.product}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold text-green-800">{t(offer.product)}</h3>
                  <p><span className="font-medium">{t("Quantity")}:</span> {offer.quantity} kg</p>
                  <p><span className="font-medium">{t("Price")}:</span> Rs. {offer.price}/kg</p>
                  <p><span className="font-medium">{t("Deadline")}:</span> {offer.deadline}</p>
                  <p><span className="font-medium">{t("Location")}:</span> {t(offer.location)}</p>
                  <p><span className="font-medium">{t("Delivery")}:</span> {t(offer.delivery_method)}</p>
                  <p><span className="font-medium">{t("Farmer")}:</span> {offer.farmer}</p>
                  <p><span className="font-medium">{t("Rating")}:</span> ⭐ {offer.rating || "N/A"}</p>

                  <button
                    onClick={() => navigate(`/offer/${offer.id}`)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                  >
                    {t("View & Accept")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
