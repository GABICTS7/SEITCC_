// Importando a conexão com o banco de dados
const db = require('../config/db');

// Controlador para lidar com operações de eventos escolares

// Buscar todos os eventos
exports.getAllEventos = (req, res) => {
  const sql = 'SELECT * FROM eventos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      return res.status(500).json({ message: 'Erro ao buscar eventos.' });
    }
    res.json(results);
  });
};

// Buscar um evento pelo ID
exports.getEventoById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM eventos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar evento:', err);
      return res.status(500).json({ message: 'Erro ao buscar evento.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }
    res.json(result[0]);
  });
};

// Criar um novo evento
exports.createEvento = (req, res) => {
  const { titulo, descricao, data } = req.body;
  const sql = 'INSERT INTO eventos (titulo, descricao, data) VALUES (?, ?, ?)';
  db.query(sql, [titulo, descricao, data], (err, result) => {
    if (err) {
      console.error('Erro ao criar evento:', err);
      return res.status(500).json({ message: 'Erro ao criar evento.' });
    }
    res.status(201).json({ message: 'Evento criado com sucesso!' });
  });
};

// Atualizar um evento existente
exports.updateEvento = (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data } = req.body;
  const sql = 'UPDATE eventos SET titulo = ?, descricao = ?, data = ? WHERE id = ?';
  db.query(sql, [titulo, descricao, data, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar evento:', err);
      return res.status(500).json({ message: 'Erro ao atualizar evento.' });
    }
    res.json({ message: 'Evento atualizado com sucesso!' });
  });
};

// Deletar um evento
exports.deleteEvento = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM eventos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar evento:', err);
      return res.status(500).json({ message: 'Erro ao deletar evento.' });
    }
    res.json({ message: 'Evento deletado com sucesso!' });
  });
};
