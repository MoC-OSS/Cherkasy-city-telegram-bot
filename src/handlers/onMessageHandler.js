/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const { Keyboard } = require('grammy');

const messages = require('../messages');
const constants = require('../constants');
const { jobService } = require('../services');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  ctx.reply('onMessage handler');
};
