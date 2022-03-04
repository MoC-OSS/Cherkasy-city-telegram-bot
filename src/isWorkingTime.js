const { DateTime } = require('luxon');

module.exports = ({ from, to }) => {
  const FROM = DateTime.fromObject(from, { zone: 'Europe/Kiev' });
  const TO = DateTime.fromObject(to, { zone: 'Europe/Kiev' });
  const NOW = DateTime.now().setZone('Europe/Kiev');

  if (NOW.hour < 12) return NOW < TO;
  return NOW > FROM;
};
