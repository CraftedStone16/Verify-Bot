const ms = require('ms');
const moment = require('moment');
var prefix = "="
module.exports = message => {
    if (message.content.startsWith(prefix + 'ping')) {
      message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
    }
};
