const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  updateTask,
  getSingleTask,
} = require("../controllers/task.controller");
const protect = require("../middlewares/protect.middleware");

router
  .route("/tasks")
  .post(protect.auth, createTask)
  .get(protect.auth, getAllTasks);

router.route("/tasks/:id")
  .put(protect.auth, updateTask)
  .get(protect.auth, getSingleTask);

module.exports = router;
