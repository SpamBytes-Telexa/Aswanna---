import { useEffect, useState } from "react";

export default function MyContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContracts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/my-contracts");
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
    // You can redirect or open modal
    alert(`View dispute for contract: ${contractId}`);
  };

  if (loading) return <div className="p-4">Loading contracts...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Contracts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price (Rs)</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">deliveryMethod</th>
              <th className="p-2 border">location</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">deadline</th>
              <th className="p-2 border">photo</th>

            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr key={c.id} className="text-center">
                <td className="p-2 border">{c.product}</td>
                <td className="p-2 border">{c.price}</td>
                <td className="p-2 border">{c.status}</td>
                <td className="p-2 border">{c.delivery_method}</td>
                <td className="p-2 border">{c.location}</td>
                <td className="p-2 border">{c.quantity}</td>
                <td className="p-2 border">{c.deadline}</td>

                <td className="p-2 border space-x-2">
                  {c.status === "Buyer accepted" && (
                    <button
                      onClick={() => handleMarkDelivered(c.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {c.status === "Disputed" && (
                    <button
                      onClick={() => handleViewDispute(c.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      View Dispute
                    </button>
                  )}
                  {c.status === "Completed" && (
                    <span className="text-green-600 font-semibold">Done</span>
                  )}
                  {(c.status === "Awaiting buyer" || c.status === "In delivery") && (
                    <span className="text-gray-500">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
