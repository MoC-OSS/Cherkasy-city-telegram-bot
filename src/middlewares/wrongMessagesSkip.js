module.exports = class WrongMessagesSkipMiddleware {
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
      const isPrivateChat = ctx.chat && ctx.chat.type === 'private';

      const isMessageUpdate = !!(ctx.update && ctx.update.message);

      const isCallBackQueryUpdate = !!(ctx.update && ctx.update.callback_query);

      if (isPrivateChat && (isMessageUpdate || isCallBackQueryUpdate))
        return next();
    };
  }
};
