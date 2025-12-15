import React from "react";
import Chart from "react-apexcharts";

export default function CandleChart({ data }) {
  const series = [
    {
      data: data.map((d) => ({
        x: new Date(d.time),
        y: [d.open, d.high, d.low, d.close],
      })),
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      background: "transparent",
    },
    theme: { mode: "dark" },
    xaxis: { type: "datetime" },
  };

  return <Chart options={options} series={series} type="candlestick" height={300} />;
}
