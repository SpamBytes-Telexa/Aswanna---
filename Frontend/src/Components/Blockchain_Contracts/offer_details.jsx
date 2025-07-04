import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";

export default function OfferDetails() {
  const { id } = useParams(); // Offer ID from URL
  const [offer, setOffer] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [ethPrice, setEthPrice] = useState(null); // Optional ETH conversion

  useEffect(() => {
    fetch(`http://localhost:8000/api/offers/${id}`)
      .then(res => res.json())
      .then(data => setOffer(data));
  }, [id]);

  // Optional: fetch current ETH price to convert Rs → ETH
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=lkr")
      .then(res => res.json())
      .then(data => setEthPrice(data.ethereum.lkr));
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWalletAddress(accounts[0]);
  };

  const handleAccept = async () => {
    if (!walletAddress) return alert("Connect wallet first");
    if (!offer) return;

    const totalRs = offer.price * offer.quantity;
    const totalEth = ethers.parseEther((totalRs / ethPrice).toFixed(6));

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Example: sending ETH directly (replace with contract interaction)
    const tx = await signer.sendTransaction({
      to: offer.farmer, // send to farmer wallet or contract address
      value: totalEth
    });

    alert("Payment sent! Tx: " + tx.hash);
  };

  if (!offer) return <div className="p-4">Loading offer details...</div>;

  const totalRs = offer.price * offer.quantity;
  const totalEth = ethPrice ? (totalRs / ethPrice).toFixed(6) : "—";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{offer.product} Offer Details</h2>
      <p><strong>Farmer Wallet:</strong> {offer.farmer}</p>
      <p><strong>Quantity:</strong> {offer.quantity} kg</p>
      <p><strong>Price per kg:</strong> Rs. {offer.price}</p>
      <p><strong>Total Price:</strong> Rs. {totalRs}</p>
      <p><strong>Delivery:</strong> {offer.deliveryMethod}</p>
      <p><strong>Deadline:</strong> {offer.deadline}</p>
      <p><strong>Approx ETH:</strong> {totalEth} ETH</p>

      <div className="mt-6 space-x-4">
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
        </button>

        <button
          onClick={handleAccept}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Accept & Pay
        </button>
      </div>
    </div>
  );
}
