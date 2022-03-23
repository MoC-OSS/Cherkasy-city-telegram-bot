/**
 * @typedef { import("grammy").Bot } Bot
 * @typedef { import("grammy").Context } GrammyContext
 */

const constants = require('../constants');
const handlers = require('../handlers');

module.exports = {
  /**
   * @param {Bot} bot
   * */
  setCommands: (bot) => {
    bot.command(constants.commands.start, handlers.startCommandHandler);
    bot.command(constants.commands.statistics, handlers.statisticsHandler);
  },
};
