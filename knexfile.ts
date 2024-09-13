import type { Knex } from "knex";
const dotenv = require('dotenv');

dotenv.config();
// Update with your config settings.
console.log({
  host: process.env.DEV_DB_HOST,
  database: process.env.DEV_DB_NAME,
  user: process.env.DEV_DB_USER,
  password: process.env.DEV_DB_PASSWORD,
  port: Number(process.env.DEV_DB_PORT) || 3306,
});
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      port: Number(process.env.DEV_DB_PORT) || 3306,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      tableName: "knex_migrations",
      directory: './knex/migrations'
    }
  }
};

module.exports = config;
