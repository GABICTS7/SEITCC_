const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rota de login
router.post('/', loginController.login);

module.exports = router;