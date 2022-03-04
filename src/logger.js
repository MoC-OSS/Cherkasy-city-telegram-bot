const pino = require('pino');

module.exports = pino({
  prettyPrint: {
    colorize: true,
    crlf: true,
    levelFirst: true,
    timestampKey: 'time',
    translateTime: 'yyyy-MM-dd HH:mm:ss',
    ignore: 'pid,hostname',
  },
});
