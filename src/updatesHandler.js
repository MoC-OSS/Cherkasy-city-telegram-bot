const forwardMessage = require('./forwardMessage');

const isRedirectThisUpdates = require('./isRedirectThisUpdates');
const isWorkingTime = require('./isWorkingTime');

module.exports = (api, updateInfo) => {
  const redirectThisUpdates = isRedirectThisUpdates(updateInfo.updates);
  if (redirectThisUpdates.length && isWorkingTime()) {
    console.log('Found new messages for forwarding');
    redirectThisUpdates.forEach((anUpdate) => forwardMessage(api, anUpdate));
  }
};
