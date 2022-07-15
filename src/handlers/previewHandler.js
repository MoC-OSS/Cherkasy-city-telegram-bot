const logger = require('../logger');
const messages = require('../messages');
const { jobService } = require('../services');
const constants = require('../constants');
const { InlineKeyboard } = require('grammy');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
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
