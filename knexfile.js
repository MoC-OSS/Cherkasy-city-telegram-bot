// Update with your config settings.

const config = require('./src/config');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'postgresql',
  connection: {
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
  },
  pool: {
    min: 1,
    max: 2,
  },
  debug: config.debug,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations',
  },
};
