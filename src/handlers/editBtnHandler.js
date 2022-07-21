/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard } = require('grammy');
const logger = require('../logger');
const messages = require('../messages');
const { jobService } = require('../services');
const constants = require('../constants');
const previewHandler = require('./previewHandler');
const sendToModerator = require('./sendToModerator');

/**
 * @param {GrammyContext} ctx
 * */

async function beforeHandlerChecker(ctx, length) {
  if (ctx.callbackQuery) {
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
      await sendToModerator(ctx, ctx.session.jobId);
      break;
    default:
      return ctx;
  }
}

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
