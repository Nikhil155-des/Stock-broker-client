import React from "react";
import Chart from "react-apexcharts";

export default function CandleModal({ symbol, candles, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-slate-800 p-4 w-3/4 rounded-xl">
        <h2 className="mb-2">{symbol} — Live Chart</h2>
        <Chart
          type="candlestick"
          height={350}
          series={[{ data: candles || [] }]}
          options={{
            chart: { toolbar: { show: true } },
            xaxis: { type: "datetime" },
            plotOptions: {
              candlestick: {
                colors: { upward: "#22c55e", downward: "#ef4444" },
              },
            },
          }}
        />
        <button
          className="bg-red-600 mt-4 px-4 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
