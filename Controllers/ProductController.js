const { GetAllProducts } = require("./Products");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "./Data/productImages");
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

const addProduct = (req, res) => {
  //   upload.array("images")(req, res, (err) => {
  //     if (err instanceof multer.MulterError) {
  //       return res.status(500).send("Multer error");
  //     } else if (err) {
  //       return res.status(500).send("Unknown error");
  //     }
  //   });
  const file = req.files;
  const {
    title,
    color,
    price,
    actualPrice,
    model,
    description,
    spec,
    topDeals,
    dealHead,
  } = req.body || {};
  console.log("Request Body:", req.body);

  if (!file || file.length === 0) {
    return res.status(400).send("No files Uploaded");
  }
  const images = file.map((i) => i.filename);

  const newProduct = {
    title,
    color,
    price,
    actualPrice,
    model,
    description,
    img: images,
    spec,
    topDeals,
    dealHead,
  };

  const ProductJson = path.join(__dirname, "Data", "product.json");
  console.log("ProductJson:", ProductJson);
  fs.readFile(ProductJson, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading product.json file:", err);
      return res.status(500).send("Error reading product.json file");
    }

    const products = JSON.parse(data).products;
    newProduct.id = products.length + 1;
    // products.push(newProduct);
    const updatedProducts = [...products, newProduct];

    const updatedJson = JSON.stringify({ products: updatedProducts }, null, 2);

    fs.writeFile(ProductJson, updatedJson, (err) => {
      if (err) {
        console.error("Error updating product.json file:", err);
        return res.status(500), send("Error updating product.json file");
      }
      res.send("File uploaded, product added, and product.json updated");
    });
  });
};

const getAllData = (req, res) => {
  const Data = GetAllProducts();
  res.json(Data.products);
};

module.exports = {
  getAllData,
  addProduct,
  upload,
};
