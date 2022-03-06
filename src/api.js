/* eslint-disable camelcase */
const path = require('path');
const MTProto = require('@mtproto/core');
const { sleep } = require('@mtproto/core/src/utils/common');

const config = require('./config');
const logger = require('./logger');
const updatesHandler = require('./updatesHandler');

class API {
  constructor() {
    this.mtproto = new MTProto({
      api_id: config.appId,
      api_hash: config.apiHash,

      storageOptions: {
        path: path.resolve(__dirname, './data/1.json'),
      },
    });
  }

  async call(method, params, options = {}) {
    try {
      const result = await this.mtproto.call(method, params, options);

      return result;
    } catch (error) {
      logger.error(`${method} error:`, error);
      logger.error(JSON.stringify(error));

      const { error_code, error_message } = error;

      if (error_code === 420) {
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);
        const ms = seconds * 1000;

        await sleep(ms);

        return this.call(method, params, options);
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_');

        const dcId = Number(dcIdAsString);

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId);
        } else {
          Object.assign(options, { dcId });
        }

        return this.call(method, params, options);
      }

      return Promise.reject(error);
    }
  }
}

const api = new API();

api.mtproto.updates.on('updates', (updateInfo) =>
  updatesHandler(api, updateInfo),
);

setInterval(async () => {
  try {
    await api.call('updates.getState');
  } catch (error) {
    logger.error(JSON.stringify(error));
  }
}, 1000);

module.exports = api;
