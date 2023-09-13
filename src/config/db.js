const pgp = require('pg-promise')();

const databaseConfig = {
  user: 'fernando',
  password: '123456',
  host: 'db',
  port: 5434,
  database: 'foodfy'
}

const db = pgp(databaseConfig);

module.exports = { db };