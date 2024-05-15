const mongoose = require("mongoose");

const url =
  "mongodb+srv://muruganraina400:GZeSnL7b9zI3TRFZ@cluster0.uygbbqe.mongodb.net/";

// const url = "mongodb://localhost:27017";

const Connect = async () => {
  try {
    await mongoose.connect(url);
    // await MongoClient.connect(url);
    console.log("mongoose CONNECTED");
  } catch (err) {
    console.log("mongoose FAILED");
  }
};
module.exports = Connect;
