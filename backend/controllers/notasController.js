// Importando a conexão com o banco de dados
const db = require('../config/db');

// Controlador para lidar com operações de notas

// Buscar todas as notas
exports.getAllNotas = (req, res) => {
  const sql = 'SELECT * FROM notas';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar notas:', err);
      return res.status(500).json({ message: 'Erro ao buscar notas.' });
    }
    res.json(results);
  });
};

// Buscar uma nota pelo ID
exports.getNotaById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM notas WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar nota:', err);
      return res.status(500).json({ message: 'Erro ao buscar nota.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Nota não encontrada.' });
    }
    res.json(result[0]);
  });
};

// Criar uma nova nota
exports.createNota = (req, res) => {
  const { aluno_id, disciplina, nota } = req.body;
  const sql = 'INSERT INTO notas (aluno_id, disciplina, nota) VALUES (?, ?, ?)';
  db.query(sql, [aluno_id, disciplina, nota], (err, result) => {
    if (err) {
      console.error('Erro ao criar nota:', err);
      return res.status(500).json({ message: 'Erro ao criar nota.' });
    }
    res.status(201).json({ message: 'Nota registrada com sucesso!' });
  });
};

// Atualizar uma nota existente
exports.updateNota = (req, res) => {
  const { id } = req.params;
  const { aluno_id, disciplina, nota } = req.body;
  const sql = 'UPDATE notas SET aluno_id = ?, disciplina = ?, nota = ? WHERE id = ?';
  db.query(sql, [aluno_id, disciplina, nota, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar nota:', err);
      return res.status(500).json({ message: 'Erro ao atualizar nota.' });
    }
    res.json({ message: 'Nota atualizada com sucesso!' });
  });
};

// Deletar uma nota
exports.deleteNota = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM notas WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar nota:', err);
      return res.status(500).json({ message: 'Erro ao deletar nota.' });
    }
    res.json({ message: 'Nota deletada com sucesso!' });
  });
};
