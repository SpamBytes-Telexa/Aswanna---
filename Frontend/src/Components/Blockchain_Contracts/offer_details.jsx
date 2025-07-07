import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import OfferContractArtifact from "../../contracts/OfferContract.json"; // Adjust path as necessary


export default function OfferDetails() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [buyerId, setBuyerId] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/blockchain/buyer_accepting/${id}`)
      .then(res => res.json())
      .then(data => setOffer(data));
  }, [id]);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=lkr")
      .then(res => res.json())
      .then(data => setEthPrice(data.ethereum.lkr));
  }, []);

  const connectWallet = async () => {
    if (isConnecting) return;
    if (!window.ethereum) return alert("Please install MetaMask");

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      setWalletAddress(address);
      console.log("✅ Connected Wallet Address:", address);

      // Fetch buyer ID based on wallet address
      const res = await fetch(`http://localhost:8000/blockchain/by_wallet/${address}`);
      if (!res.ok) {
        throw new Error("Buyer not found or not registered.");
      }
      const buyerData = await res.json();
      setBuyerId(buyerData.id);
      console.log("✅ Buyer ID:", buyerData.id);
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
      const pricePerUnitInEth = (offer.price / ethPrice).toFixed(6);
      const totalEth = ethers.parseEther((totalRs / ethPrice).toFixed(6));
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Deploy OfferContract
      const factory = new ethers.ContractFactory(
        OfferContractArtifact.abi,
        OfferContractArtifact.bytecode,
        signer
      );

      const contract = await factory.deploy(
        walletAddress,               // buyer
        offer.farmer_wallet,         // farmer
        offer.quantity,              // quantity
        ethers.parseEther(pricePerUnitInEth), // pricePerUnit
        { value: totalEth }          // initial payment
      );

      await contract.waitForDeployment();
      const contractAddress = await contract.getAddress();
      console.log("✅ Deployed contract address:", contractAddress);

      // Send tx hash and contract address to backend
      const response = await fetch("http://localhost:8000/blockchain/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer_id: offer.id,
          buyer_id: buyerId,
          tx_hash: contract.deploymentTransaction().hash,
          contract_address: contractAddress
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Contract deployed & payment successful! Tx: " + contract.deploymentTransaction().hash);
      } else {
        alert("Contract deployed but DB failed: " + result.detail);
      }
    } catch (err) {
      console.error("Error during deployment/payment:", err);
      alert("Deployment or payment failed.");
    }
  };


  if (!offer) return <div className="p-6 text-center text-gray-500">Loading offer details...</div>;

  const totalRs = offer.price * offer.quantity;
  const totalEth = ethPrice ? (totalRs / ethPrice).toFixed(6) : "—";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-green-100 p-6 flex justify-center items-center">
            <img
              src={offer.photo}
              alt={offer.product}
              className="rounded-lg shadow-lg w-full h-72 object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <div className="p-6 space-y-4">
            <h2 className="text-3xl font-bold text-green-800">{offer.product} Offer</h2>
            <p><span className="font-semibold">Farmer Name:</span> {offer.farmer_name}</p>
            <p><span className="font-semibold">Farmer Wallet:</span> <span className="text-xs">{offer.farmer_wallet}</span></p>
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
                  ? `Connected: ${walletAddress.slice(0, 6)}...`
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
  );
}
