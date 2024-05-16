const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "../Data/productImages");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const productController = require("../Controllers/ProductController");

router.get("/getAllProducts", productController.GetAllProducts);
router.post(
  "/addProduct",
  upload.array("images", 5),
  productController.NewProduct
);

module.exports = router;
