const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//@desc Sign up a new user
//@route POST /api/auth/signup
//@access Public
exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 10),
    },
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  delete user.password;
  res.status(201).json({
    status: "success",
    msg: "User created successfully",
    data: user,
    token,
  });
});

//@desc Login a user
//@route POST /api/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  let isPasswordMatch = false;
  //find user
  if (user) {
    isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  }
  // check if password and user exist
  if (!isPasswordMatch || !user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  delete user.password;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    msg: "User logged in successfully",
    data: user,
    token,
  });
});
