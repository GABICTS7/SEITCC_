// Definindo o modelo do Aluno

class Aluno {
    constructor(id, nome, matricula, turma_id) {
      this.id = id;             // ID único do aluno
      this.nome = nome;         // Nome do aluno
      this.matricula = matricula; // Matrícula do aluno
      this.turma_id = turma_id; // ID da turma à qual o aluno pertence
    }
  }
  
  module.exports = Aluno;
  