import React from "react";

export default function Sidebar({ user, onLogout }) {
  return (
    <div className="w-64 h-screen bg-slate-800 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-400">StockDesk</h2>
        <p className="mt-4 text-sm">Logged in as:</p>
        <p className="text-sm text-blue-300">{user.email}</p>
      </div>

      <button
        onClick={onLogout}
        className="bg-red-600 p-3 rounded-lg font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
