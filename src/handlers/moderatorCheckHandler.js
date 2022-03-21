/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { Keyboard } = require('grammy');

const constants = require('../constants');
const messages = require('../messages');
const { jobService } = require('../services');

/**
 * @param {GrammyContext} ctx
 * @param {string} jobId
 * */
const publishHandler = async (ctx, jobId) => {
  await jobService.setModerated(jobId);

  const job = await jobService.getByIdForView(jobId);
  const { message_id: messageId } = await ctx.api.sendMessage(
    constants.channel.id,
    messages.shareJobFlow.publish(job),
    { parse_mode: 'HTML' },
  );

  await jobService.setDataForRemoving(jobId, messageId);
  await ctx.api.sendMessage(job.creatorId, messages.jobPublished);
};

/**
 * @param {GrammyContext} ctx
 * @param {string} jobId
 * */
const declineHandler = async (ctx, jobId) => {
  // notify creator
  const creatorId = await jobService.getCreatorId(jobId);
  const keyboard = new Keyboard()
    .text(messages.buttons.shareJob)
    .text(messages.buttons.report);
  await ctx.api.sendMessage(creatorId, messages.jobCanceled, {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: keyboard.build(),
    },
  });
};

/**
 * @param {GrammyContext} ctx
 * */
module.exports = (ctx) => {
  const payload = ctx.callbackQuery.data;

  const [type, jobId] = payload.split('|');

  switch (type) {
    case constants.payloads.publish:
      publishHandler(ctx, jobId);
      break;
    case constants.payloads.decline:
      declineHandler(ctx, jobId);
      break;

    default:
      ctx.reply(messages.error);
      break;
  }
};
