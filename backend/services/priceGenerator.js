// priceGenerator: random-walk style updates
function createPriceGenerator(supportedStocks, onPrice) {
  // initial base prices
  const base = {};
  supportedStocks.forEach((s, i) => {
    base[s] = 100 + Math.floor(Math.random() * 400); // 100..500
  });

  // every second update each stock slightly and call onPrice
  setInterval(() => {
    supportedStocks.forEach((ticker) => {
      // random walk: +- up to 2% each second
      const cur = base[ticker];
      const pct = (Math.random() - 0.5) * 0.04; // -2%..+2%
      const next = Math.max(1, +(cur * (1 + pct)).toFixed(2));
      base[ticker] = next;
      onPrice(ticker, next, { changePct: +(pct * 100).toFixed(3) });
    });
  }, 1000);

  return {
    getBasePrices: () => ({ ...base })
  };
}

module.exports = { createPriceGenerator };
