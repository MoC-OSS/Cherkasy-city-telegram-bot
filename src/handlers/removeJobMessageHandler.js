const { InlineKeyboard } = require('grammy');

const { jobService } = require('../services');
const constants = require('../constants');
const config = require('../config');
const messages = require('../messages');
const logger = require('../logger');

const handler = async (bot) => {
  const jobsForRemoving = await jobService.getForRemoving();

  jobsForRemoving.forEach(async (aJob) => {
    // remove from channel
    try {
      await bot.api.deleteMessage(config.channel.id, aJob.published_message_id);
    } catch (error) {
      logger.error('Happen error when try to delete job from channel');
      logger.error(error);
    }
    try {
      // notify job creator
      await bot.api.sendMessage(
        aJob.creator_id,
        messages.jobRePublished(aJob.count_id),
        {
          reply_to_message_id: aJob.preview_message_id,
          reply_markup: new InlineKeyboard()
            .text(
              messages.buttons.rePublish,
              `${constants.payloads.publish}|${aJob.id}`,
            )
            .row()
            .text(
              messages.buttons.noActual,
              `${constants.payloads.skip}|${aJob.id}`,
            ),
        },
      );
    } catch {}
  });
};

module.exports = handler;
