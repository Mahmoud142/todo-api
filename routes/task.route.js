const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,

} = require("../controllers/task.controller");

const {
  createTaskValidator,
  updateTaskValidator,
  getSingleTaskValidator,
  deleteTaskValidator,
} = require("../utils/validators/task.validator");

const protect = require("../middlewares/protect.middleware");

router.use(protect.auth); //to all routes

router.route("/")
  .post(createTaskValidator, createTask)
  .get(getAllTasks);

  router
    .route("/:id")
    .put(updateTaskValidator, updateTask)
    .get(getSingleTaskValidator, getSingleTask)
    .delete(deleteTaskValidator, deleteTask);

  

module.exports = router;
