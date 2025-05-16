const express = require('express');
const path = require('path');
const app = express();

// Configurações
const FRONTEND_DIR = path.join(__dirname, '../frontend');

// Sirva arquivos estáticos
app.use(express.static(FRONTEND_DIR));

// Rotas
app.get('/', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html')); // Usa o index.html raiz
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'pages', 'login.html'));
});

app.listen(3000, () => {
  console.log('✅ Servidor rodando em http://localhost:3000');
});