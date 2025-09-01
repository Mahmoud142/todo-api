const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const protect = require("../middlewares/protect.middleware");

router.use(protect.auth); //to all routes

router.route("/tasks")
  .post(createTask)
  .get(getAllTasks);

router
  .route("/tasks/:id")
  .put(updateTask)
  .get(getSingleTask)
  .delete(deleteTask);

module.exports = router;
