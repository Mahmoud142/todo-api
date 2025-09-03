const { check } = require("express-validator");
const prisma = require("../../config/db");

const {
  validatorMiddleware,
} = require("../../middlewares/validator.middlewares");

exports.signUpValidator = [
  check("email")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: { email: value },
      });
      if (user) {
        return Promise.reject(new Error("Email already exists"));
      }
      return true;
    }),
  check("name").notEmpty().withMessage("Name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(new Error("Passwords do not match"));
      }
      return true;
    }),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email").isEmail().withMessage("Email is invalid"),
  check("password").notEmpty().withMessage("Password is required"),
  validatorMiddleware,
];
