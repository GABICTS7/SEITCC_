// Importando a conexão com o banco de dados
const db = require('../config/db');

// Controlador para lidar com operações de faltas

// Buscar todas as faltas
exports.getAllFaltas = (req, res) => {
  const sql = 'SELECT * FROM faltas';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar faltas:', err);
      return res.status(500).json({ message: 'Erro ao buscar faltas.' });
    }
    res.json(results);
  });
};

// Buscar uma falta pelo ID
exports.getFaltaById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM faltas WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar falta:', err);
      return res.status(500).json({ message: 'Erro ao buscar falta.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Falta não encontrada.' });
    }
    res.json(result[0]);
  });
};

// Criar uma nova falta
exports.createFalta = (req, res) => {
  const { aluno_id, data, motivo } = req.body;
  const sql = 'INSERT INTO faltas (aluno_id, data, motivo) VALUES (?, ?, ?)';
  db.query(sql, [aluno_id, data, motivo], (err, result) => {
    if (err) {
      console.error('Erro ao criar falta:', err);
      return res.status(500).json({ message: 'Erro ao criar falta.' });
    }
    res.status(201).json({ message: 'Falta registrada com sucesso!' });
  });
};

// Atualizar uma falta existente
exports.updateFalta = (req, res) => {
  const { id } = req.params;
  const { aluno_id, data, motivo } = req.body;
  const sql = 'UPDATE faltas SET aluno_id = ?, data = ?, motivo = ? WHERE id = ?';
  db.query(sql, [aluno_id, data, motivo, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar falta:', err);
      return res.status(500).json({ message: 'Erro ao atualizar falta.' });
    }
    res.json({ message: 'Falta atualizada com sucesso!' });
  });
};

// Deletar uma falta
exports.deleteFalta = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM faltas WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar falta:', err);
      return res.status(500).json({ message: 'Erro ao deletar falta.' });
    }
    res.json({ message: 'Falta deletada com sucesso!' });
  });
};
