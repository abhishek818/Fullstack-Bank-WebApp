const Pool = require("pg").Pool;
require("dotenv").config();

// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
//   database: process.env.PG_DATABASE,
//   client_encoding: 'win1252', 
//   idleTimeoutMillis: 1000,
// }

const devConfig = 'postgres://kttvhdzjgunddn:ef39dadc2723176f2d63d9fc82a9abc9b82d320002c181b41216970e37553d60@ec2-54-236-122-55.compute-1.amazonaws.com:5432/dcfg1f9vm4adnn';

const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString : process.env.NODE_ENV === "production" ? proConfig : devConfig
});

module.exports = pool;