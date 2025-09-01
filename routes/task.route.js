const express = require('express');
const router = express.Router();

const {createTask } = require('../controllers/task.controller');
const protect = require('../middlewares/protect.middleware');


router.post('/tasks', protect.auth, createTask)


module.exports = router;