const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    // req.user = decoded.user;
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("Token Verification Error: ", err); // Debugging line
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;.8
