const enviroments = require('./enviroments');
const { execSync } = require('child_process');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function deploy() {
  const length = enviroments.length;
  console.log('Starting Bots Deployment Process...');
  console.log(`Found ${length} bots deployment specifications`);
  let i = 1;
  for (bot of enviroments) {
    execSync(
      `echo "${bot.env}" > .env && pm2 --name ${bot.process_name} start npm -- start`,
    );
    await sleep(3000);
    console.log(`${bot.process_name} Deployed and Running! [${i}/${length}]`);
    i += 1;
  }
  console.log(`End of Bots Deployment Process`);
}

deploy();
