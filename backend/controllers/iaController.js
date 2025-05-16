const db = require('../config/db');

// Geração simulada da grade de horários
exports.gerarGrade = (req, res) => {
  // Simulação de geração (você pode substituir por lógica de IA)
  res.json({
    message: 'Geração de grade iniciada (simulação).'
  });
};

// Salvar grade de horários recebida do frontend
exports.salvarGrade = (req, res) => {
  const grade = req.body;

  if (!Array.isArray(grade)) {
    return res.status(400).json({ message: 'Formato da grade inválido.' });
  }

  const query = `
    INSERT INTO horarios (turno, dia_semana, horario_aula, professor_id, sala_id, disciplina, turma_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const promises = grade.map(item => {
    const values = [
      item.turno,
      item.dia_semana,
      item.horario_aula,
      item.professor_id,
      item.sala_id,
      item.disciplina,
      item.turma_id
    ];

    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  });

  Promise.all(promises)
    .then(() => res.json({ message: 'Grade de horários salva com sucesso!' }))
    .catch(error => {
      console.error('Erro ao salvar grade:', error);
      res.status(500).json({ message: 'Erro ao salvar grade de horários.', error: error.message });
    });
};

// ✅ Nova função: Buscar a grade salva no banco de dados
exports.obterGrade = (req, res) => {
  const query = 'SELECT * FROM horarios';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar grade:', err);
      return res.status(500).json({ message: 'Erro ao buscar a grade.', error: err.message });
    }

    res.json(results);
  });
};
