// Definindo o modelo do Diretor

class Diretor {
    constructor(id, nome, email, senha) {
      this.id = id;         // ID único do diretor
      this.nome = nome;     // Nome do diretor
      this.email = email;   // Email institucional do diretor
      this.senha = senha;   // Senha de acesso do diretor
    }
  }
  
  module.exports = Diretor;
  