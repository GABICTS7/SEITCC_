// Definindo o modelo da Falta

class Faltas {
    constructor(id, aluno_id, data, motivo) {
      this.id = id;             // ID único da falta
      this.aluno_id = aluno_id; // ID do aluno relacionado
      this.data = data;         // Data da falta
      this.motivo = motivo;     // Motivo da falta (opcional)
    }
  }
  
  module.exports = Faltas;
  