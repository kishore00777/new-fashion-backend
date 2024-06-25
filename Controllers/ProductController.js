const Product = require("../Models/ProductModel");

const NewProduct = async (req, res) => {
  try {
    const {
      title,
      color,
      price,
      brand,
      actualPrice,
      model,
      description,
      spec,
    } = req.body || {};
    const file = req.files;

    if (!file || file.length === 0) {
      return res.status(400).send("No files Uploaded");
    }
    const images = file.map((file) => file.filename);

    const newProduct = new Product({
      title,
      color,
      price,
      brand,
      actualPrice,
      model,
      description,
      images,
      spec,
    });
    await newProduct.save();
    res.status(200).json({
      responseStatus: "Success",
      errorMessage: null,
      message: "Product Added Sucessfully",
      image: null,
      status: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      responseStatus: "Failure",
      errorMessage: "Error on Adding Product",
      message: null,
      image: null,
      status: null,
    });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const get = await Product.find();
    res.status(200).json(get);
    // res.status(200).json({
    //   responseStatus: "Success",
    //   errorMessage: null,
    //   message: "Product Fetched Sucessfully",
    //   image: null,
    //   status: null,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      responseStatus: "Failure",
      errorMessage: "Error on Fetching Product",
      message: null,
      image: null,
      status: null,
    });
  }
};

const GetProductById = async (req, res) => {
  try {
    const { _id } = req.params;
    const getProduct = await Product.findById({ _id });
    if (!getProduct) {
      res.status(404).json({ error: "Product not Found" });
    } else {
      res.status(200).json([getProduct]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error on Loading" });
  }
};

module.exports = {
  GetAllProducts,
  NewProduct,
  GetProductById,
};
