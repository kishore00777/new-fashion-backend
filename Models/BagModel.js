const mongoose = require("mongoose");

const BagSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  count: String,
});

const Bag = mongoose.model("BagScheme", BagSchema);
module.exports = Bag;
