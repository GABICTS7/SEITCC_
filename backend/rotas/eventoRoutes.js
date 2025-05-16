// Importando o Express e o Controller do Evento
const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

// Rotas de Evento

// Buscar todos os eventos
router.get('/', eventoController.getAllEventos);

// Buscar evento por ID
router.get('/:id', eventoController.getEventoById);

// Criar novo evento
router.post('/', eventoController.createEvento);

// Atualizar evento existente
router.put('/:id', eventoController.updateEvento);

// Deletar evento
router.delete('/:id', eventoController.deleteEvento);

module.exports = router;
