const { PsqlAdapter } = require('@satont/grammy-psql-storage');
const { Client } = require('pg');

const config = require('../config');

const client = new Client({
  user: config.db.user,
  hostname: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

module.exports = {
  init: () => client.connect(),
  config: async () => ({
    initial: () => ({ step: 'idle' }),
    storage: await PsqlAdapter.create({ tableName: 'sessions', client }),
  }),
};
