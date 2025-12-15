const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];
const prices = {};
const candles = {};

STOCKS.forEach((s) => {
  prices[s] = 100 + Math.random() * 50;
  candles[s] = [];
});

// generate candle
function generateCandle(symbol) {
  const last = prices[symbol];
  const open = last;
  const close = open + (Math.random() - 0.5) * 2;
  const high = Math.max(open, close) + Math.random();
  const low = Math.min(open, close) - Math.random();

  prices[symbol] = close;

  return {
    x: new Date(),
    y: [
      open.toFixed(2),
      high.toFixed(2),
      low.toFixed(2),
      close.toFixed(2),
    ],
  };
}

io.on("connection", (socket) => {
  socket.on("join", (email) => {
    socket.join(email);
  });

  socket.on("subscribe", ({ email, symbol }) => {
    socket.join(`${email}:${symbol}`);
  });

  socket.on("unsubscribe", ({ email, symbol }) => {
    socket.leave(`${email}:${symbol}`);
  });
});

// emit every second
setInterval(() => {
  STOCKS.forEach((symbol) => {
    const candle = generateCandle(symbol);
    candles[symbol].push(candle);
    if (candles[symbol].length > 50) candles[symbol].shift();

    io.emit("price", {
      symbol,
      price: prices[symbol].toFixed(2),
    });

    io.emit("candle", {
      symbol,
      candle,
    });
  });
}, 1000);

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
