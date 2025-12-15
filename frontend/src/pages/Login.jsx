import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.trim()) return;
    localStorage.setItem("email", email);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1422] to-[#020617]">
      <div className="bg-[#0f1b2d] p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-white text-lg mb-4 font-semibold">Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full px-3 py-2 rounded
            bg-[#020617]
            text-white           ← 🔥 FIX
            placeholder-gray-400
            border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        <button
          onClick={handleLogin}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
