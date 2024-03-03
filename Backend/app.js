require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectToDB = require("./DB");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//DB connection
ConnectToDB();

//Routes
app.use("/api", require("./Routes/Auth_Routes"));
app.use("/api", require("./Routes/Joke_Routes"));

app.listen(port, () => console.log(`Server is up at ${port}`));
