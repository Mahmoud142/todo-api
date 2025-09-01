const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory
} = require("../controllers/category.controller");
const protect = require("../middlewares/protect.middleware");

router
  .route("/")
  .post(protect.auth, createCategory)
  .get(protect.auth, getAllCategories);

router
  .route("/:id")
  .get(protect.auth, getSingleCategory)
  .delete(protect.auth, deleteCategory)
  .put(protect.auth, updateCategory)

module.exports = router;
