const logger = require('./logger');
const { getForwardedPeerData, getTargetPeerData } = require('./peers');

module.exports = async (api, anUpdate) => {
  try {
    await api.call('messages.forwardMessages', {
      from_peer: {
        _: 'inputPeerChannel',
        ...getTargetPeerData(),
        // channel_id: config.targetPeerId,
        // access_hash: config.targetPeerHash,
      },
      to_peer: {
        _: 'inputPeerChannel',
        ...getForwardedPeerData(),
        // channel_id: config.forwardedPeerId,
        // access_hash: config.forwardedPeerHash,
      },
      id: [anUpdate.message.id],
      random_id: [
        Math.ceil(Math.random() * 0xffffff) +
          Math.ceil(Math.random() * 0xffffff),
      ],
    });
    logger.info(`Message with id ${anUpdate.message.id} is redirected`);
  } catch (error) {
    logger.error('Happen error when forward message');
    logger.error(JSON.stringify(error));
  }
};
