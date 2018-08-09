var prefix = "="
module.exports = message => {
    if (message.content.startsWith(prefix + 'userinfo')) {
      message.delete();
      let member = message.mentions.members.first();
      let lastmsg;
      let years = (((message.createdAt - member.user.createdAt) / 1000 / 31556952) >> 0)
      let months = (((message.createdAt - member.user.createdAt) / 1000 / 2629746 % 12) >> 0)
      let days = (((message.createdAt - member.user.createdAt) / 1000 / 2629746 % 30) >> 0)
      // let hours = (((message.createdAt - member.user.createdAt) / 1000 / 3600 % 24) >> 0)
      // let minutes = (((message.createdAt - member.user.createdAt) / 1000 / 60 % 60) >> 0)
      // let seconds = (((message.createdAt - member.user.createdAt) / 1000 % 60) >> 0)

      if (member.user.lastMessage === null) {
        lastmsg = "None was sent!"
      } else {
        lastmsg = member.user.lastMessage
      }
      let userembed = new Discord.RichEmbed()
      .setThumbnail(member.user.displayAvatarURL)
      .setColor('RANDOM')
      .setTitle(`__**User Information for ${member.user.username}**__`, true)
      .addField('**User ID**:', `${member.user.id}`, true)
      .addField('**User Discriminator**:', `${member.user.discriminator}`, true)
      .addField('**User Status**:', `${member.user.presence.status}`, true)
      .addField('**Playing**:', `${member.user.presence.game === null ? "Nothing! (Literally)" :  member.user.presence.game.name}`, true)
      .addField('**Last Message**:', `${lastmsg}`, true)
      .addField(`\n\u200b`, `**Account Created**: ${years} years, ${months} months, and ${days} days ago | ${member.user.createdTimestamp}\n**Avatar URL**: ${member.user.avatarURL}`)
      return message.channel.send(userembed).then(message => message.delete(60000));
    } else

    if (message.content.startsWith(prefix + 'sinfo')) {
      message.delete();
      let serverembed = new Discord.RichEmbed()
      .setDescription("__**Server Information**__\n\u200b")
      .setThumbnail(`${message.guild.iconURL}`)
      .setColor('RANDOM')
      .addField('Server Name', `${message.guild.name}\n`)
      .addField('Server ID', `${message.guild.id}\n`)
      .addField('Server Owner', `${message.guild.owner} | ${message.guild.ownerID}\n`)
      .addField('Server Region', `${message.guild.region}\n`)
      .addField('Verification Level', `${message.guild.verificationLevel}\n`)
      .addField('Created on', `${message.guild.createdAt}\n`)
      .addField('You joined at', `${message.member.joinedAt}\n`)
      .addField('Total Members', `${message.guild.memberCount}\n`)
      return message.channel.send(serverembed).then(message => message.delete(60000));
    } else

    if (message.content.startsWith(prefix + 'stats')) {
      let duration = moment.duration(client.uptime);
      message.channel.send(`= STATISTICS =
     • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
     • Uptime     :: ${duration}
     • Users      :: ${client.users.size.toLocaleString()}
     • Servers    :: ${client.guilds.size.toLocaleString()}
     • Channels   :: ${client.channels.size.toLocaleString()}
     • Discord.js :: v${version}
     • Node       :: ${process.version}
     • Verify Bot :: ${botversion}`, {code: "asciidoc"});
    } else

    if (message.content.startsWith(prefix + 'uptime')) {
      let uptime = client.uptime;

      let days = 0;
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      let notCompleted = true;

      while (notCompleted) {

          if (uptime >= 8.64e+7) {

            days++;
            uptime -= 8.64e+7;

          } else if (uptime >= 3.6e+6) {

            hours++;
            uptime -= 3.6e+6;

          } else if (uptime >= 60000) {

            minutes++;
            uptime -= 60000;

          } else if (uptime >= 1000) {

            seconds++;
            uptime -= 1000;

          }

          if (uptime < 1000)  notCompleted = false;

      }
      message.channel.send(`**Uptime:\n\nDays: \`${days}\` \nHours: \`${hours}\` \nMinutes: \`${minutes}\` \nSeconds: \`${seconds}\`**`);
    }
};
