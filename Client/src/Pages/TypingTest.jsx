import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const TypingTest = () => {
  const [joke, setJoke] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [wordStatus, setWordStatus] = useState([]);

  useEffect(() => {
    fetchJoke();
    fetchUserScore(); // Fetch user's score when component mounts
  }, []);

  const fetchJoke = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://dark-keyboard.onrender.com/api/getjoke",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        const singleLineJoke = data.replace(/\n/g, " ");
        setJoke(singleLineJoke);
        setWordStatus(new Array(singleLineJoke.split(" ").length).fill(null));
      } else {
        console.error("Failed to fetch joke:", data);
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    const inputWords = input.split(" ");
    const jokeWords = joke.split(" ");
    const newWordStatus = jokeWords.map((word, index) => {
      if (inputWords[index] === word) {
        return true;
      } else if (inputWords[index] && word.startsWith(inputWords[index])) {
        return null;
      } else {
        return false;
      }
    });
    setWordStatus(newWordStatus);
    if (input === joke) {
      handleScoreUpdate();
      setUserInput("");
      fetchJoke();
    }
  };

  const handleRefetch = () => {
    fetchJoke();
    setUserInput("");
  };

  const handleScoreUpdate = async () => {
    try {
      const token = Cookies.get("token");
      await axios.patch(
        "https://dark-keyboard.onrender.com/api/updatescore",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setScore(score + 10);
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const fetchUserScore = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://dark-keyboard.onrender.com/api/getuserscore",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userScore = response.data.score;
      setScore(userScore);
    } catch (error) {
      console.error("Error fetching user score:", error);
    }
  };

  return (
    <div className="w-[40vw] mx-auto p-2 h-[70vh] flex flex-col justify-center">
      <div className="flex flex-wrap items-center">
        {joke.split(" ").map((word, index) => (
          <span
            key={index}
            className={`mr-1 mb-2 text-xl ${
              wordStatus[index] === true ? "text-green-500" : ""
            } ${wordStatus[index] === false ? "text-red-500" : ""}`}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 mt-10">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type Text...."
          className="border border-gray-300 p-2 w-full"
        />
        <button
          onClick={handleRefetch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reload
        </button>
      </div>
      <div className="flex gap-10">
        <p className="mt-4">Your Score: {score}</p>
        <p className="mt-4">Characters: {joke.length}</p>
      </div>
    </div>
  );
};

export default TypingTest;
