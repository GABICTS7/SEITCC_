// Definindo o modelo da Nota

class Notas {
    constructor(id, aluno_id, disciplina, nota) {
      this.id = id;             // ID único da nota
      this.aluno_id = aluno_id; // ID do aluno relacionado
      this.disciplina = disciplina; // Nome da disciplina
      this.nota = nota;         // Valor da nota (ex: 8.5)
    }
  }
  
  module.exports = Notas;
  