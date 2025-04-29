const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check existing users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ messsage: "User already exits" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    //create users
    newUser = new User({ email, password: hasedPassword });
    await newUser.save();

    res.status(201).json({ messsage: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
