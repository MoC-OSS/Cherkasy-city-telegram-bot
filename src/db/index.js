const logger = require('../logger');
const knexClient = require('./knex');

const Jobs = require('./models/jobs');

module.exports = {
  initDbConnection: async () => {
    logger.log('init connection to database');
    try {
      await knexClient.raw('select 1+1 as result');
    } catch (error) {
      console.error('system with knex error', error);
      process.exit(1);
    }
  },
  models: {
    jobsModel: new Jobs(knexClient),
  },
};
