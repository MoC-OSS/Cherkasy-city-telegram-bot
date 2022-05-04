const { Keyboard } = require('grammy');

const messages = require('../messages');
const logger = require('../logger');

module.exports = async (ctx) => {
  ctx.session.step = '';
  const keyboard = new Keyboard().text(messages.buttons.shareJob);
  await ctx
    .reply(messages.welcome, {
      parse_mode: 'HTML',
      reply_markup: {
        one_time_keyboard: true,
        resize_keyboard: true,
        keyboard: keyboard.build(),
      },
    })
    .then(function (resp) {
      logger.log(resp);
    })
    .catch(function (error) {
      logger.error(error);
    });
};
