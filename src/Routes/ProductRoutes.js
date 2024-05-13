const express = require("express");
const router = express.Router();

const productController = require("../Controllers/ProductController");

router.get("/getAllProducts", productController.getAllData);
router.post(
  "/addProduct",
  productController.upload.array("images"),
  productController.addProduct
);

module.exports = router;
