const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/category.controller");
const protect = require("../middlewares/protect.middleware");

router.route("/").post(protect.auth, createCategory);

module.exports = router;
