const { DateTime } = require('luxon');

const config = require('./config');

const START_WORK = DateTime.fromISO(config.startWork).setZone('Europe/Kiev');
const END_WORK = DateTime.fromISO(config.endWork).setZone('Europe/Kiev');

module.exports = () => {
  const NOW = DateTime.now().setZone('Europe/Kiev');

  if (NOW.hour < 12) return NOW < END_WORK;

  return NOW > START_WORK;
};
