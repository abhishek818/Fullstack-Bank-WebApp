const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "keyboardcat",
  host: "localhost",
  port: 5432,
  database: "Fyle2",
  client_encoding: 'win1252', 
  idleTimeoutMillis: 1000,
});

module.exports = pool;