import { useEffect, useState } from "react";

export default function Marketplace() {
  const [offers, setOffers] = useState([]);
  const [filters, setFilters] = useState({
    crop: "",
    location: "",
    maxPrice: "",
  });

  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/marketplace-offers");
      const data = await response.json();
      setOffers(data);
    } catch (err) {
      console.error("Failed to fetch offers", err);
    }
  };

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
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Marketplace</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="crop"
          placeholder="Crop type"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <button
          onClick={fetchOffers}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="border p-4 rounded-lg shadow hover:shadow-lg bg-white">
            <h3 className="text-xl font-semibold mb-2">{offer.product}</h3>
            <p>Quantity: <span className="font-medium">{offer.quantity} kg</span></p>
            <p>Price: <span className="font-medium">Rs. {offer.price}/kg</span></p>
            <p>Deadline: {offer.deadline}</p>
            <p>Location: {offer.location}</p>
            <p>Farmer: <span className="text-sm text-gray-600">{offer.farmer}</span></p>
            <p>Rating: ⭐ {offer.rating || "N/A"}</p>

            <button
              onClick={() => alert(`Redirecting to accept offer ID: ${offer.id}`)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              View & Accept
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
