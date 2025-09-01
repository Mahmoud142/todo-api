const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory
} = require("../controllers/category.controller");
const protect = require("../middlewares/protect.middleware");

router
  .route("/")
  .post(protect.auth, createCategory)
  .get(protect.auth, getAllCategories);

router
  .route("/:id")
  .get(protect.auth, getSingleCategory)
  .delete(protect.auth, deleteCategory);

module.exports = router;
