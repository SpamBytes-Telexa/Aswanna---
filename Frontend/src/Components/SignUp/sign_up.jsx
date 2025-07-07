import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [user_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wallet_address, setWalletAddress] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_name || !email || !password || !wallet_address) {
      setError("All fields are required.");
      return;
    }

    try {
      const payload = {
        wallet_address, 
        user_name,
        email,
        password_hash: password, // Assuming password is hashed in the backend
        role: userType,  
      };

      const res = await axios.post("http://localhost:8000/auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-green-700 text-center">Aswanna</h1>
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign Up</h2>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-100 rounded p-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
              placeholder="Enter your name"
              value={user_name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
              placeholder="0x..."
              value={wallet_address}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
            <div className="flex gap-4">
              {["farmer", "buyer"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`px-4 py-2 rounded-lg border ${
                    userType === type
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-green-100"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
