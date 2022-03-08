const recipients = require('../recipients');
const isWorkingTime = require('./isWorkingTime');
const forwardMessages = require('./forwardMessage');

function isRegionForRecipient(recipientRegions, messageRegions) {
  let result = false;
  recipientRegions.forEach((recipientRegion) => {
    if (messageRegions.includes(recipientRegion)) result = true;
  });
  return result;
}

function isForwardMessageToThisRecipient(api, aForwardObject) {
  recipients
    .filter(
      (aRecipient) =>
        !(aRecipient.sending_time && !isWorkingTime(aRecipient.sending_time)),
    )
    .filter(
      (aRecipient) =>
        !(
          aRecipient.regions &&
          !isRegionForRecipient(aRecipient.regions, aForwardObject.regions)
        ),
    )
    .forEach((aRecipient) => {
      forwardMessages(api, aRecipient.peer, aForwardObject.id);
    });
}

module.exports = (api, forwardObjects) => {
  forwardObjects.forEach((aForwardObject) =>
    isForwardMessageToThisRecipient(api, aForwardObject),
  );
};
