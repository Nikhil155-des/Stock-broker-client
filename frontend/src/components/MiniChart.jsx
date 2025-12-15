import { useEffect, useRef } from "react";

export default function MiniChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || data.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const xStep = W / (data.length - 1);
    const y = (p) => H - ((p - min) / range) * H;

    ctx.beginPath();
    ctx.strokeStyle = "#4ea1ff";
    ctx.lineWidth = 2;

    data.forEach((price, i) => {
      const x = i * xStep;
      const py = y(price);
      i === 0 ? ctx.moveTo(x, py) : ctx.lineTo(x, py);
    });

    ctx.stroke();
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={80}
      className="w-full bg-[#081225] rounded"
    />
  );
}
