const express = require("express");
const authMiddleware = require("../MiddleWare/AuthMiddleWare");
const {
  AddToBag,
  RemoveFromBag,
  TotalProducts,
} = require("../Controllers/BagController");
const router = express.Router();

router.post("/add/:userId/:productId", authMiddleware, AddToBag);
router.post("/remove", authMiddleware, RemoveFromBag);
router.get("/noOfProductsInCart", authMiddleware, TotalProducts);

module.exports = router;
