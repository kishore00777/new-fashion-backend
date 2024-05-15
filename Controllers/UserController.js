const fs = require("fs");
const path = require("path");
const User = require("../Models/UserModel");

// const SignUp = (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   const newUser = {
//     firstName,
//     lastName,
//     email,
//     password,
//   };
//   const userJson = path.join(__dirname, "../Data/Users.json");
//   fs.readFile(userJson, "utf-8", (err, data) => {
//     if (err) {
//       console.error("Error on reading Json file");
//       return res.status(500).send("Error on reading Json file");
//     }
//     const Users = JSON.parse(data).Users;
//     newUser.id = Users.length + 1;
//     const updatedUsers = [...Users, newUser];

//     const updatedJson = JSON.stringify({ Users: updatedUsers }, null, 2);
//     fs.writeFile(userJson, updatedJson, (err) => {
//       if (err) {
//         return res.status(500).json({
//           responseStatus: "Failure",
//           errorMessage: "Error on SignUp",
//           message: null,
//           image: null,
//           status: null,
//         });
//       }
//       res.status(200).json({
//         responseStatus: "Success",
//         errorMessage: null,
//         message: "Successfully SignUped",
//         image: null,
//         status: null,
//       });
//     });
//   });
// };

const SignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(200).json({
      responseStatus: "Success",
      errorMessage: null,
      message: "User Sucessfully added",
      image: null,
      status: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      responseStatus: "Failure",
      errorMessage: "Error on Adding User",
      message: null,
      image: null,
      status: null,
    });
  }
};

module.exports = {
  SignUp,
};
