const fetch = require("node-fetch");
const Auth_Schema = require("../Models/Auth_Model");

const getJoke = async (req, res) => {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Any?format=txt&type=single"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch joke");
    }
    // Parse the text response
    const jokeText = await response.text();

    // Send the joke text to the client
    // console.log(req.user);

    res.send(jokeText);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UpdateScore = async (req, res) => {
  try {
    // Increment user's score by 10
    req.user.score += 10;

    // Save the updated score to the database
    await req.user.save();

    return res.status(200).json(req.user.score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserScore = async (req, res) => {
  try {
    // Retrieve the user's score from the request object
    const score = req.user.score;

    // Return the score in the response
    return res.status(200).json({ score });
  } catch (error) {
    // If there's an error, return an internal server error response
    return res.status(500).json(error.message);
  }
};

const getRanks = async (req, res) => {
  try {
    const TopUsers = await Auth_Schema.find({}, { name: 1, score: 1 })
      .sort({ score: -1 })
      .limit(10);

    return res.json(TopUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { getJoke, UpdateScore, getUserScore, getRanks };
