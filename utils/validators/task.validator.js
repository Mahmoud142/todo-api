const { check } = require("express-validator");
const {
  validatorMiddleware,
} = require("../../middlewares/validator.middlewares");
const prisma = require("../../config/db");

exports.createTaskValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  validatorMiddleware,
];

exports.updateTaskValidator = [
  check("id")
    .isNumeric()
    .withMessage("ID must be a number")
    .custom(async (val, { req }) => {
      const task = await prisma.task.findUnique({
        where: { id: parseInt(val), userId: req.user.id },
      });
      if (!task) {
        return Promise.reject(new Error("Task not found"));
      }
      return true;
    }),
  check("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Status must be one of: pending, in_progress, completed"),
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  validatorMiddleware,
];

exports.getSingleTaskValidator = [
  check("id").isNumeric().withMessage("ID must be a number"),
  validatorMiddleware,
];

exports.deleteTaskValidator = [
  check("id")
    .isNumeric()
    .withMessage("ID must be a number")
    .custom(async (val, { req }) => {
      const task = await prisma.task.findUnique({
        where: { id: parseInt(val), userId: req.user.id },
      });
      if (!task) {
        return Promise.reject(new Error("Task not found"));
      }
      return true;
    }),
  validatorMiddleware,
];
