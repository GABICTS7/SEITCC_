const db = require('../config/db');
const Professor = require('./professor'); // Importa seu model existente

module.exports = {
  // Listar todos os professores
  getAllProfessores: async (req, res) => {
    try {
      const [professores] = await db.query('SELECT * FROM professores');
      
      // Converter para objetos Professor
      const professoresInstances = professores.map(p => new Professor(
        p.id,
        p.nome,
        p.email,
        p.cpf,
        p.disciplina,
        p.disponibilidade ? JSON.parse(p.disponibilidade) : []
      ));
      
      res.json({
        success: true,
        professores: professoresInstances
      });
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar professores'
      });
    }
  },

  // Cadastrar novo professor
  createProfessor: async (req, res) => {
    try {
      const { nome, cpf, email, telefone, formacao, disciplinas } = req.body;
      
      // Criar instância do Professor
      const novoProfessor = new Professor(
        null, // id será gerado pelo banco
        nome,
        email,
        cpf,
        disciplinas, // mapeia para disciplina
        [] // disponibilidade inicia vazia
      );
      
      // Inserir no banco (incluindo os novos campos)
      const [result] = await db.query(
        `INSERT INTO professores 
         (nome, cpf, email, disciplina, disponibilidade, telefone, formacao) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          novoProfessor.nome,
          novoProfessor.cpf,
          novoProfessor.email,
          novoProfessor.disciplina,
          JSON.stringify(novoProfessor.disponibilidade),
          telefone, // campo adicional do formulário
          formacao  // campo adicional do formulário
        ]
      );
      
      // Atualizar o ID do professor
      novoProfessor.id = result.insertId;
      
      res.status(201).json({
        success: true,
        message: 'Professor cadastrado com sucesso!',
        professor: novoProfessor
      });
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar professor'
      });
    }
  },

  // Excluir professor
  deleteProfessor: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.query('DELETE FROM professores WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Professor não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Professor excluído com sucesso'
      });
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir professor'
      });
    }
  }
};