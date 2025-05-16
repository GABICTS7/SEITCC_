// Definindo o modelo da Turma

class Turma {
    constructor(id, serie, turma) {
      this.id = id;         // ID único da turma
      this.serie = serie;   // Série da turma (Ex: 1º ano, 2º ano)
      this.turma = turma;   // Identificador da turma (Ex: A, B, C)
    }
  }
  
  module.exports = Turma;
  