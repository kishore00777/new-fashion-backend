const mongoose = require("mongoose");

const ProductScehma = new mongoose.Schema({
  title: String,
  color: String,
  brand: String,
  price: String,
  actualPrice: String,
  model: String,
  description: String,
  images: [],
  spec: [],
});

const Product = mongoose.model("ProductScheme", ProductScehma);
module.exports = Product;
