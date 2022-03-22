/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { Keyboard } = require('grammy');

const messages = require('../messages');
const { jobService } = require('../services');

/**
 * @param {GrammyContext} ctx
 * */

module.exports = async (ctx, jobId) => {
  const jobCountId = await jobService.getCountId(jobId);
  const keyboard = new Keyboard().text(messages.buttons.shareJob);
  ctx.reply(messages.jobDiscard(jobCountId), {
    reply_markup: {
      one_time_keyboard: true,
      resize_keyboard: true,
      keyboard: keyboard.build(),
    },
  });
};
