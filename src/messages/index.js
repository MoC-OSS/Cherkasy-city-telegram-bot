const config = require('../config');
const signature = process.env.SIGNATURE ? ' ' + process.env.SIGNATURE : '';

module.exports = Object.freeze({
  welcome: process.env.GREET_MSG
    ? process.env.GREET_MSG
    : `Привіт. Це чатбот для бізнесу, який спрощує процес опису <b>вакансій і допомагає</b> їм оперативно з'явитися в Telegram-каналі <a href="${config.channel.url}">${config.channel.name}</a>. \n\nДля цього вам необхідно буде послідовно заповнити наступні поля:\n1. Назва компанії роботодавця\n2. Назва вакансії\n3. Населений пункт, в якому розташоване робоче місце\n4. Короткий опис вакансії\n5. Розмір заробітньої плати\n6. Контактні дані роботодавця\n\nПісля цього ваша вакансія відправиться на модерацію і буде опублікована у Телеграм-каналі <a href="${config.channel.url}">${config.channel.name}</a>\n<b>Готові? Натискайте "Розмістити вакансію"</b>`,
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
    closed: 'Вакансія закрита',
    edit: 'Редагувати вакансію',
    editCompanyName: 'Змінити назву підприємства',
    editJobName: 'Змінити назву вакансії',
    editCity: 'Змінити назву міста',
    editDescription: 'Змінити опис вакансії',
    editSalary: 'Змінити заробітню плату',
    editContacts: 'Змінити контакти',
    endEditing: 'Закінчити редагування',
    help: "Зв'язатися з командою",
  },
  shareJobFlow: {
    help: `Для того щоб отримати допомогу зверніться до модератора: @${config.moderator.username}`,
    componyName:
      'Назва підприємства \n(<i>наприклад, Салон краси "Beauty Zone", ФОП Карпенко О. Л. тощо</i>)',
    settlement:
      'Населений пункт, у якому розташоване робоче місце \n(<i>наприклад, м. Канів, смт. Ірдинь тощо</i>)',
    jobName:
      'Назва вакансії \n(<i>наприклад, майстер манікюру, пекар тощо</i>)',
    jobDescription: `Опис вакансії\n(<i>основні посадові обов'язки, вимоги до працівника, графік роботи та інша важлива інформація. Для більшої інформативності та зручності пошуку, ви можете додати активні посилання та #хештеги</i>)`,
    jobSalary:
      'Розмір заробітньої плати \n(<i>наприклад, 15 000 грн, договірна тощо</i>)',
    contactData: `Ваші контактні дані для зв'язку кандидатів з вами:\n(<i>номер телефону, ім'я контактної особи, електронна пошта наприклад: +380956784398, Світлана, svitlana_recruitment@gmail.com</i>)`,
    preView: (data) =>
      `Ваша вакансія матиме такий вигляд. Якщо усі дані введено коректно, ви можете <b>відправити допис на модерацію</b>.\nПісля перевірки модератора <b>ваша вакансія буде або опублікована, або відхилена з певних причин</b>, про що ви отримаєте сповіщення.\nЯкщо дані введено некоректно, ви можете <b>редагувати вакансію</b> або <b>відхилити</b>.\n\n` +
      `<b>${data.jobName.toUpperCase()}</b>\n` +
      `<b>${data.componyName}</b>\n` +
      `<b>#${data.countId}</b>\n\n` +
      `<b>⛳ Населений пункт:</b> ${data.settlement}\n\n` +
      `<b>💰 Заробітна плата:</b> ${data.jobSalary}\n\n` +
      `<b>✏️ Опис вакансії:</b>\n${data.jobDescription}\n\n` +
      `<b>📞 Контактні дані:</b> ${data.contactData}\n\n` +
      `<b>Дата/час розміщення вакансії:</b> ${data.timestamp}\n\n` +
      '❗️ Шукаєте працівників? Пропонуйте актуальні вакансії в цьому каналі' +
      ` за допомогою Telegram боту @${config.bot.url}` +
      ` "${config.bot.name}".\nTelegram бот створено командою` +
      ' Master of Code Global' +
      signature,
    modPreView: (data) =>
      `<b>${data.jobName.toUpperCase()}</b>\n` +
      `<b>${data.componyName}</b>\n` +
      `<b>#${data.countId}</b>\n\n` +
      `<b>⛳ Населений пункт:</b> ${data.settlement}\n\n` +
      `<b>💰 Заробітна плата:</b> ${data.jobSalary}\n\n` +
      `<b>✏️ Опис вакансії:</b>\n${data.jobDescription}\n\n` +
      `<b>📞 Контактні дані:</b> ${data.contactData}\n\n` +
      `<b>Дата/час розміщення вакансії:</b> ${data.timestamp}\n\n` +
      '❗️ Шукаєте працівників? Пропонуйте актуальні вакансії в цьому каналі' +
      ` за допомогою Telegram боту @${config.bot.url}` +
      ` "${config.bot.name}".\nTelegram бот створено командою` +
      ' Master of Code Global' +
      signature,
    editPreView: (data) =>
      `<b>${data.jobName.toUpperCase()}</b>\n` +
      `<b>${data.componyName}</b>\n` +
      `<b>#${data.countId}</b>\n\n` +
      `<b>⛳ Населений пункт:</b> ${data.settlement}\n\n` +
      `<b>💰 Заробітна плата:</b> ${data.jobSalary}\n\n` +
      `<b>✏️ Опис вакансії:</b>\n${data.jobDescription}\n\n` +
      `<b>📞 Контактні дані:</b> ${data.contactData}\n\n` +
      `<b>Дата/час розміщення вакансії:</b> ${data.timestamp}\n\n` +
      'За допомогою кнопок оберіть який пункт вакансії буде відредаговано.',
    publish: (data) =>
      `<b>${data.jobName.toUpperCase()}</b>\n` +
      `<b>${data.componyName}</b>\n` +
      `<b>#${data.countId}</b>\n\n` +
      `<b>⛳ Населений пункт:</b> ${data.settlement}\n\n` +
      `<b>💰 Заробітна плата:</b> ${data.jobSalary}\n\n` +
      `<b>✏️ Опис вакансії:</b>\n${data.jobDescription}\n\n` +
      `<b>📞 Контактні дані:</b> ${data.contactData}\n\n` +
      `${data.timestamp}\n\n` +
      '❗️ Шукаєте працівників? Діліться актуальними вакансіями в цьому каналі' +
      ` за допомогою Telegram боту @${config.bot.url}` +
      ` "${config.bot.name}".\nTelegram бот створено командою` +
      ' Master of Code Global' +
      signature,
  },
  moderating: {
    sendToModerator: (countId) =>
      `Ваша вакансія #${countId} відправлена на модерацію. Ви отримаєте повідомлення про її підтвердження або відхилення.`,
    request: (from) => `Запит на модерацію від ${from}`,
    declined: (countId) => `Вакансія #${countId} була відхилена.`,
    userDeclined: (countId) =>
      `Ви відхилили вакансію #${countId}.\nЯкщо бажаєте спробувати знову натисніть кнопку “Розмістити вакансію”.`,
    published: (countId) =>
      `Дякуємо, вакансія #${countId} була успішно опублікована!`,
  },
  error:
    'Схоже сталось помилка, натисніть будь ласка /start,' +
    ' щоб розпочати з початку.',
  jobRePublished: (countId) =>
    `Вітаємо! За правилами бота Ваша вакансія #${countId} була видалена через 48 годин` +
    ' з моменту публікації. Якщо бажаєте розмістити її повторно, натисніть' +
    ' кнопку "Розмістити повторно". Якщо вакансія більше не актуальна, натисніть кнопку "Вакансія не актуальна".' +
    `\n\nЗалиште, будь ласка, Ваш відгук про користування чат-ботом, щоб ми могли підвищити його ефективність роботи і покращити загальний процес взаємодії з ботом.
    \n<a href="https://docs.google.com/forms/d/e/1FAIpQLSfYIJKKIqu_7cLziWTrvCWS-WiuFSl3lQ3dENI515sEvGweHw/viewform">Посилання на форму.</a>`,
  jobPublished: (countId) =>
    `Ваша вакансія #${countId} була <b>підтверджена</b> та розміщена у ` +
    `<a href="${config.channel.url}">Telegram-каналі</a>`,
  jobCanceled: (countId) =>
    `На жаль, ваша вакансія #${countId} не пройшла процес модерації.` +
    ' Якщо бажаєте спробувати знову, натисніть кнопку “Розмістити вакансію”.',
  jobSkipped: (countId) =>
    `Ви видалили вакансію #${countId}.\nЯкщо бажаєте спробувати знову натисніть кнопку “Розмістити вакансію”.`,
});
