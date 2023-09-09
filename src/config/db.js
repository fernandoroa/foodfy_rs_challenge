const { Pool } = require("pg")

module.exports = new Pool ({
  user: 'fernando',
  password: "123456",
  host: "db",
  port: 5434,
  database: "foodfy"
})