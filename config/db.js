require('dotenv').config({ path: '../.env' });

const x509Certificate = process.env.DB_SSL_CERT;
const ssl = x509Certificate
  ? {
    rejectUnauthorized: false,
    ca: x509Certificate
  }
  : null;

const config = {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      port: process.env.DB_PORT,
      ssl,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../migrations',
      loadExtensions: ['.js', '.mjs', '.cjs'],
    },
    seeds: {
      directory: '../seeds',
      loadExtensions: ['.js', '.mjs', '.cjs'],
    },
    logQueries: (process.env.DB_LOG_QUERIES !== 'false'),
  };
  
  module.exports = config;
  