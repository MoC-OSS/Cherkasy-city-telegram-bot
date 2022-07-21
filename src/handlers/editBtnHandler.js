/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard, Keyboard } = require('grammy');
const logger = require('../logger');
const messages = require('../messages');
const { jobService } = require('../services');
const constants = require('../constants');
const previewHandler = require('./previewHandler');
const config = require('../config');
const sendToModeratorHandler = require('./sendToModerator');
const cancelBtnHandler = require('./cancelBtnHandler');
const skipBtnHandler = require('./skipBtnHandler');
const closedBtnHandler = require('./closedBtnHandler');

const spamStack = [];

/**
 * @param {GrammyContext} ctx
 * @param {string} jobId
 * */

async function beforeHandlerChecker(ctx, length) {
  if (ctx.callbackQuery) {
    await moderatorCheckHandler(ctx);
    return true;
  }
  if (ctx.msg.text && ctx.msg.text.length >= length) return true;

  return false;
}

async function editBtnHandler(ctx, jobId) {
  const job = await jobService.getById(jobId);
  ctx.api
    .sendMessage(ctx.chat.id, messages.shareJobFlow.editPreView(job), {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text(
          messages.buttons.editJobName,
          `${constants.payloads.editJobName}|${jobId}`,
        )
        .row()
        .text(
          messages.buttons.editCompanyName,
          `${constants.payloads.editCompanyName}|${jobId}`,
        )
        .row()
        .text(
          messages.buttons.editCity,
          `${constants.payloads.editCity}|${jobId}`,
        )
        .row()
        .text(
          messages.buttons.editSalary,
          `${constants.payloads.editSalary}|${jobId}`,
        )
        .row()
        .text(
          messages.buttons.editDescription,
          `${constants.payloads.editDescription}|${jobId}`,
        )
        .row()
        .text(
          messages.buttons.editContacts,
          `${constants.payloads.editContacts}|${jobId}`,
        )
        .row()
        .text(
          messages.buttons.endEditing,
          `${constants.payloads.endEditing}|${jobId}`,
        ),
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
}

async function editCompanyNameBtnHandler(ctx) {
  ctx
    .reply(messages.shareJobFlow.componyName, {
      parse_mode: 'HTML',
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
  ctx.session.step = constants.steps.editJobField;
  ctx.session.fieldType = constants.payloads.editCompanyName;
  return ctx;
}
async function editJobNameBtnHandler(ctx) {
  ctx
    .reply(messages.shareJobFlow.jobName, {
      parse_mode: 'HTML',
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
  ctx.session.step = constants.steps.editJobField;
  ctx.session.fieldType = constants.payloads.editJobName;
  return ctx;
}
async function editCityBtnHandler(ctx) {
  ctx
    .reply(messages.shareJobFlow.settlement, {
      parse_mode: 'HTML',
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
  ctx.session.step = constants.steps.editJobField;
  ctx.session.fieldType = constants.payloads.editCity;
  return ctx;
}
async function editDescriptionBtnHandler(ctx) {
  ctx
    .reply(messages.shareJobFlow.jobDescription, {
      parse_mode: 'HTML',
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
  ctx.session.step = constants.steps.editJobField;
  ctx.session.fieldType = constants.payloads.editDescription;
  return ctx;
}
async function editSalaryBtnHandler(ctx) {
  ctx
    .reply(messages.shareJobFlow.jobSalary, {
      parse_mode: 'HTML',
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
  ctx.session.step = constants.steps.editJobField;
  ctx.session.fieldType = constants.payloads.editSalary;
  return ctx;
}

async function editContactsBtnHandler(ctx) {
  ctx
    .reply(messages.shareJobFlow.contactData, {
      parse_mode: 'HTML',
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
  ctx.session.step = constants.steps.editJobField;
  ctx.session.fieldType = constants.payloads.editContacts;
  return ctx;
}

/**
 * @param {GrammyContext} ctx
 * */
async function editJobField(ctx) {
  if (await beforeHandlerChecker(ctx, 1023)) {
    switch (ctx.session.fieldType) {
      case constants.payloads.editCompanyName:
        return editCompanyNameBtnHandler(ctx);
      case constants.payloads.editJobName:
        return editJobNameBtnHandler(ctx);
      case constants.payloads.editCity:
        return editCityBtnHandler(ctx);
      case constants.payloads.editDescription:
        return editDescriptionBtnHandler(ctx);
      case constants.payloads.editSalary:
        return editSalaryBtnHandler(ctx);
      case constants.payloads.editContacts:
        return editContactsBtnHandler(ctx);
    }
  }
  switch (ctx.session.fieldType) {
    case constants.payloads.editCompanyName:
      ctx.session.step = '';
      await jobService.setComponyName(ctx.session.jobId, ctx.msg.text);
      await editBtnHandler(ctx, ctx.session.jobId);
      break;
    case constants.payloads.editJobName:
      ctx.session.step = '';
      await jobService.setName(ctx.session.jobId, ctx.msg.text);
      await editBtnHandler(ctx, ctx.session.jobId);
      break;
    case constants.payloads.editCity:
      ctx.session.step = '';
      await jobService.setSettlement(ctx.session.jobId, ctx.msg.text);
      await editBtnHandler(ctx, ctx.session.jobId);
      break;
    case constants.payloads.editDescription:
      ctx.session.step = '';
      await jobService.setDescription(ctx.session.jobId, ctx.msg.text);
      await editBtnHandler(ctx, ctx.session.jobId);
      break;
    case constants.payloads.editSalary:
      ctx.session.step = '';
      await jobService.setSalary(ctx.session.jobId, ctx.msg.text);
      await editBtnHandler(ctx, ctx.session.jobId);
      break;
    case constants.payloads.editContacts:
      ctx.session.step = '';
      await jobService.setContact(ctx.session.jobId, ctx.msg.text);
      await editBtnHandler(ctx, ctx.session.jobId);
      break;
    default:
      await editBtnHandler(ctx, ctx.session.jobId);
      break;
  }
}

async function endEditingBtnHandler(ctx) {
  switch (ctx.session.editUserType) {
    case 'client':
      await previewHandler(ctx);
      break;
    case 'moderator':
      await sendToModeratorHandler(ctx, ctx.session.jobId);
      break;
    default:
      return ctx;
  }
}

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
moderatorCheckHandler = async (ctx) => {
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

module.exports = {
  editCityBtnHandler,
  editSalaryBtnHandler,
  editDescriptionBtnHandler,
  editCompanyNameBtnHandler,
  editJobNameBtnHandler,
  editContactsBtnHandler,
  endEditingBtnHandler,
  editBtnHandler,
  editJobField,
};
