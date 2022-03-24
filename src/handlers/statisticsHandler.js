/**
 * @typedef { import("grammy").Context } GrammyContext
 */

const XLSX = require('xlsx');
const { InputFile } = require('grammy');

const config = require('../config');
const messages = require('../messages');
const { jobService } = require('../services');

/**
 * @param {GrammyContext} ctx
 * */
module.exports = async (ctx) => {
  if (ctx.from.id !== config.moderator.id) return ctx.reply(messages.default);

  const records = await jobService.getAllRecords();

  const data = records.map((aRecord) => ({
    'Номер вакансії': aRecord.count_id,
    'Назва компанії': aRecord.compony_name,
    'Назва вакансії': aRecord.name,
    'Населений пункт': aRecord.settlement,
    'Заробітна плата': aRecord.salary,
    'Опис вакансії': aRecord.description,
    'Контактні дані': aRecord.contact,
    Опубліковано: aRecord.is_moderated ? 'Так' : 'Ні',
    'Час публікації': aRecord.published_time || '',
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Responses');
  const wbOpts = { bookType: 'xlsx', type: 'buffer' };
  const resp = XLSX.write(wb, wbOpts); // write workbook buffer

  return ctx.replyWithDocument(
    new InputFile(resp, `${new Date().toISOString()}.xlsx`),
  );
};
