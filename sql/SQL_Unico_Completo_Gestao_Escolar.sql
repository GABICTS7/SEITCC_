create database sei_database;
use sei_database;

-- Tabela de Diretores (mantida igual)
CREATE TABLE diretores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tabela professores (COMPATÍVEL com seu Model e Controller existentes)
CREATE TABLE IF NOT EXISTS professores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  disciplina VARCHAR(50) NOT NULL,
  disponibilidade JSON,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Turmas (mantida igual)
CREATE TABLE IF NOT EXISTS turmas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  ano INT NOT NULL,
  turno VARCHAR(50) NOT NULL,
  quantidade_alunos INT DEFAULT 0,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Tabela de Alunos (mantida igual)
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    matricula VARCHAR(50) NOT NULL UNIQUE,
    turma_id INT,
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

-- Tabela de Notas (mantida igual)
CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT,
    disciplina VARCHAR(100) NOT NULL,
    nota DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- Tabela de Faltas (mantida igual)
CREATE TABLE faltas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT,
    data DATE NOT NULL,
    motivo TEXT,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- Tabela de Eventos (mantida igual)
CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT,
  data_inicio DATETIME NOT NULL,
  data_fim DATETIME,
  tipo VARCHAR(50) NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Horários (gerada pela IA - mantida igual)
CREATE TABLE horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turno VARCHAR(50) NOT NULL,
    dia_semana VARCHAR(50) NOT NULL,
    horario_aula VARCHAR(50) NOT NULL,
    professor_id INT,
    sala_id INT,
    disciplina VARCHAR(100) NOT NULL,
    turma_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id),
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
);



