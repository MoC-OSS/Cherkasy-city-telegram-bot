/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard } = require('grammy');

const messages = require('../messages');
const constants = require('../constants');
const { jobService } = require('../services');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  await ctx.reply(messages.moderating.sendToModerator, {
    reply_markup: { remove_keyboard: true },
  });

  const { jobId } = ctx.session;
  const job = await jobService.getByIdForView(jobId);
  ctx.api.sendMessage(
    constants.moderator.id,
    `${messages.moderating.request}\n\n${messages.shareJobFlow.preView(job)}`,
    {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text(
          messages.buttons.publish,
          `${constants.payloads.publish}|${jobId}`,
        )
        .text(
          messages.buttons.decline,
          `${constants.payloads.decline}|${jobId}`,
        ),
    },
  );
};
