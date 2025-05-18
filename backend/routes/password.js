const express = require("express");
const router = express.Router();
const Password = require("../models/Password");
const authMiddleware = require("../middleware/authMiddleware");
const validator = require("validator");

// create password
router.post("/", authMiddleware, async (req, res) => {
  const { website, username, password, notes } = req.body;
  if (!website || !validator.isURL(website)) {
    return res.status(400).json({ message: "Invalid or missing Website URL." });
  }
  if (!username || !validator.isLength(username, { min: 3 })) {
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters." });
  }
  if (!password || !validator.isLength(password, { min: 6 })) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters." });
  }
  try {
    const newPassword = new Password({
      userId: req.userId, // get it from authMiddleware
      website,
      username,
      password,
      notes,
    });
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// check all passwords

router.get("/", authMiddleware, async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.userId });
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update specifi password
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { website, username, password, notes } = req.body;

  if (!website || !validator.isURL(website)) {
    return res.status(400).json({ message: "Invalid or missing Website URL." });
  }
  if (!username || !validator.isLength(username, { min: 3 })) {
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters." });
  }
  if (!password || !validator.isLength(password, { min: 6 })) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters." });
  }
  try {
    const updatedPassword = await Password.findOneAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      { website, username, password, notes },
      { new: true }
    );
    res.status(200).json(updatedPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete password
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Password.findOneAndDelete({ _id: id, userId: req.userId });
    res.status(200).json({ message: "Password record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
