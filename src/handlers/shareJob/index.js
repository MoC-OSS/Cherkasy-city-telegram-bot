/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard } = require('grammy');

const constants = require('../../constants');
const messages = require('../../messages');
const moderatorCheckHandler = require('../moderatorCheckHandler');
const { jobService } = require('../../services');
const logger = require('../../logger');

async function beforeHandlerChecker(ctx, length) {
  if (ctx.callbackQuery) {
    await moderatorCheckHandler(ctx);
    return true;
  }
  if (ctx.msg.text && ctx.msg.text.length >= length) return true;

  return false;
}

/**
 * @param {GrammyContext} ctx
 * */
const initFlow = async (ctx) => {
  const jobId = await jobService.createNew(ctx.from.id);

  ctx.session.step = constants.steps.componyName;
  ctx.session.jobId = jobId;
  ctx
    .reply(messages.shareJobFlow.componyName, {
      parse_mode: 'HTML',
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
const componyName = async (ctx) => {
  if (await beforeHandlerChecker(ctx, 1023))
    return ctx
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

  ctx.session.step = constants.steps.jobName;

  await jobService.setComponyName(ctx.session.jobId, ctx.msg.text);
  return ctx
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
};

/**
 * @param {GrammyContext} ctx
 * */
const jobName = async (ctx) => {
  if (await beforeHandlerChecker(ctx, 1023))
    return ctx
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

  ctx.session.step = constants.steps.settlement;

  await jobService.setName(ctx.session.jobId, ctx.msg.text);
  return ctx
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
};

/**
 * @param {GrammyContext} ctx
 * */
const settlement = async (ctx) => {
  if (await beforeHandlerChecker(ctx, 1023))
    return ctx
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

  ctx.session.step = constants.steps.jobDescription;

  await jobService.setSettlement(ctx.session.jobId, ctx.msg.text);
  return ctx
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
};

/**
 * @param {GrammyContext} ctx
 * */
const jobDescription = async (ctx) => {
  if (await beforeHandlerChecker(ctx, 2047))
    return ctx
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

  ctx.session.step = constants.steps.jobSalary;

  await jobService.setDescription(ctx.session.jobId, ctx.msg.text);
  return ctx
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
};

/**
 * @param {GrammyContext} ctx
 * */
const jobSalary = async (ctx) => {
  if (await beforeHandlerChecker(ctx, 1023))
    return ctx
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

  ctx.session.step = constants.steps.contactData;

  await jobService.setSalary(ctx.session.jobId, ctx.msg.text);
  return ctx
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
};

/**
 * @param {GrammyContext} ctx
 * */
const contactData = async (ctx) => {
  if (await beforeHandlerChecker(ctx, 1023))
    return ctx
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
  ctx.session.step = constants.steps.preView;

  await jobService.setContact(ctx.session.jobId, ctx.msg.text);
  await previewMessage(ctx);
};

/**
 * @param {GrammyContext} ctx
 * */
const previewMessage = async (ctx) => {
  const job = await jobService.getById(ctx.session.jobId);
  ctx.session.editUserType = 'client';

  const { message_id: preViewMessageId } = await ctx
    .reply(messages.shareJobFlow.preView(job), {
      parse_mode: 'HTML',
      one_time_keyboard: true,
      reply_markup: new InlineKeyboard()
        .text(
          messages.buttons.sendToModerator,
          `${constants.payloads.toModerator}|${job.id}`,
        )
        .row()
        .text(messages.buttons.edit, `${constants.payloads.edit}|${job.id}`)
        .row()
        .text(
          messages.buttons.cancel,
          `${constants.payloads.cancel}|${job.id}`,
        ),
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
  return jobService
    .setPreViewMessage(ctx.session.jobId, preViewMessageId)
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
};

const help = async (ctx) => {
  ctx.session.step = '';
  return ctx
    .reply(messages.shareJobFlow.help, {
      parse_mode: 'HTML',
    })
    .then(function (resp) {
      logger.log(resp);
      return resp;
    })
    .catch(function (error) {
      logger.error(error);
    });
};

module.exports = {
  initFlow,
  componyName,
  settlement,
  jobName,
  jobDescription,
  jobSalary,
  contactData,
  previewMessage,
  help,
};
