// services/mockData.js
const generateMockPrice = () => {
    return (Math.random() * 100).toFixed(2);
  };
  
  const getStockPrice = async () => {
    return { price: generateMockPrice() };
  };
  
  module.exports = { getStockPrice };
  