const { knex } = require('knex');

const dbOptions = require('../../knexfile');

const knexClient = knex(dbOptions);

module.exports = knexClient;
