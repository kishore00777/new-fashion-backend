const Bag = require("../Models/BagModel");
const Product = require("../Models/ProductModel");
const User = require("../Models/UserModel");

const AddToBag = async (req, res) => {
  const { userId, productId } = req.params;
  const { count } = req.body;
  try {
    const user = await User.findById({ _id: userId });
    const product = await Product.findById({ _id: productId });

    if (!user || !product) {
      res.status(404).json({ error: "Cant add this product to Bag" });
    } else {
      const FindProduct = await Bag.findOne({
        userId: userId,
        productId: productId,
      });

      if (FindProduct) {
        const productCount = FindProduct.count + count;
        await Bag.updateOne(
          { userId, productId },
          { $set: { count: productCount } }
        );
        res.status(200).json({ message: "Updated successfullty" });
      } else {
        const Add = new Bag({ userId, productId, count });
        await Add.save();
        res.status(200).json({ message: "Product Added to Bag Successfully" });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error on Adding product to Bag Successfully" });
  }
};

const RemoveFromBag = async (req, res) => {
  const { userId, productId, count } = req.body;
  try {
    const user = await User.findById({ userId });
    const product = await Product.findById({ productId });

    if (!user || !product) {
      res.status(404).json({ error: "Cant Remove this product from Bag" });
    } else {
      const FindProduct = await Bag.find({
        userId: userId,
        productId: productId,
      });
      if (!FindProduct) {
        res.status(404).json({ error: "product not found" });
      } else {
        const productCount = FindProduct.count;
        if (productCount === 1) {
          await Bag.deleteOne({ userId: userId, productId: productId });
        }
        await Bag.updateOne({
          productId: productId,
          count: productCount - count,
        });
      }
      res
        .status(200)
        .json({ message: "Product removed from Bag Successfully" });
    }
  } catch (error) {
    console.error(error);
  }
};

const TotalProducts = async (req, res) => {
  try {
    const Products = await Bag.find({});
    const getCount = Products.map((i) => i.count);
    const Total = getCount.reduce((acc, i) => acc + i, 0);
    res.status(200).json({ total: Total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error on getting count" });
  }
};

module.exports = { AddToBag, RemoveFromBag, TotalProducts };
