import React, { useEffect, useRef } from "react";

export default function ExpandedChartModal({ symbol, data, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || data.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;
    const padding = 70;

    ctx.clearRect(0, 0, W, H);

    /* 🌑 BACKGROUND */
    ctx.fillStyle = "#0b1626";
    ctx.fillRect(0, 0, W, H);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const xStep = (W - padding * 2) / (data.length - 1);
    const y = (v) =>
      H - padding - ((v - min) / range) * (H - padding * 2);

    /* 🧭 TIME GENERATION (1 sec interval) */
    const now = Date.now();
    const times = data.map((_, i) =>
      new Date(now - (data.length - 1 - i) * 1000)
    );

    /* 📐 GRID + PRICE LABELS */
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";

    for (let i = 0; i <= 5; i++) {
      const price = min + (range / 5) * i;
      const py = y(price);

      ctx.beginPath();
      ctx.moveTo(padding, py);
      ctx.lineTo(W - padding, py);
      ctx.stroke();

      ctx.fillText(`₹ ${price.toFixed(2)}`, 10, py + 4);
    }

    /* 📈 PRICE LINE */
    ctx.beginPath();
    ctx.strokeStyle = "#4ea1ff";
    ctx.lineWidth = 3;

    data.forEach((p, i) => {
      const x = padding + i * xStep;
      const py = y(p);
      i === 0 ? ctx.moveTo(x, py) : ctx.lineTo(x, py);
    });

    ctx.stroke();

    /* 🌊 AREA FILL */
    ctx.lineTo(W - padding, H - padding);
    ctx.lineTo(padding, H - padding);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, padding, 0, H);
    gradient.addColorStop(0, "rgba(78,161,255,0.35)");
    gradient.addColorStop(1, "rgba(78,161,255,0)");

    ctx.fillStyle = gradient;
    ctx.fill();

    /* 🎯 CURRENT PRICE LINE */
    const last = data[data.length - 1];
    const lastY = y(last);

    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = "#00ff9d";
    ctx.beginPath();
    ctx.moveTo(padding, lastY);
    ctx.lineTo(W - padding, lastY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#00ff9d";
    ctx.font = "14px sans-serif";
    ctx.fillText(`₹ ${last.toFixed(2)}`, W - padding + 10, lastY + 5);

    /* ⏱️ TIME AXIS (BOTTOM) */
    ctx.fillStyle = "#9ca3af";
    ctx.font = "11px monospace";

    const timeSteps = 5;
    for (let i = 0; i <= timeSteps; i++) {
      const idx = Math.floor((data.length - 1) * (i / timeSteps));
      const t = times[idx];

      const label = t.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const x = padding + idx * xStep;
      ctx.fillText(label, x - 28, H - 20);
    }

    /* 📅 DATE LABEL */
    const dateLabel = times[times.length - 1].toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    ctx.fillText(dateLabel, padding, H - 45);
  }, [data]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0b1626] rounded-xl w-[90%] max-w-5xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">
            {symbol} — Live Chart
          </h2>
          <button
            onClick={onClose}
            className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={900}
          height={420}
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
}
