const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ _id: user._id }, "SECRET_KEY");
  res.status(201).json({ token });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email not found");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, "SECRET_KEY");
  res.status(200).json({ token });
});

module.exports = router;
