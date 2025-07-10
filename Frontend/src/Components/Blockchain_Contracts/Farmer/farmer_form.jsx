import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "./f_navbar";
import bimage from "../../../assets/leaves.jpeg";

const PostAdvertisementForm = () => {
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    price: "",
    deadline: "",
    delivery_method: "pickup",
    location: "",
    photo: null,
  });

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);
        const extractedUserId = decoded.user_id;

        if (
          typeof extractedUserId === "string" &&
          /^[0-9a-fA-F\-]{36}$/.test(extractedUserId)
        ) {
          setUserId(extractedUserId);
          setUserName(decoded.sub || "Unknown User");
        } else {
          console.error("Invalid user_id format in JWT:", extractedUserId);
        }
      } catch (err) {
        console.error("JWT decode error:", err);
      }
    } else {
      console.error("No accessToken cookie found");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const data = new FormData();

    for (const key in formData) {
      if (key === "photo" && !formData[key]) continue; // skip empty photo
      data.append(key, formData[key]);
    }

    if (!userId) {
      console.error("No user ID available");
      setStatus("❌ Could not identify user.");
      setLoading(false);
      return;
    }

    data.append("farmer_id", userId);

    try {
      const response = await fetch(
        "http://localhost:8000/blockchain/post_offer",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Backend error:", errText);
        throw new Error("Server error");
      }

      await response.json();
      setStatus("✅ Advertisement posted successfully!");
      setFormData({
        product: "",
        quantity: "",
        price: "",
        deadline: "",
        delivery_method: "pickup",
        location: "",
        photo: null,
      });
    } catch (error) {
      console.error("Failed to post offer:", error);
      setStatus("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white bg-fixed bg-cover"
        style={{
          backgroundImage: `url(${bimage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-lg w-full bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-green-200">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-500 to-emerald-700 mb-2 drop-shadow-lg">
            🌾 Post Your Crop Offer
          </h2>
          <p className="text-sm text-gray-700 text-center mb-6">
            👤 <strong>{userName}</strong>
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="product"
              placeholder="Product Name"
              value={formData.product}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (kg)"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
            />
            <input
              type="number"
              name="price"
              placeholder="Price per kg (Rs)"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
            />
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-green-800 mb-1"
              >
                Deadline
              </label>
              <input
                required
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
              />
            </div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
            />
            <select
              name="delivery_method"
              value={formData.delivery_method}
              onChange={handleInputChange}
              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
            >
              <option value="pickup">Pickup</option>
              <option value="drop-off">Drop-off</option>
            </select>
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-green-800 mb-1"
              >
                Upload Product Image
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full border border-green-200 rounded-lg p-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition transform hover:scale-105 ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 shadow-lg"
              }`}
            >
              {loading ? "Posting..." : "Post Offer"}
            </button>

            {status && (
              <div
                className={`text-center text-sm mt-2 font-semibold ${
                  status.includes("✅")
                    ? "text-green-600"
                    : status.includes("❌")
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default PostAdvertisementForm;
