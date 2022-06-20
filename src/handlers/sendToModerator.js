/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { InlineKeyboard, Keyboard } = require('grammy');

const messages = require('../messages');
const constants = require('../constants');
const config = require('../config');
const { jobService } = require('../services');
const logger = require('../logger');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx, jobId) => {
  const job = await jobService.getById(jobId);
  const keyboard = new Keyboard()
    .text(messages.buttons.shareJob)
    .row()
    .text(messages.buttons.help);
  // ctx.session.editUserType = 'moderator';
  await ctx
    .reply(messages.moderating.sendToModerator(job.countId), {
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        keyboard: keyboard.build(),
      },
    })
    .then(function (resp) {
      logger.log(resp);
    })
    .catch(function (error) {
      logger.error(error);
    });

  logger.log(`send job ${job.countId} to moderator`);

  await ctx.api
    .sendMessage(
      config.moderator.id,
      `${messages.moderating.request(
        `@${ctx.from?.username},`,
      )}\n\n${messages.shareJobFlow.modPreView(job)}`,
      {
        parse_mode: 'HTML',
        reply_markup: new InlineKeyboard()
          .text(
            messages.buttons.publish,
            `${constants.payloads.publish}|${jobId}`,
          )
          // .row()
          // .text(messages.buttons.edit, `${constants.payloads.edit}|${jobId}`)
          .row()
          .text(
            messages.buttons.decline,
            `${constants.payloads.decline}|${jobId}`,
          ),
      },
    )
    .then(function (resp) {
      logger.log(resp);
    })
    .catch(function (error) {
      logger.error(error);
    });
};
