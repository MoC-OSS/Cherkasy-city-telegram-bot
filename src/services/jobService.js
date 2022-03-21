const {
  models: { jobsModel },
} = require('../db');
const constants = require('../constants');

module.exports = {
  getByIdForView: async (id) => {
    const job = await jobsModel.getById(id);
    return {
      id: job.id,
      countId: job.count_id,
      timestamp: new Date().toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      componyName: job.compony_name,
      settlement: job.settlement,
      jobName: job.name,
      jobDescription: job.description,
      contactData: job.contact,
      creatorId: job.creator_id,
    };
  },

  getCreatorId: async (jobId) => {
    const job = await jobsModel.getById(jobId);
    return job.creator_id;
  },

  getCountId: async (jobId) => {
    const job = await jobsModel.getById(jobId);
    return job.count_id;
  },

  createNew: async (creatorId) => {
    const job = await jobsModel.create(creatorId);
    return job.id;
  },

  setComponyName: (jobId, componyName) =>
    jobsModel.setValueById(jobId, {
      compony_name: componyName,
    }),

  setSettlement: (jobId, settlement) =>
    jobsModel.setValueById(jobId, {
      settlement,
    }),

  setName: (jobId, name) =>
    jobsModel.setValueById(jobId, {
      name,
    }),

  setDescription: (jobId, description) =>
    jobsModel.setValueById(jobId, {
      description,
    }),

  setContact: (jobId, contact) =>
    jobsModel.setValueById(jobId, {
      contact,
    }),

  setDataForRemoving: (jobId, messageId) => {
    const removeTime = new Date(new Date().getTime() + constants.removeTime);
    removeTime.setSeconds(0);
    removeTime.setMilliseconds(0);
    return jobsModel.setValueById(jobId, {
      published_message_id: messageId,
      deleted_time: removeTime,
    });
  },

  setModerated: (jobId) =>
    jobsModel.setValueById(jobId, {
      is_moderated: true,
    }),

  getForRemoving: async () => {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    return jobsModel.getValuesByTime(now);
  },
};
