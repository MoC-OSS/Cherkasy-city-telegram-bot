/**
 * @typedef { import("grammy").Bot } Bot
 * @typedef { import("grammy").Context } GrammyContext
 */

const handlers = require('../handlers');
const { buttons } = require('../messages');

module.exports = {
  /**
   * @param {Bot} bot
   * */
  setHears: (bot) => {
    bot.hears(buttons.shareJob, handlers.shareJob.initFlow);
    bot.hears(buttons.sendToModerator, handlers.sendToModerator);
    bot.hears(buttons.cancel, handlers.cancelBtnHandler);
  },
};
