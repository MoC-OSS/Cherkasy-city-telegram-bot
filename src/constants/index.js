const timeFrame = process.env.DELETION_TIME
  ? parseInt(process.env.DELETION_TIME, 10)
  : 48 * 60 * 60 - 300;

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
    editJobField: 'editJobField',
  },
  payloads: {
    closed: 'closed',
    toModerator: 'to_moderator',
    cancel: 'cancel',
    skip: 'skip',
    publish: 'job_mod_pub',
    decline: 'job_mod_dec',
    edit: 'edit_job',
    editCompanyName: 'edit_name',
    editJobName: 'edit_job_name',
    editCity: 'edit_city',
    editDescription: 'edit_description',
    editSalary: 'edit_salary',
    editContacts: 'edit_contacts',
    endEditing: 'end_editing',
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
