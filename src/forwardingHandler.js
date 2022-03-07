const recipients = require('../recipients');
const isWorkingTime = require('./isWorkingTime');
const forwardMessages = require('./forwardMessage');

module.exports = (api, ids) => {
  recipients
    .filter(
      (aRecipient) =>
        !(aRecipient.sending_time && !isWorkingTime(aRecipient.sending_time)),
    )
    .forEach((aRecipient) => {
      forwardMessages(api, aRecipient.peer, ids);
    });
};
