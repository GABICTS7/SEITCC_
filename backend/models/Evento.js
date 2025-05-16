// Definindo o modelo do Evento

class Evento {
    constructor(id, titulo, descricao, data) {
      this.id = id;             // ID único do evento
      this.titulo = titulo;     // Título do evento
      this.descricao = descricao; // Descrição do evento
      this.data = data;         // Data do evento
    }
  }
  
  module.exports = Evento;
  