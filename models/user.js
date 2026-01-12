// Database Schema

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: {
    type: String,
    enum: ["seeker", "recruiter"],
    default: "seeker"
  }
});

module.exports = mongoose.model("User", userSchema);
