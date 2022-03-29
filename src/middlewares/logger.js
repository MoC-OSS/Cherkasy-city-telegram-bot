const logger = require('../logger');

module.exports = class LoggerMiddleware {
  /**
   * @param {Bot} bot
   * */
  constructor(bot) {
    this.bot = bot;
  }

  /**
   * Global middleware.
   * Checks some bot information and updates the session
   * */
  // eslint-disable-next-line class-methods-use-this
  middleware() {
    /**
     * @param {GrammyContext} ctxe
     * @param {Next} next
     * */
    // eslint-disable-next-line consistent-return
    return async (ctx, next) => {
      logger.log(
        `NEW EVENT FROM: ${ctx?.from?.id} | ${
          ctx.from?.username ||
          `${ctx.from?.first_name || ''} ${ctx.from?.last_name || ''}` ||
          `${JSON.stringify(ctx.from, null, 4)}`
        }`,
      );
      if (ctx.update && ctx.update.message && ctx.update.message.text)
        logger.log(
          'MESSAGE:',
          ctx.update.message.text.length < 20
            ? ctx.update.message.text
            : `${ctx.update.message.text.substring(0, 20)}...`,
        );
      return next();
    };
  }
};
