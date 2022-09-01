const cron = require('node-cron');

const { deletionHandler } = require('../handlers');

module.exports = {
  messageCleanerJob: (bot) => {
    cron.schedule('* * * * *', () => deletionHandler(bot));
  },
};
