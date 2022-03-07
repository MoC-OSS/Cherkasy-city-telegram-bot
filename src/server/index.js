const http = require('http');

const requestHandler = require('./requestHandler');

module.exports = () => {
  http.createServer(requestHandler).listen(3000, () => {
    console.log(`Server successfully started on port ${3000}`);
  });
};
