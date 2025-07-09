import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./b_navbar";
import Cookies  from "js-cookie";
import { jwtDecode } from "jwt-decode";
export default function Marketplace() {

                 
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
      console.log("Access Token:", token);
      if (token) {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);
        setUserId(decoded.user_id); // Use state updater
        setUserName(decoded.sub); // Set user name from decoded token
        console.log("Decoded user ID:", decoded.user_id);
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
          <span>Hello {userName} </span>
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to the Marketplace! Discover fresh agricultural offers directly from our trusted farmers. Enjoy safe transactions and quality produce! 
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 text-green-800 flex items-center gap-2">
          🛒 Marketplace
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            name="crop"
            placeholder="Crop type"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max price"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <button
            onClick={fetchOffers}
            className="bg-green-700 text-white p-3 rounded-md hover:bg-green-800 transition"
          >
             Refresh
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
                <h3 className="text-xl font-bold text-green-800">{offer.product}</h3>
                <p><span className="font-medium">Quantity:</span> {offer.quantity} kg</p>
                <p><span className="font-medium">Price:</span> Rs. {offer.price}/kg</p>
                <p><span className="font-medium">Deadline:</span> {offer.deadline}</p>
                <p><span className="font-medium">Location:</span> {offer.location}</p>
                <p><span className="font-medium">Delivery:</span> {offer.delivery_method}</p>
                <p><span className="font-medium">Farmer:</span>  {offer.farmer}</p>
                <p><span className="font-medium">Rating:</span> ⭐ {offer.rating || "N/A"}</p>


                <button
                  onClick={() => {
                    alert(`Redirecting to accept offer ID: ${offer.id}`);
                    navigate(`/offer/${offer.id}`);
                  }}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  View & Accept
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
