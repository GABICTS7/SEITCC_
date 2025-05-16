// Importando a conexão com o banco de dados
const db = require('../config/db');

// Controlador para lidar com operações de diretores

// Buscar todos os diretores
exports.getAllDiretores = (req, res) => {
  const sql = 'SELECT * FROM diretores';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar diretores:', err);
      return res.status(500).json({ message: 'Erro ao buscar diretores.' });
    }
    res.json(results);
  });
};
  
// Buscar um diretor pelo ID
exports.getDiretorById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM diretores WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar diretor:', err);
      return res.status(500).json({ message: 'Erro ao buscar diretor.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Diretor não encontrado.' });
    }
    res.json(result[0]);
  });
};

// Criar um novo diretor
exports.createDiretor = (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = 'INSERT INTO diretores (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao criar diretor:', err);
      return res.status(500).json({ message: 'Erro ao criar diretor.' });
    }
    res.status(201).json({ message: 'Diretor criado com sucesso!' });
  });
};

// Atualizar um diretor existente
exports.updateDiretor = (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const sql = 'UPDATE diretores SET nome = ?, email = ?, senha = ? WHERE id = ?';
  db.query(sql, [nome, email, senha, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar diretor:', err);
      return res.status(500).json({ message: 'Erro ao atualizar diretor.' });
    }
    res.json({ message: 'Diretor atualizado com sucesso!' });
  });
};

// Deletar um diretor
exports.deleteDiretor = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM diretores WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar diretor:', err);
      return res.status(500).json({ message: 'Erro ao deletar diretor.' });
    }
    res.json({ message: 'Diretor deletado com sucesso!' });
  });
};
