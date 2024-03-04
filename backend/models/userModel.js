const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide your email"],
    unique: true,
    lowercase: true,
  },

  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  cpassword: {
    type: String,
    required: [true, "Please confirm your password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.cpassword = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
