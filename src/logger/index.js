const fs = require('fs');

function getMessage(args) {
  return args.reduce((previousValue, currentValue, index) => {
    const chunk =
      currentValue instanceof String
        ? currentValue
        : JSON.stringify(currentValue, null, 4);
    return index === 0 ? chunk : `${previousValue} ${chunk}`;
  }, '');
}

module.exports = {
  log: (...arg) => {
    fs.appendFileSync(
      `logs/${process.env.LOGS_FILE}.txt`,
      `[${new Date().toLocaleString()}] LOG: ${getMessage(arg)}\n`,
    );
  },
  error: (...arg) => {
    fs.appendFileSync(
      `logs/${process.env.LOGS_FILE}.txt`,
      `[${new Date().toLocaleString()}] ERROR: ${getMessage(arg)}\n`,
    );
  },
};
