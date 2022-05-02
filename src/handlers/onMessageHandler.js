/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { Keyboard } = require('grammy');

const messages = require('../messages');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  try {
    const keyboard = new Keyboard().text(messages.buttons.shareJob);
    ctx.reply(messages.default, {
      one_time_keyboard: true,
      resize_keyboard: true,
      keyboard: keyboard.build(),
    });
  } catch {}
};
