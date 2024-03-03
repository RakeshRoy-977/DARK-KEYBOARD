const mongoose = require("mongoose");

const ConnectToDB = () => {
  mongoose.connect(process.env.DB_URI);
  console.log(`connected to mongoDB`);
};

module.exports = ConnectToDB;
