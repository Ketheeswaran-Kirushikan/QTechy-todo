const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/registeruser',userController.registerUser);
router.post('/login',userController.loginUser);

module.exports = router;