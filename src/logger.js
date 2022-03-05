const { DateTime } = require('luxon');

function printLog(message) {
  console.log(
    `[${DateTime.now()
      .setZone('Europe/Kiev')
      .toFormat('yyyy-MM-dd HH:mm:ss')}] ${message}`,
  );
}

module.exports = {
  info: (message) => printLog(message),
  error: (message) => printLog(message),
};
