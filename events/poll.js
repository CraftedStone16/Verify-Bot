var pollchannel = '448893894768197632
var prefix = "="
var modprefix "=="
module.exports = message => {
let modRole = message.guild.roles.find('name', 'Moderator');
    if (message.content.startsWith(modprefix + 'poll')) {
      if(message.member.roles.has(modRole.id)) {
        let pollname = args.join(' ')
        message.delete();
        if (pollname.length < 1) return message.channel.send('You must provide a Poll Name!');

       let poll = new Discord.RichEmbed()
       .setTitle('')
       .setColor('RANDOM')
       .addField(`${pollname}`, `\nTo vote just simply react with 'Y' for Yes or 'N' for No!`)

       client.channels.get(`${pollchannel}`).send('@everyone New Poll!')
       client.channels.get(`${pollchannel}`).send(poll).then(function (message) {
                     message.react("🇾")
                      message.react("🇳")
                   })
       message.channel.send(`Your poll has been created! :ok_hand:`).then(message => message.delete(5000));
      } else {
        message.channel.send('You do not have the permission to use that command!')
      }
    }
};
