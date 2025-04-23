const express = require('express');
const router = express.Router();
const loginController = require('../Controladores/login');

// Login
router.post('/', loginController.login);

module.exports = router;
