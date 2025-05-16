// Importando conexão com banco de dados
const db = require('../config/db');

// Controlador para criar uma nova turma
exports.createTurma = (req, res) => {
  const { serie, turma } = req.body;

  if (!serie || !turma) {
    return res.status(400).json({ message: 'A série e o nome da turma são obrigatórios.' });
  }

  const query = 'INSERT INTO turmas (serie, turma) VALUES (?, ?)';
  db.query(query, [serie, turma], (err, result) => {
    if (err) {
      console.error('Erro MySQL ao criar turma:', err); // Mostra o erro real no terminal
      return res.status(500).json({ message: 'Erro ao criar turma.' });
    }
    res.status(201).json({ message: 'Turma criada com sucesso!' });
  });
};

// Controlador para buscar todas as turmas
exports.getAllTurmas = (req, res) => {
  db.query('SELECT * FROM turmas', (err, results) => {
    if (err) {
      console.error('Erro ao buscar turmas:', err);
      return res.status(500).json({ message: 'Erro ao buscar turmas.' });
    }
    res.status(200).json(results);
  });
};

// Controlador para buscar uma turma por ID
exports.getTurmaById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM turmas WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar turma:', err);
      return res.status(500).json({ message: 'Erro ao buscar turma.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }
    res.status(200).json(results[0]);
  });
};

// Controlador para atualizar uma turma existente
exports.updateTurma = (req, res) => {
  const id = req.params.id;
  const { serie, turma } = req.body;

  if (!serie || !turma) {
    return res.status(400).json({ message: 'A série e o nome da turma são obrigatórios.' });
  }

  const query = 'UPDATE turmas SET serie = ?, turma = ? WHERE id = ?';
  db.query(query, [serie, turma, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar turma:', err);
      return res.status(500).json({ message: 'Erro ao atualizar turma.' });
    }
    res.status(200).json({ message: 'Turma atualizada com sucesso!' });
  });
};

// Controlador para deletar uma turma
exports.deleteTurma = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM turmas WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar turma:', err);
      return res.status(500).json({ message: 'Erro ao deletar turma.' });
    }
    res.status(200).json({ message: 'Turma deletada com sucesso!' });
  });
};
