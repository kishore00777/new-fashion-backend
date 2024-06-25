const express = require("express");
const authMiddleware = require("../MiddleWare/AuthMiddleWare");
const { AddToBag, RemoveFromBag } = require("../Controllers/BagController");
const router = express.Router();

router.post("/add", authMiddleware, AddToBag);
router.post("/remove", authMiddleware, RemoveFromBag);

module.exports = router;
