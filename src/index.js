const { Bot, session } = require('grammy');

const { initDbConnection } = require('./db');
const config = require('./config');
const sessionConfig = require('./sessions');
const { messageCleanerJob } = require('./cronJobs');

const { ChannelMessagesSkipMiddleware } = require('./middlewares');
const { setCommands } = require('./commands');
const { setHandlers } = require('./handlers');
const { setHears } = require('./hears');
const { setFlows } = require('./flows');

initDbConnection();

const bot = new Bot(config.telegram.token);

const channelMessagesSkipMiddleware = new ChannelMessagesSkipMiddleware(bot);

messageCleanerJob(bot);
bot.use(channelMessagesSkipMiddleware.middleware());

bot.use(session(sessionConfig));

setCommands(bot);
setHears(bot);
setFlows(bot);
setHandlers(bot);

bot.start();

console.log('bot successfully started');
