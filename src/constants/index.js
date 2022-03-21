module.exports = Object.freeze({
  moderator: {
    id: 5104831385,
  },
  bot: { url: 'https://t.me/cctb_demo_bot' },
  // channel: { id: -1001430758822 },
  channel: { id: -1001642795864, url: 'https://t.me/test1231231231233123123' },
  commands: {
    start: 'start',
  },
  onHandlers: {
    message: 'message',
  },
  steps: {
    componyName: 'componyName',
    settlement: 'settlement',
    jobName: 'jobName',
    jobDescription: 'jobDescription',
    contactData: 'contactData',
  },
  payloads: {
    publish: 'job_mod_pub',
    decline: 'job_mod_dec',
  },
  // removeTime: 60 * 60 * 24 * 1000,
  removeTime: 3 * 60 * 1000,
});
