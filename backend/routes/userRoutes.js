const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth");
const generateOtp = require("../middleware/otpGenerate");

const router = express.Router();

const User = require("../models/userModel");
const otpModel = require("../models/otpModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pandeyshivam552020@gmail.com",
    pass:  process.env.APP_PASS,
  },
});

router.post("/googlelogin", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.status(200).json({
        token,
        data: {
          user: existingUser,
        },
      });
    }

    const parts = email.split("@");

    const newUser = new User({
      username: parts[0],
      email,
      password,
      cpassword: password,
      name,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(201).json({
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message }); // Return the actual error message
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password." });
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(cpassword, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      cpassword: hashedConfirmPassword,
    });

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

router.post("/getOTP", async (req, res) => {
  const { email } = req.body;

  try {
    const emailPresent = await User.findOne({ email });

    if (!emailPresent) {
      return res.status(409).json({ error: "Email Id is not registered" });
    }

    const otp = generateOtp();
    const otpExpires = Date.now() + 3600000;

    await otpModel.findOneAndUpdate(
      { email },
      { otp, otpExpires },
      { upsert: true, new: true }
    );

    const mailOptions = {
      from: "pandeyshivam552020@gmail.com",
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send OTP email" });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "OTP sent to your email", email });
    });
  } catch (error) {
    console.error("Error in /getOTP route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/verifyOtp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the OTP entry by email
    const otpEntry = await otpModel.findOne({ email });

    // Check if the OTP entry exists and is valid
    if (!otpEntry) {
      return res.status(400).json({ error: "Invalid OTP request" });
    }

    // Check if the OTP has expired
    if (Date.now() > otpEntry.otpExpires) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    // Validate the OTP
    if (otpEntry.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP is valid, proceed with further actions (e.g., allow password reset)
    res.status(200).json({ message: "OTP verified successfully" });

    // Optionally, you might want to clear the OTP after successful verification
    await otpModel.deleteOne({ email });
  } catch (error) {
    console.error("Error in /verifyOtp route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/changePassword", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  
  } catch (error) {
    console.error("Error in /changePassword route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
