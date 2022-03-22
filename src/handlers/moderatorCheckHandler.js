/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { Keyboard } = require('grammy');

const constants = require('../constants');
const messages = require('../messages');
const { jobService } = require('../services');
const sendToModeratorHandler = require('./sendToModerator');
const cancelBtnHandler = require('./cancelBtnHandler');

/**
 * @param {GrammyContext} ctx
 * @param {string} jobId
 * */
const publishHandler = async (ctx, jobId) => {
  await jobService.setModerated(jobId);

  const job = await jobService.getById(jobId);
  const { message_id: messageId } = await ctx.api.sendMessage(
    constants.channel.id,
    messages.shareJobFlow.publish(job),
    { parse_mode: 'HTML' },
  );

  await jobService.setDataForRemoving(jobId, messageId);
  const keyboard = new Keyboard().text(messages.buttons.shareJob);
  await ctx.api.sendMessage(job.creatorId, messages.jobPublished(job.countId), {
    reply_to_message_id: job.previewMessageId,
    parse_mode: 'HTML',
    reply_markup: {
      one_time_keyboard: true,
      resize_keyboard: true,
      keyboard: keyboard.build(),
    },
  });
  await ctx.reply(messages.moderating.published(job.countId), {
    reply_to_message_id: ctx.update.callback_query.message.message_id,
  });
};

/**
 * @param {GrammyContext} ctx
 * @param {string} jobId
 * */
const declineHandler = async (ctx, jobId) => {
  // notify creator
  const job = await jobService.getById(jobId);
  const keyboard = new Keyboard().text(messages.buttons.shareJob);
  await ctx.api.sendMessage(job.creatorId, messages.jobCanceled(job.countId), {
    reply_to_message_id: job.previewMessageId,
    reply_markup: {
      one_time_keyboard: true,
      resize_keyboard: true,
      keyboard: keyboard.build(),
    },
  });
  await ctx.reply(messages.moderating.declined(job.countId), {
    reply_to_message_id: ctx.update.callback_query.message.message_id,
  });
};

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  const payload = ctx.callbackQuery.data;

  const [type, jobId] = payload.split('|');

  switch (type) {
    case constants.payloads.publish:
      await publishHandler(ctx, jobId);
      break;
    case constants.payloads.decline:
      await declineHandler(ctx, jobId);
      break;
    case constants.payloads.toModerator:
      await sendToModeratorHandler(ctx, jobId);
      break;
    case constants.payloads.cancel:
      await cancelBtnHandler(ctx, jobId);
      break;

    default:
      ctx.reply(messages.error);
      break;
  }

  await ctx.api.editMessageText(
    ctx.update.callback_query.from.id,
    ctx.update.callback_query.message.message_id,
    ctx.update.callback_query.message.text,
  );
};
