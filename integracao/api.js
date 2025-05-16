// Arquivo para centralizar chamadas de API do frontend para o backend
// Usado para organizar futuras expansões de integração se necessário

const API_URL = 'http://localhost:3000/api';

// Exemplo de funções de chamada (podemos expandir conforme necessário):

// Buscar todos os alunos
async function getAlunos() {
  const response = await fetch(`${API_URL}/alunos`);
  return response.json();
}

// Buscar todos os professores
async function getProfessores() {
  const response = await fetch(`${API_URL}/professores`);
  return response.json();
}

// Buscar todas as turmas
async function getTurmas() {
  const response = await fetch(`${API_URL}/turmas`);
  return response.json();
}

// Buscar todas as faltas
async function getFaltas() {
  const response = await fetch(`${API_URL}/faltas`);
  return response.json();
}

// Buscar todas as notas
async function getNotas() {
  const response = await fetch(`${API_URL}/notas`);
  return response.json();
}

// Buscar todos os eventos
async function getEventos() {
  const response = await fetch(`${API_URL}/eventos`);
  return response.json();
}

// Gerar Grade com IA
async function gerarGradeIA() {
  const response = await fetch(`${API_URL}/ia/gerar`);
  return response.json();
}

// Salvar Grade gerada
async function salvarGradeIA(grade) {
  const response = await fetch(`${API_URL}/ia/salvar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(grade)
  });
  return response.json();
}

// Exportar funções se quiser usar via módulos futuramente
// module.exports = { getAlunos, getProfessores, getTurmas, getFaltas, getNotas, getEventos, gerarGradeIA, salvarGradeIA };
