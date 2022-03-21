const { Keyboard } = require('grammy');

const messages = require('../messages');

module.exports = async (ctx) => {
  const keyboard = new Keyboard().text(messages.buttons.shareJob);
  await ctx.reply(messages.welcome, {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: keyboard.build(),
    },
  });
};
