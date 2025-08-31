const express = require('express');

const router = express.Router();

const {signUp,login} = require('../controllers/auth.controller');

router.post('/auth/signup', signUp);
router.post('/auth/login', login);

module.exports = router;