// app.js
const express = require('express');
const dotenv = require('dotenv');
const dataRoutes = require('./routes/dataRoutes');

// Carregar as variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Usar as rotas
app.use('/api', dataRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
