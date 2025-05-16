// Importando o Express e o Controller da IA
const express = require('express');
const router = express.Router();
const iaController = require('../controllers/iaController');

// Rota para salvar a grade de horários gerada pela IA (rota complementar)
router.post('/salvar', iaController.salvarGrade);

module.exports = router;
