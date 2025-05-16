const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ADMIN_CREDENTIALS } = require('../config/adminConfig');

exports.login = async (req, res) => {
  const { tipo, email, senha, matricula } = req.body;

  // Validação básica dos campos
  if (!tipo) {
    return res.status(400).json({
      success: false,
      message: 'Tipo de usuário não especificado.'
    });
  }

  try {
    // Verificação para admin
    if (tipo === 'admin') {
      return handleAdminLogin(email, senha, res);
    }

    // Processo normal para outros usuários
    const { query, values } = getQueryForUserType(tipo, email, matricula);
    
    const [results] = await db.promise().query(query, values);

    if (!results || results.length === 0) {
      return sendInvalidCredentials(res);
    }

    const user = results[0];
    return await handleUserLogin(user, senha, tipo, res);

  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ 
      success: false,
      message: 'Erro no servidor.',
      error: err.message 
    });
  }
};

// Funções auxiliares
async function handleAdminLogin(email, senha, res) {
  if (email !== ADMIN_CREDENTIALS.email) {
    return sendInvalidCredentials(res, 'admin');
  }

  const passwordMatch = await bcrypt.compare(senha, ADMIN_CREDENTIALS.passwordHash);
  
  if (!passwordMatch) {
    return sendInvalidCredentials(res, 'admin');
  }

  const token = generateToken({
    id: 'admin-root',
    tipo: 'admin',
    isAdmin: true
  });

  return res.json({
    success: true,
    message: 'Login de administrador realizado com sucesso!',
    token: token,
    userType: 'admin'
  });
}

function getQueryForUserType(tipo, email, matricula) {
  switch (tipo) {
    case 'professor':
      return {
        query: 'SELECT * FROM professores WHERE email = ?',
        values: [email]
      };
    case 'diretor':
      return {
        query: 'SELECT * FROM diretores WHERE email = ?',
        values: [email]
      };
    case 'aluno':
      return {
        query: 'SELECT * FROM alunos WHERE matricula = ?',
        values: [matricula]
      };
    default:
      throw new Error('Tipo de usuário inválido');
  }
}

async function handleUserLogin(user, senha, tipo, res) {
  const passwordMatch = await bcrypt.compare(senha, user.senha);

  if (!passwordMatch) {
    return sendInvalidCredentials(res);
  }

  const token = generateToken({
    id: user.id,
    tipo: tipo,
    nome: user.nome || null,
    email: user.email || null
  });

  return res.json({
    success: true,
    message: 'Login realizado com sucesso!',
    token: token,
    userType: tipo,
    userName: user.nome,
    userEmail: user.email
  });
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

function sendInvalidCredentials(res, userType = '') {
  const message = userType === 'admin' 
    ? 'Credenciais de administrador inválidas.'
    : 'Credenciais inválidas.';

  return res.status(401).json({
    success: false,
    message: message
  });
}