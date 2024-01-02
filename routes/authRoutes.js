const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = require("../models/authModel");
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await authModel.create({
      username,
      password: hashedPassword,
    });
    res.status(200).json({
      response: "Sign Up Successful",
      user_data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: "Error Signing In",
    });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  console.log(username);
  try {
    let filter = { username: username };
    const user = await authModel.findOne(filter);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1800s",
      });
      res.cookie("jwt", token);
      res.status(200).json({
        response: "Login Successful",
        user_data: user,
      });
    } else {
      res.status(401).json({
        response: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: "Username Does Not Exist",
    });
  }
});

module.exports = router;
