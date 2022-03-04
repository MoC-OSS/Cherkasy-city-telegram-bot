const recipients = require('../recipients.json');
const isWorkingTime = require('./isWorkingTime');
const forwardMessages = require('./forwardMessage');

module.exports = (api, redirectThisUpdates) => {
  recipients
    .filter(
      (aRecipient) =>
        !(aRecipient.sending_time && !isWorkingTime(aRecipient.sending_time)),
    )
    .forEach((aRecipient) => {
      forwardMessages(api, aRecipient.peer, redirectThisUpdates);
    });
};
