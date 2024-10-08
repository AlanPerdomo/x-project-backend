require('dotenv').config();

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const client = await pool.connect();
  console.log('connected');

  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  client.release();

  global.connection = pool;

  return pool.connect();
}
connect();