const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to protect routes

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log("token", token);
  }

  if (!token) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded);

    const user = await User.findById(decoded.id);

    // console.log("user", user);

    if (!user) {
      return res.status(404).json({ error: "No user found with this id" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }
};

module.exports = authMiddleware;
