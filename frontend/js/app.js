// Funções de comunicação do frontend com o backend via Fetch API

// Função para fazer login (exemplo)
async function loginUsuario(email, senha) {
    try {
      const response = await fetch('http://localhost:3000/api/professores/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Login realizado com sucesso!');
        localStorage.setItem('token', data.token); // Armazena token, se existir
        window.location.href = '/frontend/pages/dashboard.html';
      } else {
        alert(data.message || 'Erro no login.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao tentar logar.');
    }
  }
  
  // Função para buscar alunos (exemplo)
  async function buscarAlunos() {
    try {
      const response = await fetch('http://localhost:3000/api/alunos');
      const alunos = await response.json();
      console.log('Alunos:', alunos);
      // Aqui você pode preencher uma tabela HTML com os alunos
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  }
  
  // Função para cadastrar um novo aluno (exemplo)
  async function cadastrarAluno(nome, matricula, turma_id) {
    try {
      const response = await fetch('http://localhost:3000/api/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, matricula, turma_id })
      });
  
      if (response.ok) {
        alert('Aluno cadastrado com sucesso!');
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.message || 'Erro ao cadastrar aluno.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      alert('Erro inesperado.');
    }
  }
  
  // Outras funções podem ser criadas para:
  // - Buscar professores
  // - Cadastrar notas
  // - Buscar faltas
  // - Gerar e salvar grade
  // Seguindo o mesmo padrão acima de chamadas via fetch.
  
  