module.exports = {
  log: (data) => {
    const message = data instanceof String ? data : JSON.stringify(data);
    console.log('\x1b[34m', `[${new Date().toLocaleString()}] LOG: ${message}`);
  },
  error: (data) => {
    const message = data instanceof String ? data : JSON.stringify(data);

    console.log(
      '\x1b[31m',
      `[${new Date().toLocaleString()}] ERROR: ${message}`,
    );
  },
};
