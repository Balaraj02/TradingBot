// index.js

const express = require("express");
const { executeTrade, getBalanceAndPosition, getTradingHistory } = require("./services/tradingLogic");

const app = express();
const PORT = process.env.PORT || 3000;

// Root route to handle default requests
app.get("/", (req, res) => {
  res.send("Welcome to the Trading Bot API. Use /status or /history to view bot details.");
});

// Route to get bot status and balance
app.get("/status", (req, res) => {
  const { balance, position } = getBalanceAndPosition();
  res.json({ balance, position });
});

// Route to get trading history
app.get("/history", (req, res) => {
  const history = getTradingHistory();
  res.json(history);
});

// Execute trades periodically
setInterval(() => {
  executeTrade();
}, 5000); // Adjust time interval as needed

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
