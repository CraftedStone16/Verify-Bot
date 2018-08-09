var modprefix = "=="
var prefix = "="
module.exports = message => {
let botowner = message.guild.roles.find('name', 'Bot Owner');
    if (message.content.startsWith(modprefix + 'sg')) {
      if(message.member.roles.has(botowner.id)) {
        client.user.setActivity(result);
        let embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`**New Game:** "${result}"`)
        message.channel.send(embed2)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`sg\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(modprefix + 'setgame')) {
      if(message.member.roles.has(botowner.id)) {
        client.user.setActivity(result);
        let embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`**New Game:** "${result}"`)
        message.channel.send(embed2)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`setgame\` command in <#${message.channel.id}>!`)
      }
    }
};
