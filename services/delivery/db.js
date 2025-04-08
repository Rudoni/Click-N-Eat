const { Pool } = require('pg');

// Connexion à la base de données `delivery`
const pool = new Pool({
  user: 'root',
  host: 'postgres_db', // nom du service docker
  database: 'delivery',
  password: 'rootpassword',
  port: 5432,
});

pool.connect()
  .then(() => console.log('✅ Connected to delivery database'))
  .catch(err => console.error('❌ Connection error to delivery database', err));

module.exports = pool;
