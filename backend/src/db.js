const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopdb', // 你自己建立的資料庫名稱
  password: '',
  port: 5173,
});

module.exports = pool;