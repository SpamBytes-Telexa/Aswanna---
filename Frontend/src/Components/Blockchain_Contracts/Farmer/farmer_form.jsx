import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "./f_navbar";

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

        if (typeof extractedUserId === "string" && /^[0-9a-fA-F\-]{36}$/.test(extractedUserId)) {
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

    // Debug output
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("http://localhost:8000/blockchain/post_offer", {
        method: "POST",
        body: data,
      });

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
      <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-2xl bg-white border border-green-200">
        <h2 className="text-3xl font-bold mb-4 text-center text-green-800">🌾 Post Your Crop Offer</h2>

        <p className="text-sm text-gray-600 text-center mb-4">
          👤 <strong>{userName}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="product"
            placeholder="Product Name"
            value={formData.product}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity (kg)"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price per kg (Rs)"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            required
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="delivery_method"
            value={formData.delivery_method}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="pickup">Pickup</option>
            <option value="drop-off">Drop-off</option>
          </select>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Upload Product Image
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-medium transition ${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
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
    </>
  );
};

export default PostAdvertisementForm;
