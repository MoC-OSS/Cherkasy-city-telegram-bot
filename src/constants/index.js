module.exports = Object.freeze({
  channel: { id: -1001642795864, url: 'https://t.me/test1231231231233123123' },
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
  removeTime: 3 * 60 * 1000,
  timeSettings: {
    ukraine: 'uk-UA',
    local: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  },
});
