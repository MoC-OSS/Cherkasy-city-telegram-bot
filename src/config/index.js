require('dotenv').config();

module.exports = {
  appId: process.env.APP_ID,
  apiHash: process.env.APP_HASH,
  phoneNumber: process.env.PHONE_NUMBER,
  code: process.env.PHONE_CODE,
  keywords: [
    'ПОВІТРЯНА',
    'ТРИВОГА',
    'УКРИТТЯ!',
    'УКРИТТЯ',
    'ВІДБІЙ',
    'ПОВІТРЯНОЇ',
    'ТРИВОГИ',
    '🟢ВІДБІЙ',
    'ВІДБІЙ',
    'АВІАУДАР',
    'ЛИШАЙТЕСЯ',
    'УКРИТТЯХ',
    'УКРИТТЯХ!',
    'УКРИТТІ',
    'УКРИТТІ.',
    'непаніка',
  ],
  // Skichko
  targetPeerId: process.env.TARGET_PEER_ID,
  targetPeerHash: process.env.TARGET_PEER_HASH,
  smsUrl: 'https://alertradar.herokuapp.com/',
  smsKey: process.env.SMS_KEY,
};
