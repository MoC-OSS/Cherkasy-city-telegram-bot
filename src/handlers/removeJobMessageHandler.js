const { InlineKeyboard } = require('grammy');

const { jobService } = require('../services');
const constants = require('../constants');
const config = require('../config');
const messages = require('../messages');
const logger = require('../logger');

async function jobRemoved(bot, job) {
  // notify job creator
  await bot.api
    .sendMessage(job.creator_id, messages.jobRePublished(job.count_id), {
      reply_to_message_id: job.preview_message_id,
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text(
          messages.buttons.rePublish,
          `${constants.payloads.publish}|${job.id}`,
        )
        .row()
        .text(
          messages.buttons.noActual,
          `${constants.payloads.skip}|${job.id}`,
        )
        .row()
        .text(
          messages.buttons.closed,
          `${constants.payloads.closed}|${job.id}`,
        ).row()
        .text(
          messages.buttons.edit,
          `${constants.payloads.edit}|${job.id}`,
        ),
    })
    .then(function (resp) {
      logger.log(resp);
    })
    .catch(function (error) {
      logger.error(error);
    });
}

async function deletionHandler(bot) {
  const jobsForRemoving = await jobService.getForRemoving();

  jobsForRemoving.forEach(async (aJob) => {
    // remove from channel
    try {
      await bot.api.deleteMessage(config.channel.id, aJob.published_message_id);
      logger.log(
        `DELETING FROM CHANNEL ${config.channel.id} MESSAGE ${aJob.published_message_id}. [${aJob}]`,
      );
    } catch (error) {
      logger.error('Happen error when try to delete job from channel');
      logger.error(error);
    }
    jobRemoved(bot, aJob);
  });

}



module.exports = {
  deletionHandler,
  jobRemoved
};