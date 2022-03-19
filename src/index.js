const { Bot, session } = require('grammy');

const config = require('./config');
const sessionConfig = require('./sessions');

const { setCommands } = require('./commands');
const { setHandlers } = require('./handlers');
const { setHears } = require('./hears');
const { setFlows } = require('./flows');

const bot = new Bot(config.telegram.token);

bot.use(session(sessionConfig));

setCommands(bot);
setHears(bot);
setFlows(bot);
setHandlers(bot);

bot.start();

console.log('bot successfully started');
