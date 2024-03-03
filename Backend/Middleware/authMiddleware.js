// authMiddleware.js

const jwt = require("jsonwebtoken");
const Auth_Schema = require("../Models/Auth_Model");
const { JWT_SECRET } = process.env; // Ensure you have JWT_SECRET set in your environment variables

const authMiddleware = async (req, res, next) => {
  try {
    // Check if token is present in the Authorization header
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Remove "Bearer " from the token string
    const tokenString = token.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(tokenString, JWT_SECRET);

    // Extract user information from the token
    const { checkUser } = decoded;

    // Check if user exists in the database
    const user = await Auth_Schema.findById(checkUser._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }

    // Attach user information to the request object for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid or expired, return 401 Unauthorized
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
