const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");



exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 10),
    },
  });
  delete user.password;
  res.status(201).json({
    status: "success",
    msg: "User created successfully",
    data: user,
  });
});



exports.login = asyncHandler(async (req, res, next) => {
  
  const user = await prisma.user.findUnique({ where: { email: req.body.email } });
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

  res.status(200).json({
    status: "success",
    msg: "User logged in successfully",
    data: user,
  });
});
