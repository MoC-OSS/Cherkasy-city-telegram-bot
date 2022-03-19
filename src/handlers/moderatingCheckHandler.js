/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const messages = require('../messages');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  await ctx.reply(messages.moderating, {
    reply_markup: { remove_keyboard: true },
  });
};
