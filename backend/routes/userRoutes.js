const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");

const router = express.Router();

const User = require("../models/userModel");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(409).json({ error: "Invalid username or password." });
    }

    // If user exists and password is correct, generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      token,
      data: {
        user: user, // Return user data along with the token if needed
      },
    });
  } catch (error) {
    // Handle any errors that occur during login
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, username, password, cpassword } = req.body;

  try {
    const newUser = new User({ name, email, username, password, cpassword });

    await newUser.save();

    return res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

router.post("/checkUsername", async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ exists: true });
    }

    return res.json({ exists: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

router.post("/checkEmail", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ exists: true });
    }

    return res.json({ exists: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

router.patch("/edit/:id", async (req, res) => {
  const id = req.params.id;

  const { name, email, username } = req.body;

  try {
    const emailPresent = await User.findOne({ email });
    const usernamePresent = await User.findOne({ username });

    if (emailPresent && emailPresent._id.toString() !== id) {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (usernamePresent && usernamePresent._id.toString() !== id) {
      return res.status(410).json({ error: "Username already exists" });
    }

    await User.findByIdAndUpdate(id, { name, email, username }, { new: true });

    const senduser = await User.findById(id);

    if (!senduser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ senduser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
