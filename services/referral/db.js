// db.js
const { Pool } = require('pg');

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log("✅ Connected to referral database"))
  .catch(err => console.error("❌ Connection error:", err));

module.exports = client;
