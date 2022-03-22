module.exports = Object.freeze({
  moderator: {
    // id: 5104831385,
    id: 5212508056,
  },
  bot: { url: 'https://t.me/cctb_demo_bot' },
  // channel: { id: -1001430758822 },
  channel: { id: -1001642795864, url: 'https://t.me/test1231231231233123123' },
  commands: {
    start: 'start',
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
