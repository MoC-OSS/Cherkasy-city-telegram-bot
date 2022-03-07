const auth = require('./auth');
const logger = require('./logger');
const server = require('./server');

logger.info('Start re-forwarding application');
auth();
server();
