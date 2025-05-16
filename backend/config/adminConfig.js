const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  ADMIN_CREDENTIALS: {
    email: process.env.ADMIN_EMAIL || 'admin@escola.com',
    passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'senhaSuperSecreta123', 10)
  }
};