/**
 * @typedef { import("grammy").Bot } Bot
 */

const shareJobFlow = require('./shareJob');

module.exports = {
  /**
   * @param {Bot} bot
   * */
  setFlows: (bot) => {
    bot.use(shareJobFlow);
  },
};
