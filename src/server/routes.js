const controllers = require('./controllers');

module.exports = (req, res) => {
  const { pathname, method } = req;

  if (pathname === '/forward' && method === 'POST')
    return controllers.forward(req, res);

  return controllers.notFound(req, res);
};
