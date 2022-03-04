const forwardMessage = require('./forwardMessage');

const isRedirectThisUpdates = require('./isRedirectThisUpdates');
const isWorkingTime = require('./isWorkingTime');
const logger = require('./logger');

module.exports = (api, updateInfo) => {
  if (updateInfo.chats && updateInfo.chats.length === 0) return;
  logger.info(
    `Receive new updates from ${
      updateInfo?.chats[0]?.title || 'untitled update'
    }`,
  );
  const redirectThisUpdates = isRedirectThisUpdates(updateInfo.updates);
  if (redirectThisUpdates.length && isWorkingTime()) {
    logger.info('Found new messages for forwarding');
    redirectThisUpdates.forEach((anUpdate) => forwardMessage(api, anUpdate));
  }
};
