/**
 * =========================================
 * AUTH CONTROLLER
 * =========================================
 * This file contains authentication logic
 * for the Job Listing Portal.
 *
 * Features:
 * - User Registration
 * - Secure password hashing using bcrypt
 * - User Login
 * - JWT token generation for authentication
 *
 * Used by:
 * - routes/auth.routes.js
 *
 * Database:
 * - MongoDB (User model)
 */

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * -------------------------
 * REGISTER USER
 * -------------------------
 * Creates a new user account.
 * - Checks if email already exists
 * - Hashes password before saving
 * - Stores user role (seeker / recruiter)
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      type
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * -------------------------
 * LOGIN USER
 * -------------------------
 * Authenticates user credentials.
 * - Validates email & password
 * - Compares hashed password
 * - Generates JWT token on success
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      name: user.name,
      email: user.email,
      type: user.type
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
