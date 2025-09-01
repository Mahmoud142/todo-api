const express = require('express');
const router = express.Router();

const {createTask,getAllTasks } = require('../controllers/task.controller');
const protect = require('../middlewares/protect.middleware');


router.route('/tasks')
    .post(protect.auth, createTask)
    .get(protect.auth, getAllTasks);


module.exports = router;