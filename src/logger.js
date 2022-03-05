const { DateTime } = require('luxon');

function printLog(message) {
  console.log(
    `[${DateTime.now()
      .setZone('Europe/Kiev')
      .toFormat('yyyy-mm-dd HH:MM:ss')}] ${JSON.stringify(message)}`,
  );
}

module.exports = {
  info: (message) => printLog(message),
  error: (message) => printLog(message),
};
