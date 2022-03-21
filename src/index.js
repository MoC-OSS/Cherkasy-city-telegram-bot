const { Bot, session } = require('grammy');

const { initDbConnection } = require('./db');
const config = require('./config');
const sessionClient = require('./sessions');
const { messageCleanerJob } = require('./cronJobs');

const { ChannelMessagesSkipMiddleware } = require('./middlewares');
const { setCommands } = require('./commands');
const { setHandlers } = require('./handlers');
const { setHears } = require('./hears');
const { setFlows } = require('./flows');

async function boot() {
  initDbConnection();

  const bot = new Bot(config.telegram.token);

  const channelMessagesSkipMiddleware = new ChannelMessagesSkipMiddleware(bot);

  messageCleanerJob(bot);
  bot.use(channelMessagesSkipMiddleware.middleware());

  await sessionClient.init();
  bot.use(session(await sessionClient.config()));

  setCommands(bot);
  setHears(bot);
  setFlows(bot);
  setHandlers(bot);

  bot.start();
  console.log('bot successfully started');
}

boot();
