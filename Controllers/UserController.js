const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
require("dotenv").config();

const SignUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).send("Email already exists");
    }
    if (!userName || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const user = await User.findOne({ email });

    const generateToken = (id) => {
      const payload = {
        user: {
          id: user.id,
        },
      };
      return jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
    };

    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
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

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).send("Incorrect email or password");
    }

    const checkPassword = bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).send("Incorrect email or password");
    }
    const generateToken = (id) => {
      const payload = {
        user: {
          id: user.id,
        },
      };
      return jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
    };

    if (user && checkPassword) {
      res.json({
        id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      responseStatus: "Failure",
      errorMessage: "Error on Login",
      message: null,
      image: null,
      status: null,
    });
  }
};

const LogOut = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Error on logout" });
      } else {
        res.status(200).json({ message: "Logged out Successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error on logout" });
  }
};

const GetMe = async (req, res) => {
  const { _id, userName, email } = await User.findById(req.user.id);
  console.log(_id, userName, email);
  res.status(200).json({
    _id,
    userName,
    email,
  });
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "NO USER FOUND" });
  }
};

const GetUsers = async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
    res.status(200).json({
      responseStatus: "Success",
      errorMessage: null,
      message: "User Sucessfully fetched",
      image: null,
      status: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      responseStatus: "Failure",
      errorMessage: "Error on fetching User",
      message: null,
      image: null,
      status: null,
    });
  }
};

module.exports = {
  SignUp,
  GetUsers,
  Login,
  LogOut,
  ForgotPassword,
  GetMe,
};
