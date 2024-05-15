const express = require("express");
const router = express.Router();

const User = require("../Controllers/UserController");

router.post("/signUp", User.SignUp);

module.exports = router;
