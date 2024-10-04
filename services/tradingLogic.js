// services/tradingLogic.js
const { getStockPrice } = require("./mockData");

let balance = 10000; // Initial balance
let position = 0;    // No position initially
let tradingHistory = [];

const executeTrade = async () => {
  const { price } = await getStockPrice();
  const stockPrice = parseFloat(price);
  const strategy = determineTrade(stockPrice);

  if (strategy.action === "BUY" && balance >= stockPrice) {
    // Buy one unit of stock
    position += 1;
    balance -= stockPrice;
    tradingHistory.push({ action: "BUY", price: stockPrice, timestamp: new Date() });
  } else if (strategy.action === "SELL" && position > 0) {
    // Sell one unit of stock
    position -= 1;
    balance += stockPrice;
    tradingHistory.push({ action: "SELL", price: stockPrice, timestamp: new Date() });
  }
};

const determineTrade = (price) => {
  const lastTrade = tradingHistory[tradingHistory.length - 1] || { price: price };
  if (price <= lastTrade.price * 0.98) {
    return { action: "BUY" };
  } else if (price >= lastTrade.price * 1.03) {
    return { action: "SELL" };
  } else {
    return { action: "HOLD" };
  }
};

const getBalanceAndPosition = () => {
  return { balance, position };
};

const getTradingHistory = () => {
  return tradingHistory;
};

module.exports = { executeTrade, getBalanceAndPosition, getTradingHistory };
