const express = require("express");
const {
  getJoke,
  UpdateScore,
  getUserScore,
  getRanks,
} = require("../controllers/Joke_con");
const authMiddleware = require("../Middleware/authMiddleware");

const route = express.Router();

route.get("/getjoke", authMiddleware, getJoke);

//get single user ranks
route.get("/getuserscore", authMiddleware, getUserScore);

//update score
route.patch("/updatescore", authMiddleware, UpdateScore);

//get All ranks
route.get("/getranks", getRanks);

module.exports = route;
