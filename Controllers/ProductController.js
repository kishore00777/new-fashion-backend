const { GetAllProducts } = require("./Products");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.resolve(__dirname, "../Data/productImages");
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

const addProduct = (req, res) => {
  // upload.array("images")(req, res, (err) => {
  //   if (err instanceof multer.MulterError) {
  //     return res.status(500).send("Multer error");
  //   } else if (err) {
  //     return res.status(500).send("Unknown error");
  //   }
  // });

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
  const file = req.files;

  if (!file || file.length === 0) {
    return res.status(400).send("No files Uploaded");
  }
  const images = file.map((file) => file.filename);

  const newProduct = {
    title,
    color,
    price,
    actualPrice,
    model,
    description,
    images,
    spec,
    topDeals,
    dealHead,
  };

  const ProductJson = path.join(__dirname, "../Data/Product.json");
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
        return res.status(500).json({
          responseStatus: "Failure",
          errorMessage: "Error updating product.json file",
          message: null,
          image: null,
          status: null,
        });
      }
      res.status(200).json({
        responseStatus: "Success",
        errorMessage: null,
        message: "File uploaded, product added, and product.json updated",
        image: null,
        status: null,
      });
    });
  });
  console.log("Request Body:", req.body, req.files);
};

const getAllData = (req, res) => {
  const Data = GetAllProducts();
  res.json(Data.products);
};

module.exports = {
  getAllData,
  addProduct,
};
