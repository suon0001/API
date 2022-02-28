const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");
const { application } = require("express");

//registration
router.post("/register", async (req, res) => {
  //validate the user input (name, email, password)
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  //check if the email is already registered
  const emailExit = await User.findOne({ email: req.body.email });
  if (emailExit) {
    return res.status(400).json({ error: "Email already exists" });
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  //create a user object and save in the database
  const userObject = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  try {
    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//login
router.post("/login", async (req, res) => {
  //validate user login info
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // if login is valid, find the user
  const user = await User.findOne({ email: req.body.email });

  // throw error if email is wrong (user does not exits in DB)
  if (!user) {
    return res
      .status(400)
      .json({ error: "Email is incorrect or dosen't exits!" });
  }
  // user exits check for password correction
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  // throw error if password is wrong
  if (!validPassword) {
    return res.status(400).json({ error: "Password is incorrect!" });
  }

  // create authentication token with username and id
  const token = jwt.sign(
    // payload
    {
      name: user.name,
      id: user._id,
    },
    // TOKEN_SECRET
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRE_IN }
  );

  // attach auth token to header
  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});

module.exports = router;
