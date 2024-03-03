const mongoose = require("mongoose");

const emailRegex = /^\S+@\S+\.\S+$/;

const authModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [emailRegex, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Auth_Schema = mongoose.model("Auth", authModel);

module.exports = Auth_Schema;
