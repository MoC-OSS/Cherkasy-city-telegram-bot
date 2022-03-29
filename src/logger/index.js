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
    console.log(
      '\x1b[34m',
      `[${new Date().toLocaleString()}] LOG: ${getMessage(arg)}`,
    );
  },
  error: (...arg) => {
    console.log(
      '\x1b[31m',
      `[${new Date().toLocaleString()}] ERROR: ${getMessage(arg)}`,
    );
  },
};
