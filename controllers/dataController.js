const pool = require('../models/db');

// Função para listar todos os dados
exports.getAllData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tabela');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para obter um único item por ID
exports.getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tabela WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para criar um novo dado
exports.createData = async (req, res) => {
  const { coluna1, coluna2 } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tabela (coluna1, coluna2) VALUES ($1, $2) RETURNING *',
      [coluna1, coluna2]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para atualizar um dado
exports.updateData = async (req, res) => {
  const { id } = req.params;
  const { coluna1, coluna2 } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tabela SET coluna1 = $1, coluna2 = $2 WHERE id = $3 RETURNING *',
      [coluna1, coluna2, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para deletar um dado
exports.deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tabela WHERE id = $1', [id]);
    res.json({ message: 'Dado deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
