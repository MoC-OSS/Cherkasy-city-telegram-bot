/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { Keyboard } = require('grammy');

const constants = require('../constants');
const config = require('../config');
const messages = require('../messages');
const { jobService } = require('../services');
const sendToModeratorHandler = require('./sendToModerator');
const cancelBtnHandler = require('./cancelBtnHandler');
const {
  editBtnHandler,
  editCityBtnHandler,
  editCompanyNameBtnHandler,
  editContactsBtnHandler,
  editDescriptionBtnHandler,
  editJobNameBtnHandler,
  editSalaryBtnHandler,
  endEditingBtnHandler,
} = require('./editBtnHandler');
const skipBtnHandler = require('./skipBtnHandler');
const closedBtnHandler = require('./closedBtnHandler');
const logger = require('../logger');

const spamStack = [];

/**
 * @param {GrammyContext} ctx
 * @param {string} jobId
 * */
const publishHandler = async (ctx, jobId) => {
  await jobService.setModerated(jobId);
  const job = await jobService.getById(jobId);
  const { message_id: messageId } = await ctx.api
    .sendMessage(config.channel.id, messages.shareJobFlow.publish(job), {
      parse_mode: 'HTML',
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });

  await jobService.setDataForRemoving(jobId, messageId);
  const keyboard = new Keyboard()
    .text(messages.buttons.shareJob)
    .row()
    .text(messages.buttons.help);
  await ctx.api
    .sendMessage(job.creatorId, messages.jobPublished(job.countId), {
      reply_to_message_id: job.previewMessageId,
      parse_mode: 'HTML',
      reply_markup: {
        one_time_keyboard: true,
        resize_keyboard: true,
        keyboard: keyboard.build(),
      },
    })
    .then(function (resp) {
      logger.log(resp);
    })
    .catch(function (error) {
      logger.error(error);
    });
  if (ctx.from.id === config.moderator.id) {
    await ctx
      .reply(messages.moderating.published(job.countId), {
        reply_to_message_id: ctx.update.callback_query.message.message_id,
      })
      .then(function (resp) {
        logger.log(resp);
      })
      .catch(function (error) {
        logger.error(error);
      });
  }
};

/**
 * @param {GrammyContext} ctx
 * @param {string} jobId
 * */
const declineHandler = async (ctx, jobId) => {
  // notify creator
  const job = await jobService.getById(jobId);
  const keyboard = new Keyboard()
    .text(messages.buttons.shareJob)
    .row()
    .text(messages.buttons.help);
  await ctx.api
    .sendMessage(job.creatorId, messages.jobCanceled(job.countId), {
      reply_to_message_id: job.previewMessageId,
      reply_markup: {
        one_time_keyboard: true,
        resize_keyboard: true,
        keyboard: keyboard.build(),
      },
    })
    .then(function (resp) {
      logger.log(resp);
    })
    .catch(function (error) {
      logger.error(error);
    });
  await ctx
    .reply(messages.moderating.declined(job.countId), {
      reply_to_message_id: ctx.update.callback_query.message.message_id,
    })
    .then(function (resp) {
      logger.log(resp);
    })
    .catch(function (error) {
      logger.error(error);
    });
};
/**
 * @param {GrammyContext} ctx
 * */
function spamChecker(ctx) {
  const fromUserId = ctx.from.id;

  if (spamStack.includes(fromUserId)) return false;

  spamStack.push(fromUserId);
  setTimeout(() => {
    const index = spamStack.indexOf(fromUserId);
    if (index >= 0) spamStack.splice(index, 1);
  }, 1000);
  return true;
}

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  if (!spamChecker(ctx)) return;
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
      try {
        await sendToModeratorHandler(ctx, jobId);
      } catch {}
      break;
    case constants.payloads.edit:
      await editBtnHandler(ctx, jobId);
      break;
    case constants.payloads.cancel:
      await cancelBtnHandler(ctx, jobId);
      break;
    case constants.payloads.skip:
      await skipBtnHandler(ctx, jobId);
      break;
    case constants.payloads.closed:
      await closedBtnHandler(ctx, jobId);
      break;
    case constants.payloads.editCompanyName:
      await editCompanyNameBtnHandler(ctx, jobId);
      break;
    case constants.payloads.editJobName:
      await editJobNameBtnHandler(ctx, jobId);
      break;
    case constants.payloads.editCity:
      await editCityBtnHandler(ctx, jobId);
      break;
    case constants.payloads.editDescription:
      await editDescriptionBtnHandler(ctx, jobId);
      break;
    case constants.payloads.editSalary:
      await editSalaryBtnHandler(ctx, jobId);
      break;
    case constants.payloads.editContacts:
      await editContactsBtnHandler(ctx, jobId);
      break;
    case constants.payloads.endEditing:
      await endEditingBtnHandler(ctx, jobId);
      break;

    default:
      try {
        ctx.reply(messages.error);
      } catch {}
      break;
  }
  try {
    await ctx.api.editMessageText(
      ctx.update.callback_query.from.id,
      ctx.update.callback_query.message.message_id,
      ctx.update.callback_query.message.text,
    );
  } catch {}
};
