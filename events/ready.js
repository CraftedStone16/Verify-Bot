const Discord = require('discord.js');
const chalk = require('chalk');
let botversion = "3.2.1"
let prefix = "="
module.exports = client => {
  console.log(`Bot version: ${botversion}`);
  console.log(`Bot Prefix: "${prefix}"`);
  console.log('All commands Loaded!');
  console.log(chalk.bgWhite.black('Your bot is now online (Verify Bot)'));
  client.channels.get('448873575747944448').send('I have Restarted!');
};
