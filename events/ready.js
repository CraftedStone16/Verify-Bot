const Discord = require('discord.js');
const chalk = require('chalk');
let botversion = "4.0.0"
let prefix = "="
module.exports = client => {
  console.log(`Bot version: ${botversion}`);
  console.log(`Bot Prefix: "${prefix}"`);
  console.log('All commands Loaded!');
  console.log(chalk.bgWhite.black('Your bot is now online (Verify Bot)'));
  //client.user.setActivity('Papa is gay and affraid to show it!', { type: 'STREAMING', url: 'https://www.opensource.black' });
  client.user.setActivity('Version 4.0.0 is Live!');
  client.channels.get('448873575747944448').send('I have Restarted!');
};
