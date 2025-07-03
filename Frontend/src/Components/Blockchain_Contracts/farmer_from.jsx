import { useState } from "react";
import { ethers } from "ethers";

export default function PostAdvertisementForm() {
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    price: "",
    deadline: "",
    deliveryMethod: "pickup",
    photo: null,
  });

  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
    } else {
      alert("MetaMask not detected.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletAddress) {
      alert("Please connect MetaMask first.");
      return;
    }

    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("wallet", walletAddress);

    try {
      const response = await fetch("http://localhost:8000/api/post_offer", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      alert("Advertisement posted successfully!");
    } catch (error) {
      console.error("Failed to post offer:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-xl bg-white">
      <h2 className="text-2xl font-bold mb-4">Post Your Crop Offer</h2>
      <button
        onClick={connectWallet}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect MetaMask"}
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          required
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (kg)"
          required
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price per kg (Rs)"
          required
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="deadline"
          required
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="deliveryMethod"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="pickup">Pickup</option>
          <option value="drop-off">Drop-off</option>
        </select>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Posting..." : "Post Offer"}
        </button>
      </form>
    </div>
  );
}
