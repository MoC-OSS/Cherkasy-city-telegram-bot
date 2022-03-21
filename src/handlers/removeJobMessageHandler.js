const { jobService } = require('../services');
const constants = require('../constants');
const messages = require('../messages');

const handler = async (bot) => {
  const jobsForRemoving = await jobService.getForRemoving();

  jobsForRemoving.forEach(async (aJob) => {
    // remove from channel
    try {
      await bot.api.deleteMessage(
        constants.channel.id,
        aJob.published_message_id,
      );
    } catch (error) {
      console.log('Happen error when try to delete job from channel', error);
    }
    // notify job creator
    await bot.api.sendMessage(aJob.creator_id, messages.jobRePublished);
  });

  console.log(jobsForRemoving);
};

module.exports = handler;
