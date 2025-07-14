import { useEffect, useState } from "react";
import Navbar from "./b_navbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:8000";

export default function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.user_id);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetch(`${API_URL}/blockchain/my-purchases/${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to fetch orders", err))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleConfirm = async (contractId) => {
    try {
      const res = await fetch(
        `${API_URL}/blockchain/confirm_contracts/${contractId}/status?new_status=completed`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error("Failed to confirm delivery");
      alert(t("confirmSuccess"));
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(t("confirmError"));
    }
  };

  const handleDispute = async (contractId) => {
    try {
      const res = await fetch(
        `${API_URL}/blockchain/confirm_contracts/${contractId}/status?new_status=disputed`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error("Failed to raise dispute");
      alert(t("disputeSuccess"));
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(t("disputeError"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-white">
        <h2 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
           {t("My Purchases")}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">{t("loading")}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-red-500">{t("noOrders")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-xl rounded-2xl p-6 border border-green-200 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-green-700 mb-3">
                  {t(order.product)}
                </h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li><strong>{t("Quantity")}:</strong> {order.quantity} kg</li>
                  <li><strong>{t("Price per kg")}:</strong> Rs. {order.price}</li>
                  <li><strong>{t("Total")}:</strong> Rs. {order.total_price}</li>
                  <li><strong>{t("Farmer Name")}:</strong> {order.farmer_name}</li>
                  <li><strong>{t("Delivery")}:</strong> {t(order.delivery_method)} ({order.location})</li>
                  <li>
                    <strong>{t("status")}:</strong>{" "}
                    <span className={`ml-2 px-2 py-1 rounded text-white text-xs font-semibold ${
                      order.status === "completed"
                        ? "bg-green-600"
                        : order.status === "cancelled"
                        ? "bg-red-600"
                        : order.status === "disputed"
                        ? "bg-yellow-600"
                        : "bg-yellow-500"
                    }`}>
                      {t(order.status)}
                    </span>
                  </li>
                  <li><strong>{t("deadline")}:</strong> {order.deadline}</li>
                  <li><strong>{t("contract")}:</strong> {order.contract_address.slice(0, 6)}...{order.contract_address.slice(-4)}</li>
                  <li><strong>{t("transaction")}:</strong> {order.tx_hash.slice(0, 6)}...{order.tx_hash.slice(-4)}</li>
                </ul>

                {order.status !== "completed" && order.status !== "cancelled" && (
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => handleConfirm(order.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium"
                    >
                      ✅ {t("Confirm Delivery")}
                    </button>
                    <button
                      onClick={() => handleDispute(order.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium"
                    >
                      ⚠️ {t("Raise Dispute")}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}