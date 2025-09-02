const prisma = require("../../config/db");
const { check } = require("express-validator");
const {
  validatorMiddleware,
} = require("../../middlewares/validator.middlewares");

exports.createCategoryValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Title must be between 3 and 30 characters long")
    .custom(async (value, { req }) => {
      const category = await prisma.category.findFirst({
        where: { 
          title: value, 
          userId: req.user.id // Only check for dup licates within the same user
        },
      });
      if (category) {
        return Promise.reject("Category already exists");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.getSingleCategoryValidator = [
    check("id")
        .isNumeric()
        .withMessage("Invalid category id"),
    validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id")
    .isInt()
    .withMessage("Invalid category id")
    .custom(async (value) => {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(value) },
      });
      if (!category) {
        return Promise.reject(new Error("Category not found"));
      }
      return true;
    }),
    check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Title must be between 3 and 30 characters long")
    .custom(async (value, { req }) => {
      const category = await prisma.category.findFirst({
        where: { 
          title: value, 
          userId: req.user.id // Only check for dup licates within the same user
        },
      });
      if (category) {
        return Promise.reject("Category already exists");
      }
      return true;
    }),
    validatorMiddleware,
];

exports.deleteCategoryValidator = [
   check("id")
    .isNumeric()
    .withMessage("Invalid category ID"),
    validatorMiddleware,
];
