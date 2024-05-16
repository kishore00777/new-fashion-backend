const express = require("express");
const router = express.Router();

const User = require("../Controllers/UserController");

router.post("/signUp", User.SignUp);
router.get("/allUsers", User.GetUsers);

module.exports = router;
