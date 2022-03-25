/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard, Keyboard } = require('grammy');

const messages = require('../messages');
const constants = require('../constants');
const config = require('../config');
const { jobService } = require('../services');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx, jobId) => {
  const job = await jobService.getById(jobId);

  const keyboard = new Keyboard().text(messages.buttons.shareJob);
  await ctx.reply(messages.moderating.sendToModerator(job.countId), {
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: keyboard.build(),
    },
  });

  ctx.api.sendMessage(
    config.moderator.id,
    `${messages.moderating.request(
      `@${ctx.from?.username},`,
    )}\n\n${messages.shareJobFlow.preView(job)}`,
    {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text(
          messages.buttons.publish,
          `${constants.payloads.publish}|${jobId}`,
        )
        .row()
        .text(
          messages.buttons.decline,
          `${constants.payloads.decline}|${jobId}`,
        ),
    },
  );
};
