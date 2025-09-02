const { check } = require("express-validator");
const prisma = require('../../config/db');

const {
  validatorMiddleware,
} = require("../../middlewares/validator.middlewares");

exports.signUpValidator = [
  check("username").notEmpty().withMessage("Username is required")
  .custom(async (value) => {
    const user = await prisma.user.findUnique({
      where: { username: value },
    });
    if (user) {
      throw new Error("Username already exists");
    }
    return true;
  }),
  check("email").isEmail().withMessage("Email is invalid")
  .custom(async (value) => {
    const user = await prisma.user.findUnique({
      where: { email: value },
    });
    if (user) {
      throw new Error("Email already exists");
    }
    return true;
  }),
  check("name").notEmpty().withMessage("Name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email").isEmail().withMessage("Email is invalid"),
  check("password").notEmpty().withMessage("Password is required"),
  validatorMiddleware,
];
