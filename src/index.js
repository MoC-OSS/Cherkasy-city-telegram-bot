const auth = require('./auth');
const logger = require('./logger');

logger.info('Start re-forwarding application');
auth();
logger.info('Application is listening new messages');
