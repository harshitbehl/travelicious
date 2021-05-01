var express = require('express');
var router = express.Router();

const authController = require("../controller/auth_controller")

//router.get('/login', authController._renderLogin);
//router.post('/login', authController.login);
router.get('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;
