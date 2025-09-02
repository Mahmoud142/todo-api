const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory
} = require("../controllers/category.controller");

const {
  createCategoryValidator,
  getSingleCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator
} = require("../utils/validators/category.validator");

const protect = require("../middlewares/protect.middleware");

router.use(protect.auth);

router
  .route("/")
  .post(createCategoryValidator, createCategory)
  .get(getAllCategories);

router
  .route("/:id")
  .get(getSingleCategoryValidator, getSingleCategory)
  .delete(deleteCategoryValidator, deleteCategory)
  .put(updateCategoryValidator, updateCategory)

module.exports = router;
