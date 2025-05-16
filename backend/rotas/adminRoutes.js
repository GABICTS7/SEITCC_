const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../midew/adminMiddleware');

// Painel administrativo
router.get('/dashboard', verifyAdmin, (req, res) => {
  res.json({ 
    success: true,
    message: 'Bem-vindo ao painel administrativo',
    user: req.user,
    features: [
      { name: 'Gestão de Usuários', path: '/users' },
      { name: 'Relatórios', path: '/reports' },
      { name: 'Configurações', path: '/settings' }
    ]
  });
});

// Adicione mais rotas administrativas aqui...

module.exports = router;