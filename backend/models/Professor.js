// Definindo o modelo do Professor

class Professor {
  constructor(id, nome, email, cpf, disciplina, disponibilidade) {
    this.id = id;                   // ID único do professor
    this.nome = nome;               // Nome do professor
    this.email = email;             // Email institucional
    this.cpf = cpf;                 // CPF (novo campo)
    this.disciplina = disciplina;   // Disciplina (novo campo)
    this.disponibilidade = disponibilidade || []; // Array de horários (novo campo)
  }
}

module.exports = Professor;