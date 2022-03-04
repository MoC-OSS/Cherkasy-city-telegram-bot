const forwardingHandler = require('./forwardingHandler');
const isRedirectThisUpdates = require('./isRedirectThisUpdates');
const logger = require('./logger');

module.exports = (api, updateInfo) => {
  if (updateInfo.chats && updateInfo.chats.length === 0) return;
  logger.info(`Receive new updates from ${updateInfo.chats[0].title}`);
  const redirectThisUpdates = isRedirectThisUpdates(updateInfo.updates);
  if (redirectThisUpdates.length) {
    logger.info('Found new messages for forwarding');
    forwardingHandler(api, redirectThisUpdates);
  }
};
