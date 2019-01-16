const Discord = require('discord.js');
const moment = require('moment');
var sticket = '449654475481808896'
var prefix = "="
module.exports = message => {
  if (message.content.startsWith(prefix + 'ticket')) {
      if (!message.channel.id === `437739768223367168`) return;
      if (!message.channel.id === `437739674577010688`) return;
      if (message.channel.id === '437738261150957579') return;
      message.delete();
      let targs = message.content.split(' ').slice(1).join(' ');
      if (targs.length < 1) return message.channel.send('You must provide a report for the ticket!');

     let utembed = new Discord.RichEmbed()
     .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
     .addField('Ticket Report:', `${targs}`)
     .setColor("FFFFFF");
     message.channel.send(utembed)
     message.author.send(`Hey, ${message.author}, we got your report! We will reply soon as possible!`);

     let atembed = new Discord.RichEmbed()
     .setAuthor(`Ticket from ${message.author.tag}`, message.author.displayAvatarURL)
     .addField('Full Report:', `${targs}`)
     .setFooter(`${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
     .setColor(16711728);
     messsage.client.channels.get(`${sticket}`).send(atembed)
  }
};
