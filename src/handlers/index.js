/**
 * @typedef { import("grammy").Bot } Bot
 */

const constants = require('../constants');

const onMessageHandler = require('./onMessageHandler');
const startCommandHandler = require('./startCommandHandler');
const moderatingCheckHandler = require('./moderatingCheckHandler');
const cancelBtnHandler = require('./cancelBtnHandler');
const shareJob = require('./shareJob');

module.exports = {
  /**
   * @param {Bot} bot
   * */
  setHandlers: (bot) => {
    bot.on(constants.onHandlers.message, onMessageHandler);
  },
  // commands
  startCommandHandler,
  // flows
  shareJob,
  //
  moderatingCheckHandler,
  cancelBtnHandler,
};
