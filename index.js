const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9999;
const bodyParser = require("body-parser");
const productRoutes = require("./Routes/ProductRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const Connect = require("./Config/Db");

Connect();

app.use(cors());
app.use(bodyParser.json());
app.use("/products", productRoutes);
app.use("/user", UserRoutes);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
