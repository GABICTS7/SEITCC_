// Importando o Express e o Controller de Notas
const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notasController');

// Rotas de Notas

// Buscar todas as notas
router.get('/', notasController.getAllNotas);

// Buscar nota por ID
router.get('/:id', notasController.getNotaById);

// Criar nova nota
router.post('/', notasController.createNota);

// Atualizar nota existente
router.put('/:id', notasController.updateNota);

// Deletar nota
router.delete('/:id', notasController.deleteNota);

module.exports = router;
