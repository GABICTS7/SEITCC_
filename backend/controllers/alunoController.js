// Importando a conexão com o banco de dados
const db = require('../config/db');

// Controlador para lidar com operações de alunos

// Buscar todos os alunos
exports.getAllAlunos = (req, res) => {
  const sql = 'SELECT * FROM alunos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar alunos:', err);
      return res.status(500).json({ message: 'Erro ao buscar alunos.' });
    }
    res.json(results);
  });
};

// Buscar um aluno pelo ID
exports.getAlunoById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM alunos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar aluno:', err);
      return res.status(500).json({ message: 'Erro ao buscar aluno.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }
    res.json(result[0]);
  });
};

// Criar um novo aluno
exports.createAluno = (req, res) => {
  const { nome, matricula, turma_id } = req.body;
  const sql = 'INSERT INTO alunos (nome, matricula, turma_id) VALUES (?, ?, ?)';
  db.query(sql, [nome, matricula, turma_id], (err, result) => {
    if (err) {
      console.error('Erro ao criar aluno:', err);
      return res.status(500).json({ message: 'Erro ao criar aluno.' });
    }
    res.status(201).json({ message: 'Aluno criado com sucesso!' });
  });
};

// Atualizar um aluno existente
exports.updateAluno = (req, res) => {
  const { id } = req.params;
  const { nome, matricula, turma_id } = req.body;
  const sql = 'UPDATE alunos SET nome = ?, matricula = ?, turma_id = ? WHERE id = ?';
  db.query(sql, [nome, matricula, turma_id, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar aluno:', err);
      return res.status(500).json({ message: 'Erro ao atualizar aluno.' });
    }
    res.json({ message: 'Aluno atualizado com sucesso!' });
  });
};

// Deletar um aluno
exports.deleteAluno = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM alunos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar aluno:', err);
      return res.status(500).json({ message: 'Erro ao deletar aluno.' });
    }
    res.json({ message: 'Aluno deletado com sucesso!' });
  });
};
