const express = require('express');

const router = express.Router();

const {signUp,login} = require('../controllers/auth.controller');
const {signUpValidator,loginValidator} = require('../utils/validators/auth.validator');
router.post('/signup', signUpValidator, signUp);
router.post('/login', loginValidator, login);

module.exports = router;