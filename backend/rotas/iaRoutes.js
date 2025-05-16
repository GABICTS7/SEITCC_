// Importando o Express e o Controller da IA
const express = require('express');
const router = express.Router();
const iaController = require('../controllers/iaController');

// Rota para gerar a grade de horários
router.get('/gerar', iaController.gerarGrade);

// Rota para salvar a grade de horários
router.post('/salvar', iaController.salvarGrade);

// Rota para buscar a grade de horários salva
router.get('/grade', (req, res) => {
  const db = require('../config/db');
  const sql = 'SELECT * FROM horarios';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar grade:', err);
      return res.status(500).json({ message: 'Erro ao buscar grade.', error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
