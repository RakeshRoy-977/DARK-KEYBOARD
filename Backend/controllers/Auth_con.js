const Auth_Schema = require("../Models/Auth_Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await Auth_Schema.findOne({ email });
    if (checkUser) {
      return res.json("User already registered");
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await Auth_Schema.create({
      name,
      email,
      password: hash,
    });
    res.json("user created");
  } catch (error) {
    res.json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await Auth_Schema.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ message: "Please Create Account" });
    }
    const comparePass = await bcrypt.compare(password, checkUser.password);
    if (!comparePass) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ checkUser }, process.env.JWT_SECRET);

    // Set token as a cookie with maxAge of 30 days
    // const maxAgeInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: maxAgeInMilliseconds,
    // });

    return res.json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const logout = (req, res) => {
  try {
    // Clear token from cookies
    res.clearCookie("token");
    return res.json("Logout successful");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { signup, login, logout };
