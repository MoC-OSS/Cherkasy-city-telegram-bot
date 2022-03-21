/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard, Keyboard } = require('grammy');

const messages = require('../messages');
const constants = require('../constants');
const { jobService } = require('../services');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  const keyboard = new Keyboard().text(messages.buttons.shareJob);
  await ctx.reply(messages.moderating.sendToModerator, {
    reply_markup: { one_time_keyboard: true, keyboard: keyboard.build() },
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
