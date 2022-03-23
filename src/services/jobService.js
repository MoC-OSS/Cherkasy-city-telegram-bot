const {
  models: { jobsModel },
} = require('../db');
const constants = require('../constants');

module.exports = {
  getById: async (id) => {
    const job = await jobsModel.getById(id);
    return {
      id: job.id,
      creatorId: job.creator_id,
      countId: job.count_id,
      settlement: job.settlement,
      componyName: job.compony_name,
      jobName: job.name,
      jobDescription: job.description,
      jobSalary: job.salary,
      contactData: job.contact,
      publishedMessageId: job.published_message_id,
      previewMessageId: job.preview_message_id,
      timestamp: new Date().toLocaleString(
        constants.timeSettings.ukraine,
        constants.timeSettings.local,
      ),
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

  setSalary: (jobId, salary) =>
    jobsModel.setValueById(jobId, {
      salary,
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

  setPreViewMessage: (jobId, preViewMessageId) =>
    jobsModel.setValueById(jobId, {
      preview_message_id: preViewMessageId,
    }),

  getForRemoving: async () => {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    return jobsModel.getValuesByTime(now);
  },

  getAllRecords: () => jobsModel.getAllValues(),
};
