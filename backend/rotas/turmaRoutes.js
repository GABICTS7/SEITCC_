// Importando o Express e o Controller de Turmas
const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

// Rotas de Turmas

// Buscar todas as turmas
router.get('/', turmaController.getAllTurmas);

// Buscar turma por ID
router.get('/:id', turmaController.getTurmaById);

// Criar nova turma
router.post('/', turmaController.createTurma);

// Atualizar turma existente
router.put('/:id', turmaController.updateTurma);

// Deletar turma
router.delete('/:id', turmaController.deleteTurma);

module.exports = router;
