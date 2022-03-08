const forwardingHandler = require('../forwardingHandler');
const api = require('../api');

function forward(req, res) {
  res.end();
  forwardingHandler(api, req.body.forwardObject);
}

function notFound(req, res) {
  res.statusCode = 404;
  res.write({
    code: 404,
    message: 'page not found',
  });
  res.end();
}

module.exports = {
  forward,
  notFound,
};
