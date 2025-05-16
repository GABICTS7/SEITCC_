// Importando o Express e o Controller do Aluno
const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rotas de Aluno

// Buscar todos os alunos
router.get('/', alunoController.getAllAlunos);

// Buscar aluno por ID
router.get('/:id', alunoController.getAlunoById);

// Criar novo aluno
router.post('/', alunoController.createAluno);

// Atualizar aluno existente
router.put('/:id', alunoController.updateAluno);

// Deletar aluno
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;
