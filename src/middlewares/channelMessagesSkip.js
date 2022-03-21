module.exports = class ChannelMessagesSkipMiddleware {
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
      if (
        (ctx.update.inline_query &&
          ctx.update.inline_query.chat_type !== 'channel') ||
        (ctx.chat && ctx.chat.type !== 'channel')
      )
        return next();
    };
  }
};