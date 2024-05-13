const path = require("path");
const fs = require("fs");

const GetAllProducts = () => {
  const filepath = path.join(__dirname, "./Data", "Product.json");
  const Data = fs.readFileSync(filepath);
  return JSON.parse(Data);
};

module.exports = {
  GetAllProducts,
};
