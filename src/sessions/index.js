const { RedisAdapter } = require('@satont/grammy-redis-storage');
const IORedis = require('ioredis');

const redisInstance = new IORedis('redis://localhost:6379');

const storage = new RedisAdapter({ instance: redisInstance });

module.exports = {
  initial: () => ({ step: 'idle' }),
  storage,
};
