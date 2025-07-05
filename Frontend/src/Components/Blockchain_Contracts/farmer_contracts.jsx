import { useEffect, useState } from "react";
import bimage from "../../assets/contracts.jpeg";
export default function MyContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContracts = async () => {
    try {
      const response = await fetch("http://localhost:8000/blockchain/my-contracts");
      const data = await response.json();
      setContracts(data.contracts);
    } catch (error) {
      console.error("Failed to fetch contracts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleMarkDelivered = async (contractId) => {
    try {
      await fetch(`http://localhost:8000/api/contracts/${contractId}/deliver`, {
        method: "POST",
      });
      alert("Marked as delivered!");
      fetchContracts(); // Refresh
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleViewDispute = (contractId) => {
    alert(`View dispute for contract: ${contractId}`);
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        Loading contracts...
      </div>
    );

  const statusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "accepted":
        return <span className={`${base} bg-blue-100 text-blue-700`}>Accepted</span>;
      case "disputed":
        return <span className={`${base} bg-red-100 text-red-700`}>Disputed</span>;
      case "completed":
        return <span className={`${base} bg-green-100 text-green-700`}>Completed</span>;
      case "in_delivery":
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>In Delivery</span>;
      case "awaiting":
      default:
        return <span className={`${base} bg-gray-200 text-gray-700`}>Awaiting</span>;
    }
  };

  return (
    <div
  className="p-6 min-h-screen bg-gradient-to-b from-green-50 to-white bg-fixed bg-cover"
    style={{
      backgroundImage: `url(${bimage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center",
      backgroundSize: "cover",
    }}

>
  <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-6 text-center text-green-800 flex items-center justify-center gap-2">
      🌱 My Crop Contracts
    </h2>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-green-200 text-sm">
        <thead className="bg-green-100 text-green-900">
          <tr>
            <th className="p-3 text-left"> Product</th>
            <th className="p-3 text-left"> Price (Rs)</th>
            <th className="p-3 text-left"> Status</th>
            <th className="p-3 text-left"> Delivery</th>
            <th className="p-3 text-left"> Location</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left"> Deadline</th>
            <th className="p-3 text-left"> Photo</th>
            <th className="p-3 text-left"> Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {contracts.map((c) => (
            <tr key={c.id} className="hover:bg-green-50">
              <td className="p-3">{c.product}</td>
              <td className="p-3">Rs. {c.price}</td>
              <td className="p-3">{statusBadge(c.status)}</td>
              <td className="p-3 capitalize">{c.delivery_method}</td>
              <td className="p-3">{c.location}</td>
              <td className="p-3">{c.quantity} kg</td>
              <td className="p-3">{c.deadline}</td>
              <td className="p-3">
                <img
                  src={c.photo}
                  alt={c.product}
                  className="h-24 w-24 object-cover rounded-xl shadow-md mx-auto"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </td>
              <td className="p-3 space-y-1">
                {c.status === "accepted" && (
                  <button
                    onClick={() => handleMarkDelivered(c.id)}
                    className="w-full bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700 transition"
                  >
                    ✅ Mark Delivered
                  </button>
                )}
                {c.status === "disputed" && (
                  <button
                    onClick={() => handleViewDispute(c.id)}
                    className="w-full bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                  >
                    ⚠ View Dispute
                  </button>
                )}
                {c.status === "completed" && (
                  <span className="text-green-700 font-semibold">✔ Completed</span>
                )}
                {(c.status === "awaiting" || c.status === "in_delivery") && (
                  <span className="text-gray-500">⏳ No action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}
