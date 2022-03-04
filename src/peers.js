// const api = require('./api');

// (async () => {
//   const resolvedPeer = await api.call('contacts.resolveUsername', {
//     username: 'Черкаси. Оперативна інформація.',
//     // username: 'secondMy1231231231',
//     // username: 'myTestBotChannel1',
//     // username: 'AleksandrSkichko',
//   });

//   const channel = resolvedPeer.chats.find(
//     (chat) => chat.id === resolvedPeer.peer.channel_id,
//   );

//   const inputPeer = {
//     _: 'inputPeerChannel',
//     channel_id: channel.id,
//     access_hash: channel.access_hash,
//   };

//   // // TEST CHANNEL
//   // const inputPeer = {
//   //   _: 'inputPeerChannel',
//   //   channel_id: '1763665721',
//   //   access_hash: '9867884003741617456',
//   // };

//   // // SKICHKO
//   // const inputPeer = {
//   //   _: 'inputPeerChannel',
//   //   channel_id: '1210629374',
//   //   access_hash: '15883494888643460108',
//   // };
// })();
