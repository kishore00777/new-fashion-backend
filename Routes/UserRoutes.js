const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongoose").Types;

const UserController = require("../Controllers/UserController");
const authMiddleware = require("../MiddleWare/AuthMiddleWare");
const User = require("../Models/UserModel");

router.post("/signUp", UserController.SignUp);
router.post("/logIn", UserController.Login);
router.post("/logOut", UserController.LogOut);
router.get("/allUsers", UserController.GetUsers);
router.get("/getme", authMiddleware, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const user = await User.findById(userId).select("-password");
    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } catch (err) {
    console.error("Get User Error: ", err); // Debugging line
    res.status(500).send("Server Error");
  }
});
// router.get("/getme", protect, UserController.GetMe);

module.exports = router;
