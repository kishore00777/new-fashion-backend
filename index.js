const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 9999;
const bodyParser = require("body-parser");
const productRoutes = require("./Routes/ProductRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const BagRoutes = require("./Routes/BagRoutes");
const Connect = require("./Config/Db");

Connect();
app.use(
  session({
    secret: process.env.SECRET, // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use true if serving over HTTPS
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/api/products", productRoutes);
app.use("/api/auth/user", UserRoutes);
app.use("/api/bag", BagRoutes);
app.use("/images", express.static(path.join(__dirname, "Data/productImages")));

app.listen(PORT, () => {
  console.log(`🏃 running on ${PORT}`);
});
