/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard } = require('grammy');

const constants = require('../../constants');
const messages = require('../../messages');
const moderatorCheckHandler = require('../moderatorCheckHandler');
const { jobService } = require('../../services');

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
  try {
    ctx.reply(messages.shareJobFlow.componyName, {
      parse_mode: 'HTML',
    });
  } catch {}
};

/**
 * @param {GrammyContext} ctx
 * */
const componyName = async (ctx) => {
  if (await beforeHandlerChecker(ctx, 1023))
    try {
      return ctx.reply(messages.shareJobFlow.componyName, {
        parse_mode: 'HTML',
      });
    } catch {}

  ctx.session.step = constants.steps.jobName;

  await jobService.setComponyName(ctx.session.jobId, ctx.msg.text);
  try {
    return ctx.reply(messages.shareJobFlow.jobName, {
      parse_mode: 'HTML',
    });
  } catch {}
};

/**
 * @param {GrammyContext} ctx
 * */
const jobName = async (ctx) => {
  try {
    if (await beforeHandlerChecker(ctx, 1023))
      return ctx.reply(messages.shareJobFlow.jobName, {
        parse_mode: 'HTML',
      });

    ctx.session.step = constants.steps.settlement;

    await jobService.setName(ctx.session.jobId, ctx.msg.text);
    return ctx.reply(messages.shareJobFlow.settlement, {
      parse_mode: 'HTML',
    });
  } catch {}
};

/**
 * @param {GrammyContext} ctx
 * */
const settlement = async (ctx) => {
  try {
    if (await beforeHandlerChecker(ctx, 1023))
      return ctx.reply(messages.shareJobFlow.settlement, {
        parse_mode: 'HTML',
      });

    ctx.session.step = constants.steps.jobDescription;

    await jobService.setSettlement(ctx.session.jobId, ctx.msg.text);
    return ctx.reply(messages.shareJobFlow.jobDescription, {
      parse_mode: 'HTML',
    });
  } catch {}
};

/**
 * @param {GrammyContext} ctx
 * */
const jobDescription = async (ctx) => {
  try {
    if (await beforeHandlerChecker(ctx, 2047))
      return ctx.reply(messages.shareJobFlow.jobDescription, {
        parse_mode: 'HTML',
      });

    ctx.session.step = constants.steps.jobSalary;

    await jobService.setDescription(ctx.session.jobId, ctx.msg.text);
    return ctx.reply(messages.shareJobFlow.jobSalary, {
      parse_mode: 'HTML',
    });
  } catch {}
};

/**
 * @param {GrammyContext} ctx
 * */
const jobSalary = async (ctx) => {
  try {
    if (await beforeHandlerChecker(ctx, 1023))
      return ctx.reply(messages.shareJobFlow.jobSalary, {
        parse_mode: 'HTML',
      });

    ctx.session.step = constants.steps.contactData;

    await jobService.setSalary(ctx.session.jobId, ctx.msg.text);
    return ctx.reply(messages.shareJobFlow.contactData, {
      parse_mode: 'HTML',
    });
  } catch {}
};

/**
 * @param {GrammyContext} ctx
 * */
const contactData = async (ctx) => {
  try {
    if (await beforeHandlerChecker(ctx, 1023))
      return ctx.reply(messages.shareJobFlow.contactData, {
        parse_mode: 'HTML',
      });
    ctx.session.step = constants.steps.preView;

    await jobService.setContact(ctx.session.jobId, ctx.msg.text);

    const job = await jobService.getById(ctx.session.jobId);

    const { message_id: preViewMessageId } = await ctx.reply(
      messages.shareJobFlow.preView(job),
      {
        parse_mode: 'HTML',
        one_time_keyboard: true,
        reply_markup: new InlineKeyboard()
          .text(
            messages.buttons.sendToModerator,
            `${constants.payloads.toModerator}|${job.id}`,
          )
          .row()
          .text(
            messages.buttons.cancel,
            `${constants.payloads.cancel}|${job.id}`,
          ),
      },
    );
    return jobService.setPreViewMessage(ctx.session.jobId, preViewMessageId);
  } catch {}
};

module.exports = {
  initFlow,
  componyName,
  settlement,
  jobName,
  jobDescription,
  jobSalary,
  contactData,
};
