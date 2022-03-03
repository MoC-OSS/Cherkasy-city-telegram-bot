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
  ],
  // Skichko
  targetPeerId: process.env.TARGET_PEER_ID,
  targetPeerHash: process.env.TARGET_PEER_HASH,

  // volunteers
  forwardedPeerId: process.env.FORWARDED_PEER_ID,
  forwardedPeerHash: process.env.FORWARDED_PEER_HASH,

  startWork: process.env.START_WORK,
  endWork: process.env.END_WORK,
};
