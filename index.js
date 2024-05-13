const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8888;
const bodyParser = require("body-parser");
const productRoutes = require("./Routes/ProductRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
