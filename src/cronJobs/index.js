const cron = require('node-cron');

const { removeJobMessageHandler } = require('../handlers');

module.exports = {
  messageCleanerJob: (bot) => {
    cron.schedule('* * * * *', () => removeJobMessageHandler(bot));
  },
};
