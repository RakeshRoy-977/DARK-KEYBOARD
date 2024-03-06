import React, { useState, useEffect } from "react";
import axios from "axios";

const Ranking = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get(
          "https://dark-keyboard.onrender.com/api/getranks"
        );
        const data = response.data;
        setTopUsers(data);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="container mx-auto mb-10">
      <h1 className="text-3xl font-semibold text-center mb-10 my-4">
        Top 10 User Ranks
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {topUsers.map((user, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <p className="text-xl font-semibold">
              {index + 1}. {user.name}
            </p>
            <p className="text-gray-600">Score: {user.score}</p>
          </div>
        ))}
        {/* Fill remaining positions with placeholders */}
        {Array.from({ length: 10 - topUsers.length }).map((_, index) => (
          <div key={index} className="border p-4 rounded-lg text-center">
            <p className="text-gray-600">
              {index + topUsers.length + 1}. No data available
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
