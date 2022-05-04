const timeFrame = process.env.DELETION_TIME
  ? parseInt(process.env.DELETION_TIME, 10)
  : 48 * 60 * 60 - 300 * 1000;

module.exports = Object.freeze({
  commands: {
    start: 'start',
    statistics: 'statistics',
  },
  onHandlers: {
    message: 'message',
    callback: 'callback_query:data',
  },
  steps: {
    componyName: 'componyName',
    settlement: 'settlement',
    jobName: 'jobName',
    jobDescription: 'jobDescription',
    jobSalary: 'jonSalary',
    contactData: 'contactData',
  },
  payloads: {
    toModerator: 'to_moderator',
    cancel: 'cancel',
    skip: 'skip',
    publish: 'job_mod_pub',
    decline: 'job_mod_dec',
  },
  // removeTime: 60 * 60 * 24 * 1000,
  removeTime: timeFrame * 1000,
  timeSettings: {
    ukraine: 'uk-UA',
    local: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Kiev',
    },
  },
});
