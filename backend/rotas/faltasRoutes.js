// Importando o Express e o Controller de Faltas
const express = require('express');
const router = express.Router();
const faltasController = require('../controllers/faltasController');

// Rotas de Faltas

// Buscar todas as faltas
router.get('/', faltasController.getAllFaltas);

// Buscar falta por ID
router.get('/:id', faltasController.getFaltaById);

// Criar nova falta
router.post('/', faltasController.createFalta);

// Atualizar falta existente
router.put('/:id', faltasController.updateFalta);

// Deletar falta
router.delete('/:id', faltasController.deleteFalta);

module.exports = router;
