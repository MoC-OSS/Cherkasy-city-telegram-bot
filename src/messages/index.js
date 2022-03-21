const constants = require('../constants');

module.exports = Object.freeze({
  welcome:
    'Привіт! Я employer_ck бот. Я допоможу тобі розмістити актуальні вакансії' +
    ' і прослідкую за тим, щоб вони з’явилися в нашому Telegram-каналі' +
    ' якомога швидше. Для розміщення вашої вакансії натисніть кнопку ' +
    '"Розмістити вакансію"',
  buttons: {
    shareJob: 'Розмістити вакансію',
    sendToModerator: 'Надіслати на модерацію',
    cancel: 'Відхилити',
    publish: 'Опублікувати',
    decline: 'Відхилити',
  },
  shareJobFlow: {
    componyName:
      'Введіть назву компанії. Назва повинна бути без лапок і без ' +
      'форми власності, наприклад, Реактор, Сидоров Г.К., ФОП.',
    settlement: 'Введіть населений пункт, в якому розташовано робоче місце',
    jobName: 'Вкажіть назву вакансії',
    jobDescription:
      'Опишіть вашу вакансію: вкажіть основні посадові обов’язки, ' +
      'вимоги до працівника, рівень заробітної плати, графік роботи' +
      ' і іншу вагому інформацію. Ви також можете добавити релевантні' +
      ' активні посилання та хештеги',
    contactData:
      'Вкажіть контактні дані роботодавця: номер телефону,' +
      ' адреса електронної пошти, за бажанням контактну особу',
    preView: (data) =>
      '<b>Попередній вигляд вакансії</b>\n\n' +
      `<b>Номер вакансії:</b> ${data.countId}\n\n` +
      `<b>Дата і час публікації:</b> ${data.timestamp}\n\n` +
      `<b>Назва компанії:</b> ${data.componyName}\n\n` +
      `<b>Населений пункт:</b> ${data.settlement}\n\n` +
      `<b>Назва вакансії:</b> ${data.jobName}\n\n` +
      `<b>Опис вакансії:</b> ${data.jobDescription}\n\n` +
      `<b>Контактні дані роботодавця:</b> ${data.contactData}`,
    publish: (data) =>
      `<b>Номер вакансії:</b> ${data.countId}\n\n` +
      `<b>Дата і час публікації:</b> ${data.timestamp}\n\n` +
      `<b>Назва компанії:</b> ${data.componyName}\n\n` +
      `<b>Населений пункт:</b> ${data.settlement}\n\n` +
      `<b>Назва вакансії:</b> ${data.jobName}\n\n` +
      `<b>Опис вакансії:</b> ${data.jobDescription}\n\n` +
      `<b>Контактні дані роботодавця:</b> ${data.contactData}\n\n\n` +
      'Шукаєте працівників? Можете розмістити свою вакансію в цьому каналі' +
      ` за допомогою офіційного <a href="${constants.bot.url}">` +
      'боту Черкаської ОДА</a>',
  },
  moderating: {
    sendToModerator:
      'Дякуємо, ваша вакансія відправлена на модерацію.' +
      ' Як тільки вона буде підтверджена, ви отримаєте повідомлення',
    request: 'Запит на модерацію',
  },
  error:
    'Схоже сталось помилка, натисніть будь ласка /start,' +
    ' щоб розпочати з початку',
  jobRePublished:
    'Ваша вакансія була видалена після 48 годин, якщо бажаєте опублікувати' +
    ' її знов будь ласка натисність відповідну кнопку',
  jobPublished: (countId) =>
    `Ваша вакансія #${countId} була успішно розміщена в нашому` +
    ` <a href="${constants.channel.url}">Telegram-каналі</a>`,
  jobCanceled: (countId) =>
    `На жаль, ваша вакансія #${countId} не пройшла процес модерації.` +
    ' Якщо бажаєте спробувати знову натисніть кнопку “Розмістити вакансію”',
});
