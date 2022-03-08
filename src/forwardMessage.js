/* eslint-disable camelcase */
const logger = require('./logger');
const config = require('./config');

module.exports = async (api, peer, id) => {
  try {
    await api.call('messages.forwardMessages', {
      from_peer: {
        _: 'inputPeerChannel',
        channel_id: config.targetPeerId,
        access_hash: config.targetPeerHash,
      },
      to_peer: peer,
      id: [id], // anUpdate.message.id
      random_id: [
        Math.ceil(Math.random() * 0xffffff) +
          Math.ceil(Math.random() * 0xffffff),
      ],
    });
    logger.info(
      `Message with id ${id} is redirected to ${
        peer.channel_id || peer.chat_id
      }`,
    );
  } catch (error) {
    logger.error('Happen error when forward message');
    logger.error(JSON.stringify(error));
  }
};
