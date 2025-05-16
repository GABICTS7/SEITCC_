const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Rota para buscar todos os professores
router.get('/', professorController.getAllProfessores);

// Rota para cadastrar novo professor
router.post('/', professorController.createProfessor);

// Rota para excluir professor
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;