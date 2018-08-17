var logs = '437757021953982485'
var prefix = "="
module.exports = message => {
    if (message.content.startsWith(prefix + 'promote')) {
       if(message.member.roles.has(memberRole.id)) {
         let user = message.mentions.users.first();

         if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

         message.guild.member(user).addRole(memberRole.id)
         client.channels.get(`${logs}`).send(`**${message.author.username}** just promoted **${user}**! [**Verified** to **Member**]`)
       } else {
         message.channel.send('You must have the Member role in order to promote that user to Member!')
       }
    }
};
