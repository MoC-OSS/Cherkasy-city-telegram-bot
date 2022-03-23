const { Keyboard } = require('grammy');

const messages = require('../messages');

module.exports = async (ctx) => {
  ctx.session.step = '';
  const keyboard = new Keyboard().text(messages.buttons.shareJob);
  await ctx.reply(messages.welcome, {
    reply_markup: {
      one_time_keyboard: true,
      resize_keyboard: true,
      keyboard: keyboard.build(),
    },
  });
};
