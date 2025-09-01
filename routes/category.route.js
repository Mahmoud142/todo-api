const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
} = require("../controllers/category.controller");
const protect = require("../middlewares/protect.middleware");

router
  .route("/")
  .post(protect.auth, createCategory)
  .get(protect.auth, getAllCategories);
module.exports = router;
