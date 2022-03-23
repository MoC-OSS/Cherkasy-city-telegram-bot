/**
 * @typedef { import("grammy").Bot } Bot
 */

const constants = require('../constants');

const onMessageHandler = require('./onMessageHandler');
const startCommandHandler = require('./startCommandHandler');
const sendToModerator = require('./sendToModerator');
const moderatorCheckHandler = require('./moderatorCheckHandler');
const cancelBtnHandler = require('./cancelBtnHandler');
const shareJob = require('./shareJob');
const removeJobMessageHandler = require('./removeJobMessageHandler');
const statisticsHandler = require('./statisticsHandler');

module.exports = {
  /**
   * @param {Bot} bot
   * */
  setHandlers: (bot) => {
    bot.on(constants.onHandlers.message, onMessageHandler);
    bot.on(constants.onHandlers.callback, moderatorCheckHandler);
  },
  // commands
  startCommandHandler,
  statisticsHandler,
  // flows
  shareJob,
  //
  sendToModerator,
  cancelBtnHandler,
  removeJobMessageHandler,
};
