/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { Keyboard } = require('grammy');

const constants = require('../../constants');
const messages = require('../../messages');

/**
 * @param {GrammyContext} ctx
 * */
const initFlow = async (ctx) => {
  ctx.session.step = constants.steps.componyName;
  await ctx.reply(messages.shareJobFlow.componyName);
};

/**
 * @param {GrammyContext} ctx
 * */
const componyName = async (ctx) => {
  ctx.session.step = constants.steps.settlement;
  ctx.session.componyName = ctx.msg.text;
  ctx.reply(messages.shareJobFlow.settlement);
};

/**
 * @param {GrammyContext} ctx
 * */
const settlement = async (ctx) => {
  ctx.session.step = constants.steps.jobName;
  ctx.session.settlement = ctx.msg.text;
  ctx.reply(messages.shareJobFlow.jobName);
};

/**
 * @param {GrammyContext} ctx
 * */
const jobName = async (ctx) => {
  ctx.session.step = constants.steps.jobDescription;
  ctx.session.jobName = ctx.msg.text;
  ctx.reply(messages.shareJobFlow.jobDescription);
};

/**
 * @param {GrammyContext} ctx
 * */
const jobDescription = async (ctx) => {
  ctx.session.step = constants.steps.contactData;
  ctx.session.jobDescription = ctx.msg.text;
  ctx.reply(messages.shareJobFlow.contactData);
};

/**
 * @param {GrammyContext} ctx
 * */
const contactData = async (ctx) => {
  ctx.session.step = constants.steps.preView;
  ctx.session.contactData = ctx.msg.text;

  ctx.reply(
    messages.shareJobFlow.preView({
      ...ctx.session,
      timestamp: new Date().toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }),
    {
      parse_mode: 'HTML',
      one_time_keyboard: true,
      reply_markup: new Keyboard()
        .text(messages.buttons.sendToModerator)
        .text(messages.buttons.cancel),
    },
  );
};

module.exports = {
  initFlow,
  componyName,
  settlement,
  jobName,
  jobDescription,
  contactData,
};
