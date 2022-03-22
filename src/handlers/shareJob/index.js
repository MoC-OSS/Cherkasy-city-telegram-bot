/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard } = require('grammy');

const constants = require('../../constants');
const messages = require('../../messages');
const { jobService } = require('../../services');

/**
 * @param {GrammyContext} ctx
 * */
const initFlow = async (ctx) => {
  const jobId = await jobService.createNew(ctx.from.id);

  ctx.session.step = constants.steps.componyName;
  ctx.session.jobId = jobId;

  ctx.reply(messages.shareJobFlow.componyName);
};

/**
 * @param {GrammyContext} ctx
 * */
const componyName = async (ctx) => {
  ctx.session.step = constants.steps.jobName;

  await jobService.setComponyName(ctx.session.jobId, ctx.msg.text);
  ctx.reply(messages.shareJobFlow.jobName);
};

/**
 * @param {GrammyContext} ctx
 * */
const jobName = async (ctx) => {
  ctx.session.step = constants.steps.settlement;

  await jobService.setName(ctx.session.jobId, ctx.msg.text);
  ctx.reply(messages.shareJobFlow.settlement);
};

/**
 * @param {GrammyContext} ctx
 * */
const settlement = async (ctx) => {
  ctx.session.step = constants.steps.jobDescription;

  await jobService.setSettlement(ctx.session.jobId, ctx.msg.text);
  ctx.reply(messages.shareJobFlow.jobDescription);
};

/**
 * @param {GrammyContext} ctx
 * */
const jobDescription = async (ctx) => {
  ctx.session.step = constants.steps.contactData;

  await jobService.setDescription(ctx.session.jobId, ctx.msg.text);
  ctx.reply(messages.shareJobFlow.contactData);
};

/**
 * @param {GrammyContext} ctx
 * */
const contactData = async (ctx) => {
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
        .text(
          messages.buttons.cancel,
          `${constants.payloads.cancel}|${job.id}`,
        ),
    },
  );
  await jobService.setPreViewMessage(ctx.session.jobId, preViewMessageId);
};

module.exports = {
  initFlow,
  componyName,
  settlement,
  jobName,
  jobDescription,
  contactData,
};
