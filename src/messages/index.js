const constants = require('../constants');
const config = require('../config');

module.exports = Object.freeze({
  welcome:
    'Привіт! Я employer_ck бот. Я допоможу тобі розмістити актуальні вакансії' +
    ' і прослідкую за тим, щоб вони з’явилися в нашому Telegram-каналі' +
    ' якомога швидше. Для розміщення вашої вакансії натисніть кнопку ' +
    '"Розмістити вакансію"',
  default:
    'Для розміщення вашої вакансії натисніть кнопку "Розмістити вакансію"',
  buttons: {
    shareJob: 'Розмістити вакансію',
    sendToModerator: 'Надіслати на модерацію',
    cancel: 'Відхилити',
    rePublish: 'Розмістити повторно',
    noActual: 'Вакансія не актуальна',
    publish: 'Опублікувати',
    decline: 'Відхилити',
  },
  shareJobFlow: {
    componyName:
      'Введіть назву компанії. Назва повинна бути без лапок і без ' +
      'форми власності, наприклад, Редактор, Сидоров Г.К., ФОП.',
    settlement: 'Введіть населений пункт, в якому розташовано робоче місце',
    jobName: 'Вкажіть назву вакансії',
    jobDescription:
      'Опишіть вашу вакансію: вкажіть основні посадові обов’язки, ' +
      'вимоги до працівника, графік роботи' +
      ' та іншу вагому інформацію. Ви також можете додати релевантні' +
      ' активні посилання та #хештеги.',
    jobSalary: 'Вкажіть розмір заробітньої плати',
    contactData:
      'Вкажіть контактні дані роботодавця: номер телефону,' +
      ' адреса електронної пошти, за бажанням контактну особу.',
    preView: (data) =>
      '<b>Попередній вигляд вакансії</b>\n\n' +
      `<b>${data.jobName.toUpperCase()}</b>\n` +
      `<b>${data.componyName}</b>\n` +
      `<b>#${data.countId}</b>\n\n` +
      `<b>⛳ Населений пункт:</b> ${data.settlement}\n\n` +
      `<b>💰 Заробітна плата:</b> ${data.jobSalary}\n\n` +
      `<b>✏️ Опис вакансії:</b>\n${data.jobDescription}\n\n` +
      `<b>📞 Контактні дані:</b> ${data.contactData}\n\n` +
      '❗️ Шукаєте працівників? Діліться актуальними вакансіями в цьому каналі' +
      ` за допомогою <a href="${config.bot.url}">чат-боту</a>` +
      ' від Черкаської ОДА!\n\n' +
      `${data.timestamp}`,
    publish: (data) =>
      `<b>${data.jobName.toUpperCase()}</b>\n` +
      `<b>${data.componyName}</b>\n` +
      `<b>#${data.countId}</b>\n\n` +
      `<b>⛳ Населений пункт:</b> ${data.settlement}\n\n` +
      `<b>💰 Заробітна плата:</b> ${data.jobSalary}\n\n` +
      `<b>✏️ Опис вакансії:</b>\n${data.jobDescription}\n\n` +
      `<b>📞 Контактні дані:</b> ${data.contactData}\n\n` +
      '❗️ Шукаєте працівників? Діліться актуальними вакансіями в цьому каналі' +
      ` за допомогою <a href="${config.bot.url}">чат-боту</a>` +
      ' від Черкаської ОДА!\n\n' +
      `${data.timestamp}`,
  },
  moderating: {
    sendToModerator: (countId) =>
      `Дякуємо, ваша вакансія #${countId} відправлена на модерацію.` +
      ' Як тільки вона буде підтверджена, ви отримаєте повідомлення.',
    request: 'Запит на модерацію',
    declined: (countId) => `Дякуємо, вакансія #${countId} була відхилена!`,
    published: (countId) =>
      `Дякуємо, вакансія #${countId} була успішно опублікована!`,
  },
  error:
    'Схоже сталось помилка, натисніть будь ласка /start,' +
    ' щоб розпочати з початку.',
  jobRePublished: (countId) =>
    `Привіт! Ваша вакансія #${countId} була видалена через 48 годин з моменту` +
    ' публікації. Якщо бажаєте розмістити її повторно, натисніть, будь ласка,' +
    ' кнопку "Розмістити повторно".',
  jobPublished: (countId) =>
    `Ваша вакансія #${countId} була успішно розміщена в нашому ` +
    `<a href="${constants.channel.url}">Telegram-каналі</a>`,
  jobCanceled: (countId) =>
    `На жаль, ваша вакансія #${countId} не пройшла процес модерації.` +
    ' Якщо бажаєте спробувати знову натисніть кнопку “Розмістити вакансію”.',
});
