const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Very simple in-memory user map for assignment
// email -> userId
const users = {};

router.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  if (!users[email]) {
    users[email] = uuidv4();
  }

  // Return userId and supported stocks
  return res.json({
    userId: users[email],
    supportedStocks: ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA']
  });
});

module.exports = router;
