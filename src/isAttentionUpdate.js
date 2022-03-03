const config = require('./config');

module.exports = (anUpdate) =>
  config.keywords.some((aKeyword) =>
    anUpdate.message.message.includes(aKeyword),
  );
