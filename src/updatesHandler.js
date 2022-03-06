const forwardingHandler = require('./forwardingHandler');
const isRedirectThisUpdates = require('./isRedirectThisUpdates');
const logger = require('./logger');

module.exports = (api, updateInfo) => {
  const newMessageUpdates = updateInfo.updates.filter(
    (anUpdate) => anUpdate._ === 'updateNewChannelMessage',
  );
  if (newMessageUpdates && newMessageUpdates.length === 0) return;
  const chatTitles = updateInfo.chats.map((aChat) => aChat.title).join(' - ');
  logger.info(`Receive new updates from "${chatTitles}"`);
  const redirectThisUpdates = isRedirectThisUpdates(updateInfo.updates);
  if (redirectThisUpdates.length) {
    logger.info('Found new messages for forwarding');
    forwardingHandler(api, redirectThisUpdates);
  }
};
