const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middleawares/AuthValidation');

const router = require('express').Router();

router.get('/login', loginValidation, login);

router.get('/signup', signupValidation, signup);

module.exports = router;
