const { Server } = require('socket.io');
const { createPriceGenerator } = require('../services/priceGenerator');

function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // for local dev only; limit domains in prod
      methods: ["GET", "POST"]
    }
  });

  // Map socket.id -> userId (optional tracking)
  const socketUserMap = new Map();

  io.on('connection', (socket) => {
    console.log('socket connected:', socket.id, 'query:', socket.handshake.query);

    // If client passes userId in query
    const { userId } = socket.handshake.query;
    if (userId) socketUserMap.set(socket.id, userId);

    // client subscribe via socket event: { ticker: 'GOOG' }
    socket.on('subscribe', (data) => {
      const { ticker } = data || {};
      if (!ticker) return;
      const room = `stock:${ticker}`;
      socket.join(room);
      console.log(`Socket ${socket.id} joined ${room}`);
      // optionally send immediate ack or current price
    });

    socket.on('unsubscribe', (data) => {
      const { ticker } = data || {};
      if (!ticker) return;
      const room = `stock:${ticker}`;
      socket.leave(room);
      console.log(`Socket ${socket.id} left ${room}`);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected:', socket.id);
      socketUserMap.delete(socket.id);
    });
  });

  const supportedStocks = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

  // create price generator which emits a callback every second
  createPriceGenerator(supportedStocks, (ticker, price, meta) => {
    // emit to specific stock room
    const room = `stock:${ticker}`;
    io.to(room).emit('stock:update', {
      ticker,
      price,
      timestamp: Date.now(),
      meta
    });
  });

  return io;
}

module.exports = { createSocketServer };
