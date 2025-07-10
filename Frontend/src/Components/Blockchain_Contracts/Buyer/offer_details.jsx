import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import OfferContractArtifact from "../../../contracts/OfferContract.json";
import Navbar from "./b_navbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8000"; // or your backend URL


export default function OfferDetails() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [buyerId, setBuyerId] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.user_id);
        setUserName(decoded.sub);
      } catch (err) {
        console.error("Invalid JWT token", err);
        setError("Invalid or expired session. Please log in again.");
      }
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/blockchain/buyer_accepting/${id}`)
      .then(res => {
       console.log("Raw response:", res); // Logs the Response object
        return res.json(); // Returns the parsed JSON
      })
      .then(data => setOffer(data))
      .catch(err => console.error("Offer fetch failed", err));
  }, [id]);

  useEffect(() => {
    if (!userId) return;

    fetch(`${API_URL}/blockchain/get_wallet_address/${userId}`)
      .then(res => {
        console.log("Raw response:", res); // Logs the Response object
        return res.json(); // Returns the parsed JSON
      })
      .then(data => {
        console.log("Parsed wallet address data:", data); // Logs actual JSON response
        setWalletAddress(data.wallet_address);
      })
      .catch(err => console.error("Wallet fetch failed", err));
  }, [userId]);


  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=lkr")
      .then(res => res.json())
      .then(data => setEthPrice(data.ethereum.lkr))
      .catch(err => console.error("ETH price fetch failed", err));
  }, []);

  const connectWallet = async () => {
  if (isConnecting || !window.ethereum) {
    return alert("Please install MetaMask");
  }

  try {
    setIsConnecting(true);

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];
    const normalizedAddress = address.toLowerCase(); // for consistency
    setWalletAddress(normalizedAddress);

    console.log("Using address:", normalizedAddress); // Confirmed lowercased

    const res = await fetch(`${API_URL}/blockchain/by_wallet/${normalizedAddress}`);
    if (!res.ok) throw new Error("Buyer not found or not registered.");
    const buyerData = await res.json();
    setBuyerId(buyerData.id);
  } catch (err) {
    console.error("Wallet connect error:", err);
    alert(err.message);
  } finally {
    setIsConnecting(false);
  }
};


  const handleAccept = async () => {
    if (!walletAddress) return alert("Connect wallet first");
    if (!buyerId) return alert("Buyer not identified");
    if (!offer || !ethPrice) return;

    try {
      const totalRs = offer.price * offer.quantity;
      const ethAmount = (totalRs / ethPrice).toFixed(18); // max 18 decimals
      const pricePerUnitEth = (offer.price / ethPrice).toFixed(18); // max 18
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const factory = new ethers.ContractFactory(
        OfferContractArtifact.abi,
        OfferContractArtifact.bytecode,
        signer
      );

      const contract = await factory.deploy(
        walletAddress,
        offer.farmer_wallet,
        offer.quantity,
        ethers.parseEther(pricePerUnitEth),
        { value: ethers.parseEther(ethAmount) }
      );

      await contract.waitForDeployment();
      const contractAddress = await contract.getAddress();
      const txHash = contract.deploymentTransaction().hash;

      const response = await fetch(`${API_URL}/blockchain/contracts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer_id: offer.id,
          buyer_id: buyerId,
          tx_hash: txHash,
          contract_address: contractAddress
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Contract deployed & payment successful!\nTx: " + txHash);
      } else {
        alert("Contract deployed but DB failed: " + result.detail);
      }
    } catch (err) {
      console.error("❌ Deployment/payment failed:", err);
      alert(`Deployment or payment failed: ${err.message || err}`);
    }

  };

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  if (!offer) {
    return <div className="p-6 text-center text-gray-500">Loading offer details...</div>;
  }

  const totalRs = offer.price * offer.quantity;
  const totalEth = ethPrice ? (totalRs / ethPrice).toFixed(6) : "—";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-green-100 p-6 flex justify-center items-center">
              <img
                src={offer.photo}
                alt={offer.product}
                className="rounded-lg shadow-lg w-full h-72 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-3xl font-bold text-green-800">{offer.product} Offer</h2>
              <p><span className="font-semibold">Farmer Name:</span> {offer.farmer_name}</p>
             <p>
              <span className="font-semibold">Farmer Wallet:</span>{" "}
              {offer?.farmer_wallet
                ? `${offer.farmer_wallet.slice(0, 6)}...${offer.farmer_wallet.slice(-4)}`
                : "N/A"}
             </p>

              <p><span className="font-semibold">Quantity:</span> {offer.quantity} kg</p>
              <p><span className="font-semibold">Price per kg:</span> Rs. {offer.price}</p>
              <p><span className="font-semibold">Delivery Method:</span> {offer.delivery_method}</p>
              <p><span className="font-semibold">Location:</span> {offer.location}</p>
              <p><span className="font-semibold">Deadline:</span> {offer.deadline}</p>
              <p className="text-green-700 font-semibold">
                Total: Rs. {totalRs} ({totalEth} ETH)
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className={`${
                    isConnecting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-4 py-2 rounded-md transition`}
                >
                  {walletAddress
                    ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : isConnecting
                    ? "Connecting..."
                    : "Connect Wallet"}
                </button>

                <button
                  onClick={handleAccept}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                >
                  Accept & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
