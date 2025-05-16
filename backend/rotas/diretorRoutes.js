// Importando o Express e o Controller do Diretor
const express = require('express');
const router = express.Router();
const diretorController = require('../controllers/diretorController');

// Rotas de Diretor

// Buscar todos os diretores
router.get('/', diretorController.getAllDiretores);

// Buscar diretor por ID
router.get('/:id', diretorController.getDiretorById);

// Criar novo diretor
router.post('/', diretorController.createDiretor);

// Atualizar diretor existente
router.put('/:id', diretorController.updateDiretor);

// Deletar diretor
router.delete('/:id', diretorController.deleteDiretor);

module.exports = router;
