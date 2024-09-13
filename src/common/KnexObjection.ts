import Knex from 'knex';
import { Environment } from './Environment';

const objectionKnex = Knex({
  client: 'mysql',
  connection: {
    host: Environment.getStagedEnv('DB_HOST'),
    database: Environment.getStagedEnv('DB_NAME'),
    user: Environment.getStagedEnv('DB_USER'),
    password: Environment.getStagedEnv('DB_PASSWORD'),
    port: Number(Environment.getStagedEnv('DB_PORT')) || 3306,
    charset: 'utf8mb4',
    pool: {
      max: 100,
      min: 0,
    },
  },
  log: {
    warn(message) {
      console.log("warn :: " + message);
    },
    error(message) {
      console.log("error :: " + message);
    },
    deprecate(message) {
      console.log("deprecate :: " + message);
    },
    debug(message) {
      console.log("debug :: " + message);
    },
  },
});




export { objectionKnex }