const { Bot, session, GrammyError, HttpError } = require('grammy');

const { initDbConnection } = require('./db');
const config = require('./config');
const sessionClient = require('./sessions');
const { messageCleanerJob } = require('./cronJobs');

const { ChannelMessagesSkipMiddleware } = require('./middlewares');
const { setCommands } = require('./commands');
const { setHandlers } = require('./handlers');
const { setHears } = require('./hears');
const { setFlows } = require('./flows');
const logger = require('./logger');

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

  bot.catch((err) => {
    const { ctx } = err;
    logger.error(`Error while handling update ${JSON.stringify(ctx.update)}:`);
    logger.error(JSON.stringify(err));
    if (err.error instanceof GrammyError) {
      logger.error(`Error in request: ${err.error.description}`);
    } else if (err.error instanceof HttpError) {
      logger.error(`Could not contact Telegram: ${JSON.stringify(err.error)}`);
    } else {
      logger.error(`Unknown error: ${JSON.stringify(err.message)}`);
    }
  });

  bot.start();
  logger.log('bot successfully started');
}

boot();
