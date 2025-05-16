const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_forte_123!';

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'sei_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Teste de conexão com o banco
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado ao MySQL como ID:', connection.threadId);
    connection.release();
  } catch (err) {
    console.error('Erro na conexão com o MySQL:', err);
    process.exit(1);
  }
})();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Usuário admin
const CREDENCIAIS_ADMIN = {
  email: "admin@escola.com",
  senha: "admin123",
  nome: "Administrador",
  isAdmin: true
};

// Rotas de Autenticação
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (email === CREDENCIAIS_ADMIN.email && senha === CREDENCIAIS_ADMIN.senha) {
      const token = jwt.sign(
        { 
          email: CREDENCIAIS_ADMIN.email,
          nome: CREDENCIAIS_ADMIN.nome,
          isAdmin: CREDENCIAIS_ADMIN.isAdmin
        }, 
        JWT_SECRET, 
        { expiresIn: '1h' }
      );

      return res.json({
        success: true,
        message: 'Login bem-sucedido',
        token,
        user: CREDENCIAIS_ADMIN
      });
    }

    res.status(401).json({ 
      success: false, 
      message: 'Credenciais inválidas' 
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro no servidor durante o login' 
    });
  }
});

// Rotas de Professores (corrigidas e testadas)
app.post('/api/professores', authenticateToken, async (req, res) => {
  try {
    const { nome, email, cpf, disciplina, disponibilidade } = req.body;

    // Validação básica
    if (!nome || !email || !cpf || !disciplina) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos obrigatórios devem ser preenchidos'
      });
    }

    // Inserir no banco de dados
    const [result] = await pool.query(
      `INSERT INTO professores 
      (nome, email, cpf, disciplina, disponibilidade) 
      VALUES (?, ?, ?, ?, ?)`,
      [nome, email, cpf, disciplina, JSON.stringify(disponibilidade || [])]
    );

    // Buscar o professor cadastrado para retornar
    const [rows] = await pool.query('SELECT * FROM professores WHERE id = ?', [result.insertId]);
    
    res.status(201).json({
      success: true,
      message: 'Professor cadastrado com sucesso',
      professor: rows[0]
    });

  } catch (error) {
    console.error('Erro ao cadastrar professor:', error);
    
    // Tratar erro de campos únicos duplicados
    if (error.code === 'ER_DUP_ENTRY') {
      const campo = error.message.includes('email') ? 'E-mail' : 'CPF';
      return res.status(400).json({
        success: false,
        message: `${campo} já está cadastrado no sistema`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro ao cadastrar professor'
    });
  }
});

app.get('/api/professores', authenticateToken, async (req, res) => {
  try {
    const [professores] = await pool.query('SELECT * FROM professores');
    res.json({ 
      success: true, 
      professores 
    });
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao buscar professores' 
    });
  }
});

app.get('/api/professores/:id', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM professores WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Professor não encontrado'
      });
    }
    
    res.json({
      success: true,
      professor: rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar professor:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar professor'
    });
  }
});

app.put('/api/professores/:id', authenticateToken, async (req, res) => {
  try {
    const { nome, email, cpf, disciplina, disponibilidade } = req.body;
    
    const [result] = await pool.query(
      `UPDATE professores SET 
      nome = ?, email = ?, cpf = ?, disciplina = ?, disponibilidade = ?
      WHERE id = ?`,
      [nome, email, cpf, disciplina, JSON.stringify(disponibilidade || []), req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Professor não encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Professor atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar professor'
    });
  }
});

app.delete('/api/professores/:id', authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM professores WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Professor não encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Professor removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover professor:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao remover professor'
    });
  }
});

// Rotas de Turmas
app.post('/api/turmas', authenticateToken, async (req, res) => {
  try {
    const { nome, ano, turno } = req.body;
    
    if (!nome || !ano || !turno) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO turmas (nome, ano, turno) VALUES (?, ?, ?)`,
      [nome, ano, turno]
    );

    res.json({
      success: true,
      message: 'Turma criada com sucesso',
      turmaId: result.insertId
    });
  } catch (error) {
    console.error('Erro ao criar turma:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao criar turma' 
    });
  }
});

app.get('/api/turmas', authenticateToken, async (req, res) => {
  try {
    const [turmas] = await pool.query('SELECT * FROM turmas');
    res.json({ 
      success: true, 
      turmas 
    });
  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao buscar turmas' 
    });
  }
});

app.delete('/api/turmas/:id', authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM turmas WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Turma não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Turma removida com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir turma:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao excluir turma'
    });
  }
});

app.put('/api/turmas/:id', authenticateToken, async (req, res) => {
  try {
    const { nome, ano, turno } = req.body;
    const { id } = req.params;

    if (!nome || !ano || !turno) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    const [result] = await pool.query(
      'UPDATE turmas SET nome = ?, ano = ?, turno = ? WHERE id = ?',
      [nome, ano, turno, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Turma não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Turma atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar turma'
    });
  }
});



// Rotas de Eventos
app.post('/api/eventos', authenticateToken, async (req, res) => {
  try {
    const { titulo, descricao, data_inicio, data_fim, tipo } = req.body;
    
    if (!titulo || !data_inicio || !tipo) {
      return res.status(400).json({
        success: false,
        message: 'Título, data de início e tipo são obrigatórios'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO eventos (titulo, descricao, data_inicio, data_fim, tipo) 
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, descricao, data_inicio, data_fim || null, tipo]
    );

    res.json({
      success: true,
      message: 'Evento criado com sucesso',
      eventoId: result.insertId
    });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao criar evento' 
    });
  }
});

app.delete('/api/eventos/:id', authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM eventos WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Evento removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover evento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao remover evento'
    });
  }
});


app.get('/api/eventos', authenticateToken, async (req, res) => {
  try {
    const [eventos] = await pool.query('SELECT * FROM eventos ORDER BY data_inicio ASC');
    res.json({ 
      success: true, 
      eventos 
    });
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao buscar eventos' 
    });
  }
});

// Rotas de Grade
app.post('/api/grades/gerar', authenticateToken, async (req, res) => {
  try {
    const { turma_id } = req.body;
    
    // 1. Buscar professores e suas disponibilidades
    const [professores] = await pool.query('SELECT id, nome, disciplina, disponibilidade FROM professores');
    
    // 2. Gerar grade (exemplo simplificado)
    const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
    const horarios = ['08:00', '10:00', '14:00', '16:00'];
    const gradeGerada = [];

    for (const dia of dias) {
      for (const horario of horarios) {
        const professorDisponivel = professores.find(p => {
          try {
            const disp = JSON.parse(p.disponibilidade || '[]');
            return disp.some(d => d.dia === dia && d.horarios.includes(horario));
          } catch (e) {
            return false;
          }
        });

        if (professorDisponivel) {
          gradeGerada.push({
            dia,
            horario,
            disciplina: professorDisponivel.disciplina,
            professor_id: professorDisponivel.id,
            professor_nome: professorDisponivel.nome
          });
        }
      }
    }

    // 3. Salvar no banco
    await pool.query('DELETE FROM grades WHERE turma_id = ?', [turma_id]);
    
    for (const aula of gradeGerada) {
      await pool.query(
        `INSERT INTO grades 
        (turma_id, dia_semana, horario_aula, disciplina, professor_id) 
        VALUES (?, ?, ?, ?, ?)`,
        [turma_id, aula.dia, aula.horario, aula.disciplina, aula.professor_id]
      );
    }

    res.json({
      success: true,
      message: 'Grade gerada com sucesso',
      grade: gradeGerada
    });
  } catch (error) {
    console.error('Erro ao gerar grade:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar grade'
    });
  }
});

app.get('/api/grades/:turma_id', authenticateToken, async (req, res) => {
  try {
    const [grade] = await pool.query(
      'SELECT * FROM grades WHERE turma_id = ? ORDER BY dia_semana, horario_aula',
      [req.params.turma_id]
    );
    res.json({
      success: true,
      grade
    });
  } catch (error) {
    console.error('Erro ao buscar grade:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar grade'
    });
  }
});

// Rotas de Disponibilidade do Professor
app.get('/api/disponibilidade/:professorId', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT disponibilidade FROM professores WHERE id = ?', 
            [req.params.professorId]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Professor não encontrado'
            });
        }
        
        // Retorna a disponibilidade parseada ou um array vazio se não houver
        const disponibilidade = rows[0].disponibilidade 
            ? JSON.parse(rows[0].disponibilidade) 
            : [];
            
        res.json({
            success: true,
            disponibilidade
        });
    } catch (error) {
        console.error('Erro ao buscar disponibilidade:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar disponibilidade do professor'
        });
    }
});

app.post('/api/disponibilidade', authenticateToken, async (req, res) => {
    try {
        const { professorId, cargaHorariaMensal, cargaHorariaAnual, diasDisponibilidade, turno } = req.body;
        
        // Validação básica
        if (!professorId || !diasDisponibilidade || !turno) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios faltando'
            });
        }
        
        // Verifica se o professor existe
        const [professor] = await pool.query('SELECT id FROM professores WHERE id = ?', [professorId]);
        if (professor.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Professor não encontrado'
            });
        }
        
        // Prepara o objeto de disponibilidade
        const disponibilidade = {
            cargaHorariaMensal,
            cargaHorariaAnual,
            diasDisponibilidade,
            turno
        };
        
        // Atualiza o professor com a nova disponibilidade
        await pool.query(
            'UPDATE professores SET disponibilidade = ? WHERE id = ?',
            [JSON.stringify(disponibilidade), professorId]
        );
        
        res.json({
            success: true,
            message: 'Disponibilidade atualizada com sucesso',
            disponibilidade
        });
    } catch (error) {
        console.error('Erro ao salvar disponibilidade:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao salvar disponibilidade'
        });
    }
});

// Rota para buscar informações básicas do professor (usada pelo formulário)
app.get('/api/professor-info/:id', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, nome FROM professores WHERE id = ?', 
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Professor não encontrado'
            });
        }
        
        res.json({
            success: true,
            professor: rows[0]
        });
    } catch (error) {
        console.error('Erro ao buscar informações do professor:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar informações do professor'
        });
    }
});

// Rotas do Frontend
const FRONTEND_DIR = path.join(__dirname, '../frontend');
app.use(express.static(FRONTEND_DIR));

const pages = [
  '', 'index', 'login', 'dashboard', 'professores', 'turmas', 
  'eventos', 'gradeGerada', '404'
];

pages.forEach(page => {
  const route = page === '' ? '/' : `/${page}`;
  app.get(`${route}(.html)?`, (req, res) => {
    const file = page === '' ? 'index.html' : `${page}.html`;
    res.sendFile(path.join(FRONTEND_DIR, 'pages', file));
  });
});

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log(`
  🚀 Servidor rodando em http://localhost:${PORT}
  
  Rotas disponíveis:
  • POST   /api/login          - Login
  • POST   /api/professores    - Cadastrar professor
  • GET    /api/professores    - Listar professores
  • POST   /api/turmas         - Cadastrar turma
  • GET    /api/turmas         - Listar turmas
  • POST   /api/eventos        - Cadastrar evento
  • GET    /api/eventos        - Listar eventos
  • POST   /api/grades/gerar   - Gerar grade
  • GET    /api/grades/:id     - Buscar grade
  `);
});