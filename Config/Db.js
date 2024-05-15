const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.CLOUD;
// const url = process.env.LOCAL;

const Connect = async () => {
  try {
    await mongoose.connect(url);
    console.log(
      `🎉 mongoose CONNECTED on ${
        url === process.env.CLOUD ? "CLOUD💭" : "LOCAL🧩"
      }`
    );
  } catch (err) {
    console.log("mongoose FAILED");
  }
};
module.exports = Connect;
