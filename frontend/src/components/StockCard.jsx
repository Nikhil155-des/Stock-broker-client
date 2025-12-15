import React, { useEffect, useRef } from "react";

export default function StockCard({
  symbol,
  price,
  data,
  subscribed,
  onSubscribe,
  onUnsubscribe,
  onExpand,
}) {
  const canvasRef = useRef(null);

  /* 📈 MINI CHART */
  useEffect(() => {
    if (!subscribed || !data || data.length < 2) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const xStep = W / (data.length - 1);
    const y = (v) => H - ((v - min) / range) * (H - 10) - 5;

    // 🔹 LINE
    ctx.beginPath();
    ctx.strokeStyle = "#4ea1ff";
    ctx.lineWidth = 2;

    data.forEach((p, i) => {
      const x = i * xStep;
      const py = y(p);
      i === 0 ? ctx.moveTo(x, py) : ctx.lineTo(x, py);
    });

    ctx.stroke();

    // 🔹 LAST PRICE DOT
    const last = data[data.length - 1];
    const lastX = (data.length - 1) * xStep;
    const lastY = y(last);

    ctx.fillStyle = "#00ff9d";
    ctx.beginPath();
    ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
    ctx.fill();

    // 🔹 PRICE LABEL
    ctx.fillStyle = "#00ff9d";
    ctx.font = "10px sans-serif";
    ctx.fillText(`₹${last.toFixed(2)}`, lastX - 32, lastY - 6);
  }, [data, subscribed]);

  return (
    <div className="bg-[#101c2f] rounded-xl p-5 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{symbol}</h3>

        {subscribed ? (
          <button
            onClick={onUnsubscribe}
            className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Unsubscribe
          </button>
        ) : (
          <button
            onClick={onSubscribe}
            className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Subscribe
          </button>
        )}
      </div>

      {subscribed ? (
        <>
          <p className="text-xl font-bold mb-2">
            ₹ {price?.toFixed(2)}
          </p>

          <canvas
            ref={canvasRef}
            width={280}
            height={70}
            className="bg-[#0b1626] rounded mb-2"
          />

          <button
            onClick={onExpand}
            className="text-blue-400 text-sm hover:underline"
          >
            View detailed chart
          </button>
        </>
      ) : (
        <p className="text-gray-400 text-sm">
          Subscribe to view price & chart
        </p>
      )}
    </div>
  );
}
