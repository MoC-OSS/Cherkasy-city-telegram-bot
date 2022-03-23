/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const XLSX = require('xlsx');
const config = require('../config');
const messages = require('../messages');
const { jobService } = require('../services');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  if (ctx.from.id !== config.moderator.id) return ctx.reply(messages.default);

  // const allRecords = await jobService.getAllRecords();
  const data = [
    {
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      firstName: 'Smith',
      lastName: 'Peters',
    },
    {
      firstName: 'Alice',
      lastName: 'Lee',
    },
  ];
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Responses');
  XLSX.writeFile(wb, 'sampleData.export.xlsx');

  return ctx.reply(messages.default);
};
