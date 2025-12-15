import React, { useEffect, useRef, useState } from "react";
import StockCard from "../components/StockCard";
import ExpandedChartModal from "../components/ExpandedChartModal";

const STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

export default function Dashboard() {
  const email = localStorage.getItem("email");

  const [subscribed, setSubscribed] = useState([]);
  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState({});
  const [expandedStock, setExpandedStock] = useState(null);

  const intervalRef = useRef(null);

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    if (!email) {
      window.location.href = "/";
    }
  }, [email]);

  /* 🔄 REAL-TIME PRICE ENGINE (FIXED) */
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setPrices((prevPrices) => {
        const updatedPrices = { ...prevPrices };

        subscribed.forEach((symbol) => {
          const last =
            prevPrices[symbol] ?? 100 + Math.random() * 40;

          updatedPrices[symbol] = +(
            last + (Math.random() - 0.5) * 3
          ).toFixed(2);
        });

        return updatedPrices;
      });

      setHistory((prevHistory) => {
        const updatedHistory = { ...prevHistory };

        subscribed.forEach((symbol) => {
          const prevArr = prevHistory[symbol] ?? [];
          const latestPrice =
            prices[symbol] ??
            100 + Math.random() * 40;

          updatedHistory[symbol] = [
            ...prevArr.slice(-60),
            latestPrice,
          ];
        });

        return updatedHistory;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [subscribed, prices]);

  /* ➕ SUBSCRIBE */
  const subscribeStock = (symbol) => {
    if (subscribed.includes(symbol)) return;

    setSubscribed((prev) => [...prev, symbol]);

    const startPrice = +(100 + Math.random() * 40).toFixed(2);

    setPrices((p) => ({ ...p, [symbol]: startPrice }));
    setHistory((h) => ({ ...h, [symbol]: [startPrice] }));
  };

  /* ➖ UNSUBSCRIBE */
  const unsubscribeStock = (symbol) => {
    setSubscribed((prev) => prev.filter((s) => s !== symbol));
    setExpandedStock(null);
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#0a1422] text-white p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Live Stock Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Logged in as: {email}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* STOCK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STOCKS.map((symbol) => {
          const isSub = subscribed.includes(symbol);

          return (
            <StockCard
              key={symbol}
              symbol={symbol}
              price={prices[symbol]}
              data={history[symbol] || []}
              subscribed={isSub}
              onSubscribe={() => subscribeStock(symbol)}
              onUnsubscribe={() => unsubscribeStock(symbol)}
              onExpand={() => setExpandedStock(symbol)}
            />
          );
        })}
      </div>

      {/* 🔍 EXPANDED CHART MODAL */}
      {expandedStock && (
        <ExpandedChartModal
          symbol={expandedStock}
          data={history[expandedStock] || []}
          onClose={() => setExpandedStock(null)}
        />
      )}
    </div>
  );
}
