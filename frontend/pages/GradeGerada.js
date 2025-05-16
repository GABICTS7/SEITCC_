// Funções para interagir com a grade de horários gerada pela IA

async function gerarGrade() {
    try {
      const response = await fetch('http://localhost:3000/api/ia/gerar');
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Grade gerada com sucesso!');
        buscarGradeSalva(); // Após gerar, buscar para visualizar
      } else {
        alert(data.message || 'Erro ao gerar grade.');
      }
    } catch (error) {
      console.error('Erro ao gerar grade:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
  }
  
  async function buscarGradeSalva() {
    try {
      const response = await fetch('http://localhost:3000/api/horarios');
      const grade = await response.json();
  
      const tabela = document.getElementById('tabelaGrade').querySelector('tbody');
      tabela.innerHTML = '';
  
      grade.forEach(item => {
        const row = `
          <tr>
            <td>${item.turno}</td>
            <td>${item.dia_semana}</td>
            <td>${item.horario_aula}</td>
            <td>${item.professor_id}</td>
            <td>${item.sala_id || '-'}</td>
            <td>${item.disciplina}</td>
            <td>${item.turma_id}</td>
          </tr>
        `;
        tabela.innerHTML += row;
      });
  
    } catch (error) {
      console.error('Erro ao buscar grade:', error);
    }
  }
  
  // Inicialização ao abrir a página (caso a página tenha tabela)
  document.addEventListener('DOMContentLoaded', buscarGradeSalva);
  