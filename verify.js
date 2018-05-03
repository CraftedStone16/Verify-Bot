const Discord = require('discord.js');
const { version } = require('discord.js');
const Util = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
client.login(process.env.BOT_TOKEN);

var prefix = "--"
var botversion = '0.0.1'

// Channels
//var rs1 = '413096711423131648' // WierdBot Discord  Channel: greets
var greetings = '441663494216220682' // greetings channel
//var punishments = '420977452534202369' // punishments channel
var bc = '441663623216103426' // Bot-Commands channel
//var pbotlogs = '415280410495287316' // bot logs/cmds channel
var logs = '437757021953982485' // logging channel

// Bot Code 
client.on('ready', () => {
  console.log(`Bot version: ${botversion}`);
  console.log(`Bot Prefix: "${prefix}"`);
  console.log('All commands Loaded!');
  console.log(chalk.bgWhite.black('Your bot is now online (Verify Bot)'));
  // client.channels.get('421362442191241236').send('Im here after restarting');
//   client.channels.get('419040375961812992').send('Hello Firespread Members :wave:')
//   client.channels.get('419040375961812992').send('[I was turned on or I was restarted]')
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('debug', e => {
  console.log(chalk.blue(e.replace(regToken, 'that was redacted')));
});

client.on('warn', e => {
  console.log(chalk.yellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.red(e.replace(regToken, 'that was redacted')));
});

// var mention = '<@373913434158530571>'
client.on('message', async message => {
    let args = message.content.split(' ').slice(1);
    var result = args.join(' ')
    let botowner = message.guild.roles.find('name', 'Bot Owner - DO NOT TOUCH!');
    let memberRole = message.guild.roles.find('name', 'Members')
    
    if (!message.content.startsWith(prefix)) return;

/*    if (message.content.startsWith(prefix + 'mute')) {
      if(message.member.roles.has(fsmRole.id)) {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
        if (reason.length < 1) return message.reply('You must provide a reason for the mute').catch(console.error);
        if (message.mentions.users < 1) return message.reply('You must mention someone to mute them.').catch(console.error);

        let mutelog = new Discord.RichEmbed()
        .setColor('GREEN')
        .addField(':speak_no_evil: __User Muted__', `${message.author} **Muted** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedmute = new Discord.RichEmbed()
        .setTitle('')
        .setColor('GREEN')
        .addField('Action:', 'Mute')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`)

        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

        if (message.guild.member(user).roles.has(memberRole.id)) {
          message.guild.member(user).removeRole(memberRole.id)
          message.guild.member(user).addRole(muteRole.id).then(() => {
            client.channels.get(`${punishments}`).send(embedmute)
            message.channel.send('That user has successfully been muted! :ok_hand:')
          client.channels.get(`${logs}`).send(mutelog)
          });
        } else if (message.guild.member(user).roles.has(muteRole.id)) {
          message.channel.send(`That user is already muted! To unmute that user do \`${prefix}unmute\``)
          }
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`mute\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'unmute')) {
      if(message.member.roles.has(fsmRole.id)) {
        let user = message.mentions.users.first();
        let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');

        let unmutelog = new Discord.RichEmbed()
        .setColor('GREEN')
        .addField(':monkey_face: __User Unmuted__', `${message.author} **Unmuted** ${user}!`)
        .setFooter(`${message.createdAt}`)

        let embedunmute = new Discord.RichEmbed()
        .setTitle('')
        .setColor('GREEN')
        .addField('Action:', 'Un-Mute')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)

        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

        if (message.guild.member(user).roles.has(muteRole.id)) {
          message.guild.member(user).addRole(memberRole.id)
          message.guild.member(user).removeRole(muteRole.id).then(() => {
            client.channels.get(`${punishments}`).send(embedunmute)
            message.channel.send('That user has successfully been unmuted! :ok_hand:')
          client.channels.get(`${logs}`).send(unmutelog)
          });
        } else if (message.guild.member(user).roles.has(memberRole.id)) {
          message.channel.send(`That user is not muted! To mute that user do \`${prefix}mute\``)
          }
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`unmute\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'kick')) {
      if(message.member.roles.has(fskRole.id)) {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (reason.length < 1) return message.reply('You must provide a reason for the kick');
        if (message.mentions.users < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

        if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
          message.guild.member(user).kick();

        let kicklog = new Discord.RichEmbed()
        .setColor('BLUE')
        .addField(':boot: __User Kicked__', `${message.author} **Kicked** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedkick = new Discord.RichEmbed()
        .setTitle('')
        .setColor('BLUE')
        .addField('Action:', 'Kick')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`)
        client.channels.get(`${punishments}`).send(embedkick)
        client.channels.get(`${logs}`).send(kicklog)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`kick\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'ban')) {
      if(message.member.roles.has(fsbRole.id)) {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (reason.length < 1) return message.reply('You must provide a reason for the ban');
        if (message.mentions.users < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

        if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
          message.guild.ban(user, );

        let banlog = new Discord.RichEmbed()
        .setColor('RED')
        .addField(':no_entry_sign: __User Banned__', `${message.author} **Banned** ${user} (${user}) for \`${reason}\``)
        .setFooter(`${message.createdAt}`)

        let embedban = new Discord.RichEmbed()
        .setTitle('')
        .setColor('RED')
        .addField('Action:', 'Ban')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`)
        .addField('\u200b', `User ID: ${user.id}`)
        client.channels.get(`${punishments}`).send(embedban)
        client.channels.get(`${logs}`).send(banlog)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`ban\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'unban')) {
      if(message.member.roles.has(fsbRole.id)) {
        let user = args[0];
        if (!user) return message.reply('You must supply a user ID.').catch(console.error);
        message.guild.unban(user);

        let unbanlog = new Discord.RichEmbed()
        .setColor('RED')
        .addField(':o: __User Unbanned__', `${message.author} **Unbanned** <@${user}>!`)
        .setFooter(`${message.createdAt}`)

        let embedunban = new Discord.RichEmbed()
        .setTitle('')
        .setColor('RED')
        .addField('Action:', 'Un-Ban')
        .addField('User:', `<@${user}>`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        client.channels.get(`${punishments}`).send(embedunban)
        client.channels.get(`${logs}`).send(unbanlog)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`unban\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'lockdown')) {
      if(message.member.roles.has(fswRole.id)) {
        if (!client.lockit) client.lockit = [];
        let time = args.slice(0).join(' ');
        let validUnlocks = ['release', 'unlock'];
        if (time.length < 1) return message.reply('You must provide a duration for the lockdown');

        let ldlog = new Discord.RichEmbed()
        .setTitle(':lock: __Channel Locked__')
        .addField('Moderator', `${message.author}`, true)
        .addField('Channel', `${message.channel}`, true)
        .addField('Duration', `${ms(ms(time), { long:true })}`, true)
        .setFooter(`${message.createdAt}`)

        let uldlog = new Discord.RichEmbed()
        .setTitle(':unlock: __Channel Unlocked__')
        .addField('Channel', `${message.channel}`, true)

        if (validUnlocks.includes(time)) {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGE: null
          }).then(() => {
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
            message.channel.send(`It looks like you tried to Manually Unlocked this channel! Manual unlock is a known bug, to reallow members to talk do \`${prefix}lockdown 1s\`.`)
          }).catch(error => {
            console.log(error);
          });
        } else {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
          }).then(() => {
            message.channel.send(`**${message.channel.name}** was locked down for \`${ms(ms(time), { long:true })}\``).then(() => {
              // client.channels.get(`${rs1}`).send(`__**A Channel Went into Lockdown:**__\n\n\n**Channel**: ${message.channel}\n-\n**Duration**: ${ms(ms(time), { long:true })}\n-\n**Time of the Lockdown**: ${message.createdAt}`)
              client.channels.get(`${logs}`).send(ldlog)
              client.lockit[message.channel.id] = setTimeout(() => {
                message.channel.overwritePermissions(message.guild.id, {
                  SEND_MESSAGES: null
                }).then(client.channels.get(`${logs}`).send(uldlog)).catch(console.error);
                delete client.lockit[message.channel.id];
                // client.channels.get(`${rs1}`).send(`__**A Lockdown was Lifted**__\n\n\n**Channel**: <#${message.channel.id}>\n-\nThe Lockdown was Lifted at \`${this.createdAt}\``)
              }, ms(time));

            }).catch(error => {
              console.log(error);
            });
          });
      }} else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`lockdown\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'test')) {
      let testargs = message.content.split(' |').slice(1);
      // let testargs = message.content.split(', ');
      // let arg1 = args.slice(0).join(' ');
      // let arg2 = args.slice(1).join(' ');
      // let arg3 = args.slice(2).join(' ');
      message.channel.send(`First Arg: ${testargs[0]}    Second Arg: ${testargs[1]}    Third Arg: ${testargs[2]}`)
    } else

    if (message.content.startsWith(prefix + 'fy')) {
      let fymention = args.join(' ')
      if (fymention.length < 1) return message.reply('You must mention someone first.');
      message.channel.send(`${fymention}, Fuck You!`)
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`fy\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'fuckyou')) {
      let fymention = args.join(' ')
      if (fymention.length < 1) return message.reply('You must mention someone first.');
      message.channel.send(`${fymention}, Fuck You!`)
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`fuckyou\` command in <#${message.channel.id}>!`)
    } else
*/
    // if (message.content.startsWith(prefix + 'ds')) {
    //   let spamit = args.join(' ')
    //   if (spamit.length < 1) return message.reply('Please specify a message to spam Fisger\'s personal discord');
    //   message.channel.send('I\'m Sorry, but this command has been disabled at the moment!')
      // message.channel.send('Spamming his discord...')
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
      // client.channels.get('404352438330589186').send(`${spamit}`)
    // } else

   /* if (message.content.startsWith(prefix + 'userinfo')) {
      let member = message.mentions.members.first();
      let lastmsg;
      // let delta = Math.abs( message.createdAt - member.user.createdAt) / 1000
      // let days = Math.floor(delta / 86400) % 7;
      // let hours = Math.floor(delta / 3600) % 24;
      // let minutes = Math.floor(delta / 60) % 60;
      // let seconds = delta % 60;
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
      client.channels.get(`${bc}`).send(userembed)
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`userinfo\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'purge')) {
      if(message.member.roles.has(fsbpRole.id)) {
        let messagecount = parseInt(result);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send(`Deleted **${messagecount}** messages.`).then(message => message.delete(2500));
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`purge\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'prune')) {
      if(message.member.roles.has(fsbpRole.id)) {
        let messagecount = parseInt(result);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send(`Deleted **${messagecount}** messages.`).then(message => message.delete(2500));
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`prune\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'setgame')) {
      if(message.member.roles.has(fsbmRole.id)) {
        client.user.setActivity(result);
        let embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`**New Game:** "${result}"`)
        client.channels.get(`${bc}`).send(embed2)
        // message.channel.send(`Successfully set the game to **${result}**`);
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`setgame\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'sg')) {
      if(message.member.roles.has(fsbmRole.id)) {
        client.user.setActivity(result);
        let embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`**New Game:** "${result}"`)
        client.channels.get(`${bc}`).send(embed2)
        // message.channel.send(`Successfully set the game to **${result}**`);
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`sg\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'feedback')) {
      let feedback = args.join(' ')
      if (feedback.length < 1) return message.channel.send('You must provide a message');
      client.channels.get('412718323088883720').send(`@everyone, **New Feedback Message**\n\n${feedback}`)
      message.author.send(`You just submitted a feedback!\n\n\`${feedback}\`\nI appreciate all feedback that I get, it helps me improve my bot!`)
      message.author.send(':ok_hand: I have given your feedback.')
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`feedback\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'suggest')) {
      let suggest = args.join(' ')
      if (suggest.length < 1) return message.channel.send('You must provide a message');
      client.channels.get('412718526613159956').send(`@everyone, **New Suggestion:**\n\n${suggest}`)
      message.author.send(`You just submitted a Suggestion!\n\n\`${suggest}\`\nWe appreciate all Suggestions that we get!`)
      message.channel.send(':ok_hand: I have submitted your Suggestion.')
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`suggest\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'say')) {
      let say = args.join(' ')
      if (message.author.bot) return;
      if (say.length < 1) return message.channel.send('You must provide a message');
      message.channel.send(`${say}`)
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`say\` command in <#${message.channel.id}>!`)
    } else

    // if (message.content.startsWith(prefix + 'embed')) {
    //   let embedargs = message.content.split(' |').slice(1);
    //   // let firstArgs = message.content.substring(12).split(" ");
    //   // let inputArgs = message.content.substring(12).split(", ");
    //   // let lastArgs = message.content.substring(12).split("\" \"")
    //
    //   let cembed = new Discord.RichEmbed()
    //   .setColor('RANDOM')
    //   .setTitle(`${embedargs[0] === undefined ? "\u200b" :  embedargs[0]}`)
    //   .addField(`${embedargs[1] === undefined ? "\u200b" :  embedargs[1]}`, `${embedargs[2] === undefined ? "\u200b" :  embedargs[2]}`)
    //   message.channel.send(cembed)
    // } else

    if (message.content.startsWith(prefix + 'sinfo')) {
      let serverembed = new Discord.RichEmbed()
      .setDescription("__**Server Information**__\n\u200b")
      .setColor('RANDOM')
      .addField('Server Name', `${message.guild.name}\n`)
      .addField('Server ID', `${message.guild.id}\n`)
      .addField('Server Owner', `${message.guild.owner} | ${message.guild.ownerID}\n`)
      .addField('Server Region', `${message.guild.region}\n`)
      .addField('Verification Level', `${message.guild.verificationLevel}\n`)
      .addField('Created on', `${message.guild.createdAt}\n`)
      .addField('You joined at', `${message.member.joinedAt}\n`)
      .addField('Total Members', `${message.guild.memberCount}\n`)
      return client.channels.get(`${bc}`).send(serverembed).then(message => message.delete(60000));
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`sinfo\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'weather f')) {
      message.delete(10000);
      weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
        if (err) message.channel.send(err);
        if (result === undefined || result.length === 0) {
          message.channel.send('**Please enter a valid location.**')
          return;
        }
        var current = result[0].current;
        var location = result[0].location

        let weatherembed = new Discord.RichEmbed()
       // .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather for ${current.observationpoint}`)
        .setThumbnail(`${current.imageUrl}`)
        .setColor('RANDOM')
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', `${location.degreetype}`, true)
        .addField('Temperature', `${current.temperature} Degrees`, true)
        .addField('Feels Like', `${current.feelslike} Degrees`, true)
        .addField('Winds', `${current.winddisplay}`, true)
        .addField('Humidity', `${current.humidity}%`, true)
        client.channels.get(`${bc}`).send(weatherembed).then(message => message.delete(60000));
      });
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`weather f\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'weather c')) {
      message.delete(10000);
      weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
        if (err) message.channel.send(err);
        if (result === undefined || result.length === 0) {
          message.channel.send('**Please enter a valid location.**')
          return;
        }
        var current = result[0].current;
        var location = result[0].location

        let weatherembed = new Discord.RichEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather for ${current.observationpoint}`)
        .setThumbnail(`${current.imageUrl}`)
        .setColor('RANDOM')
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', `${location.degreetype}`, true)
        .addField('Temperature', `${current.temperature} Degrees`, true)
        .addField('Feels Like', `${current.feelslike} Degrees`, true)
        .addField('Winds', `${current.winddisplay}`, true)
        .addField('Humidity', `${current.humidity}%`, true)
        client.channels.get(`${bc}`).send(weatherembed).then(message => message.delete(60000));
      });
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`weather c\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'weather')) {
      message.delete(10000)
      message.channel.send(`Please provide a degree type. Can be either \`c\` or \`f\`\n\nExample: \`${prefix}weather [degree letter (c or f)] [location]\` **WARNING:** The degree letter has to be lowercase!`)
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`weather\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'time')) {
      message.delete(10000);
      client.channels.get(`${bc}`).send(`\`${Date()}\``).then(message => message.delete(10000));
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`time\` command in <#${message.channel.id}>!`)
    } else

    if (message.content.startsWith(prefix + 'new')) {
      if(message.member.roles.has(botsonly.id)) {
        let user = message.mentions.users.first();
        let memberRole = client.guilds.get(message.guild.id).roles.find('name', 'Members');
        message.guild.member(user).addRole(memberRole.id)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`**SECRET NAME**\` command in <#${message.channel.id}>!`)
      }
    } else
      
    if (message.content.startsWith(prefix + 'nitro')) {
      message.channel.send('<:nitro:422127897122439168>')
    }
  
    if (message.content.startsWith(prefix + 'dog')) {
      let {body} = await superagent
      .get(`https://random.dog/woof.json?filter=png,jpg,jpeg,mp4`);

      let dogembed = new Discord.RichEmbed()
      .setImage(body.url);
      message.channel.send(dogembed)
    } else

    if (message.content.startsWith(prefix + 'cat')) {
      let {body} = await superagent
      .get(`aws.random.cat/meow`);

      let catembed = new Discord.RichEmbed()
      .setImage(body.file);
      message.channel.send(catembed)
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
    • Node       :: ${process.version}`, {code: "asciidoc"});
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
    } else

    if (message.content.startsWith(prefix + 'rules')) {
      message.channel.send(`
**1.** __|__ **NO** Advertising

**2.** __|__ **NO** Spamming

**3.** __|__ **NO** Excessive Swearing (2 Max Per Message, Swear Offending will be punished immediately no matter what)

**4.** __|__ **NO** Excessive Caps (Limit 1-3 Caps Per Word)

**5.** __|__ DO NOT Spam Commands

**6.** __|__ **NO** Excessive Character Stretching (3 Max per letter)

**7.** __|__ **NO** NOT Encourage Suicide

**8.** __|__ **NO** Death Threats

**9.** __|__ **NO** Self Harming Threats

**10.** __|__ **NO** DDoS/Dox Threats of any kind

**11.** __|__ **NO** Discrimination of any kind

**12.** __|__ **DO NOT** Post anyone's Personal Information

**13.** __|__ **DO NOT** Impersonate Staff

**14.** __|__ **DO NOT** Disrespect Players or Staff

**15.** __|__ **DO NOT** Ask for a Staff Rank/Permissions

**16.** __|__ **DO NOT** Ask a staff to read your Application

**17.** __|__ **DO NOT** Sell out of Game/Server/Unapproved Items

**18.** __|__ **DO NOT** Bypass the word filter (please report any bypass words)

**19.** __|__ **DO NOT** Evade your Mute/Ban

**20.** __|__ **NO** Inappropriate Avatars

**21.** __|__ **NO** Inappropriate Names

**22.** __|__ **DO NOT** Request Inappropriate/Ear rape Songs

**23.** __|__ LBGTQ+ Discrimination **WILL NOT** be tolerated!

:warning: The **Rules** here are just __**Shortened**__, if you would like to see the punishment(s) for each individual rule then do #rules :warning:
      `)
      client.channels.get(`${bc}`).send(`**${message.author.username}** just used the \`rules\` command in <#${message.channel.id}>!`)
    }
*/
    // if (message.content.startsWith(prefix + 'promote')) {
    //   if(message.member.roles.has(fsbmRole.id)) {
    //     let user = message.mentions.users.first();
    //
    //     if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);
    //
    //     if (message.guild.member(user).roles.has(fswRole.id)) {
    //       message.guild.member(user).removeRole(fskRole.id)
    //       message.guild.member(user).addRole(fsmRole.id)
    //     } else if (message.guild.member(user).roles.has(fsmRole.id)) {
    //       message.guild.member(user).addRole(fsbRole.id)
    //       message.guild.member(user).addRole(fsbpRole.id)
    //     }
    //   } else {
    //     message.channel.send('You do not have the permission to use that command!')
    //   }
    // }

    // if (message.content.startsWith(prefix + '')) {
    //   if(message.member.roles.has(fsbmRole.id)) {
    //     let user = message.mentions.users.first();
    //     let memberRole = client.guilds.get(message.guild.id).roles.find('name', 'member');
    //
    //     if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);
    //
    //     message.guild.member(user).addRole(memberRole.id)
    //     await message.channel.send('That user has successfully been unmuted! :ok_hand:')
    //   } else {
    //     message.channel.send('You do not have the permission to use that command!')
    //   }
    // }

    // if (message.content.startsWith(prefix + 'shutdown')) {
    //   message.channel.send(':wave: Shutting Down...')
    //   console.log(err);
    // }

    // if (message.content.startsWith(prefix + 'fyed')) {
    //   message.channel.send('Fuck You!')
    //     .then(message => message.edit('Hello :wave:'));
    // } else

    // if (message.content.startsWith(prefix + 'fm')) {
    //   message.channel.send('**Fuck**')
    //     .then(message => message.edit('**me**'))
    //     .then(message => message.edit('**in**'))
    //     .then(message => message.edit('**the**'))
    //     .then(message => message.edit('**ass**'))
    //     .then(message => message.edit('**with**'))
    //     .then(message => message.edit('**your**'))
    //     .then(message => message.edit('**hairy**'))
    //     .then(message => message.edit('**ass**'))
    //     .then(message => message.edit('**dick**'))
    //     .then(message => message.edit('**ass**'))
    //     .then(message => message.edit('**hairy**'))
    //     .then(message => message.edit('**your**'))
    //     .then(message => message.edit('**with**'))
    //     .then(message => message.edit('**ass**'))
    //     .then(message => message.edit('**the**'))
    //     .then(message => message.edit('**in**'))
    //     .then(message => message.edit('**me**'))
    //     .then(message => message.edit('**Fuck**'))
    //     .then(message => message.edit('**Fuck**\n**me**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**\n**your**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**\n**your**\n**hairy**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**\n**your**\n**hairy**\n**ass**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**\n**your**\n**hairy**\n**ass**\n**dick**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**\n**your**\n**hairy**\n**ass**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**\n**your**\n**hairy**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**\n**your**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**\n**with**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**\n**ass**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**\n**the**'))
    //     .then(message => message.edit('**Fuck**\n**me**\n**in**'))
    //     .then(message => message.edit('**Fuck**\n**me**'))
    //     .then(message => message.edit('**Fuck**'))
    //     .then(message => message.edit('**Fuck Me!**'))
    // } else

    // if (message.content.startsWith(prefix + 'sac')) {
    //     if(message.member.roles.has(fsmRole.id)) {
    //     let sacspace = args.join(' ')
    //     if (sacspace.length < 1) return message.reply('Please specify a message');
    //     client.channels.get('391881544291188736').send(`${sacspace}`)
    //     client.channels.get('391881440322650112').send(`${sacspace}`)
    //     client.channels.get('391881497197412352').send(`${sacspace}`)
    //     client.channels.get('391881615225389057').send(`${sacspace}`)
    //     client.channels.get('392050292574781440').send(`${sacspace}`)
    //     client.channels.get('392050457230573571').send(`${sacspace}`)
    //     client.channels.get('392727250912673794').send(`${sacspace}`)
    //     client.channels.get('394875015583236096').send(`${sacspace}`)
    //     client.channels.get('391883990417670155').send(`${sacspace}`)
    //     client.channels.get('404352438330589186').send(`${sacspace}`)
    //     client.channels.get('393881895919681536').send(`${sacspace}`)
    //     client.channels.get('392044096279281674').send(`${sacspace}`)
    //     client.channels.get('391884979392479232').send(`${sacspace}`)
    //     client.channels.get('392040982360752129').send(`${sacspace}`)
    //     client.channels.get('392041396464386051').send(`${sacspace}`)
    //     client.channels.get('392041459840450570').send(`${sacspace}`)
    //     client.channels.get('392041612009537538').send(`${sacspace}`)
    //     client.channels.get('404352438330589186').send(`${sacspace}`)
    //     client.channels.get('392041762127872001').send(`${sacspace}`)
    //     client.channels.get('392041799201587210').send(`${sacspace}`)
    //     client.channels.get('392043340885131264').send(`${sacspace}`)
    //     client.channels.get('392042003740884992').send(`${sacspace}`)
    //     client.channels.get('392042045344055296').send(`${sacspace}`)
    //     client.channels.get('392042344129495042').send(`${sacspace}`)
    //   } else {
    //     client.channels.get('404352438330589186').send('You do not have the permission to use that command! (Sac)')
    //   }
    // } else

    // if (message.content.startsWith(prefix + 'qsay')) {
    //   let qsay = args.join(' ')
    //   if (qsay.length < 1) return message.channel.send('You must provide a message');
    //   message.channel.send(`${qsay}`)
    // } else

    // if (message.content.startsWith(prefix + 'ssay')) {
    //   let ssay = args.join(' ')
    //   if (ssay.length < 1) return message.channel.send('You must provide a message');
    //   message.channel.send(`${ssay} .ssay`)
    // } else

    /*    let inputArgs = message.content.substring(12).split(", ");

            prefName = inputArgs[0];
            age = inputArgs[1];
            gender = inputArgs[2];
            region = inputArgs[3];
            race = inputArgs[4];

            //test for fail
            let isFail = false;
            for (var i = 0; i < 5; i++)
            {
                if (args[i] == null)
                    isFail = true;

                    let testargs = message.content.split(' |').slice(1);
                    // let testargs = message.content.split(', ');
                    // let arg1 = args.slice(0).join(' ');
                    // let arg2 = args.slice(1).join(' ');
                    // let arg3 = args.slice(2).join(' ');
                    message.channel.send(`First Arg: ${testargs[0]}    Second Arg: ${testargs[1]}    Third Arg: ${testargs[2]}`)
    */
}); //----- RE ENABLE AFTER MAINTENANCE -----
/*
if (message.content.startsWith(prefix + 'mute')) {
  if(message.member.roles.has(fswRole.id)) {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
    let memberRole = client.guilds.get(message.guild.id).roles.find('name', 'member');
    if (reason.length < 1) return message.reply('You must provide a reason for the mute').catch(console.error);
    if (message.mentions.users < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
    let embedmute = new Discord.RichEmbed()
    .setTitle('')
    .setColor('GREEN')
    .addField('Action:', 'Mute')
    .addField('User:', `${user.tag}`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason:', `${reason}`)

    if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

    if (message.guild.member(user).roles.has(memberRole.id)) {
      message.guild.member(user).removeRole(memberRole.id)
      message.guild.member(user).addRole(muteRole.id).then(() => {
        client.channels.get(`${rs1}`).send(embedmute)
        message.channel.send('That user has successfully been muted! :ok_hand:')
      });
    } else if (message.guild.member(user).roles.has(muteRole.id)) {
      message.channel.send(`That user is already muted! To unmute that user do \`${prefix}unmute\``)
      }
  } else {
    message.channel.send('You do not have the permission to use that command!')
  }
} else
*/

/*client.on('message', async message => { //----- RE ENABLE AFTER MAINTENANCE -----
  let botowner = message.guild.roles.find('name', 'Bot Owner - DO NOT TOUCH!');
  if(!message.member.roles.has(botowner.id)) return; // message.channel.send('I\'m Sorry, but I am in Maintenance Mode so my commands have been disabled!');
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.split(' ');
  let searchString = args.slice(1).join(' ');
  let url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  let serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(prefix + 'play')) {
    message.delete(15000);
    client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`play\` command in <#${message.channel.id}>!`)
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return client.channels.get(`${bc}`).send('You must be in a voice channel first!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      return client.channels.get(`${bc}`).send('I cannot join that voice channel! (No Permission)');
    }
    if (!permissions.has('SPEAK')) {
      return client.channels.get(`${bc}`).send('I cannot speak in this voice channel! Please give me the permission or I cant play music for you.')
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          const video2 = await youtube.getVideoByID(video.id);
          await handleVideo(video2, message, voiceChannel, true);
        }
        return client.channels.get(`${bc}`).send(`Playlist: **${playlist.title}** has been added to the queue!`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;
            let songselection = new Discord.RichEmbed()
            .addField('__**Song Selection**__', `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}\n\u200b\nPlease provide a value to select one of the searh results ranging from 1-10.`)
            client.channels.get(`${bc}`).send(songselection).then(message => message.delete(15000));
            try {
              var response = await client.channels.get(`${bc}`).awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                maxMatches: 1,
                time: 10000,
                errors: ['time']
              });
            } catch (err) {
                console.error(err);
                return client.channels.get(`${bc}`).send('No/Invailed value entered, cancelind video selection.');
            }
            const videoIndex = parseInt(response.first().content);
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
            console.error(err);
            return client.channels.get(`${bc}`).send('I could obtain any search results!');
        }
      }

      return handleVideo(video, message, voiceChannel);
    }
  } else if (message.content.startsWith(prefix + 'skip')) {
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`skip\` command in <#${message.channel.id}>!`)
      if (!serverQueue) return client.channels.get(`${bc}`).send('There is nothing to skip!');
      serverQueue.connection.dispatcher.end();
  } else if (message.content.startsWith(prefix + 'stop')) {
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`stop\` command in <#${message.channel.id}>!`)
      if (!message.member.voiceChannel) return client.channels.get(`${bc}`).send('You must be in a voice channel!');
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
      message.channel.send('Music Stopped!');
  } else if (message.content.startsWith(prefix + 'np')) {
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`np\` command in <#${message.channel.id}>!`)
      if (!serverQueue) return client.channels.get(`${bc}`).send('There is nothing playing!');
      return message.channel.send(`Now Playing: **${serverQueue[0].title}**`);
  } else if (message.content.startsWith(prefix + 'volume')) {
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`volume\` command in <#${message.channel.id}>!`)
      if (!serverQueue) return client.channels.get(`${bc}`).send('There is nothing playing!');
      if (!args[1]) return message.channel.send(`The current volume is: ${serverQueue.volume}`);
      serverQueue.volume = args[1];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      await client.channels.get(`${bc}`).send(`The new volume: ${args[1]}`);
  } else if (message.content.startsWith(prefix + 'queue')) {
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`queue\` command in <#${message.channel.id}>!`)
      if (!serverQueue) return client.channels.get(`${bc}`).send('There is nothing playing!');
//       let songqueue = new Discord.RichEmbed()
//       .addField('__**Song Queue**__', `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
//       .addField('__**Song Queue**__', `**-** ${serverQueue.songs[1].title}\n**-** ${serverQueue.songs[2].title}\n**-** ${serverQueue.songs[3].title}\n**-** ${serverQueue.songs[4].title}\n**-** ${serverQueue.songs[5].title}\n**-** ${serverQueue.songs[6].title}\n**-** ${serverQueue.songs[7].title}\n\u200b`)
//       .addField('**Now Playing**:', `${serverQueue.songs[0].title}`)
//       return message.channel.send(songqueue)
      return message.channel.send(`
__**Song Queue**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now Playing:** ${serverQueue.songs[0].title}
      `);
      // if (message.content.startsWith(prefix + 'sinfo')) {
      //   let serverembed = new Discord.RichEmbed()
      //   .setDescription("__**Server Information**__\n\u200b")
      //   .setColor('RANDOM')
      //   .addField('Server Name', `${message.guild.name}\n`)
      //   .addField('Server ID', `${message.guild.id}\n`)
      //   .addField('Server Owner', `${message.guild.owner} | ${message.guild.ownerID}\n`)
      //   .addField('Server Region', `${message.guild.region}\n`)
      //   .addField('Verification Level', `${message.guild.verificationLevel}\n`)
      //   .addField('Created on', `${message.guild.createdAt}\n`)
      //   .addField('You joined at', `${message.member.joinedAt}\n`)
      //   .addField('Total Members', `${message.guild.memberCount}\n`)
      //   return message.channel.send(serverembed)
      // } else
  } else if (message.content.startsWith(prefix + 'pause')) {
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`pause\` command in <#${message.channel.id}>!`)
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return client.channels.get(`${bc}`).send('Music Paused!');
      }
      return client.channels.get(`${bc}`).send('There is nothing playing!');
  } else if (message.content.startsWith(prefix + 'resume')) {
      client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`resume\` command in <#${message.channel.id}>!`)
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return client.channels.get(`${bc}`).send('Music Resumed!');
      }
      return client.channels.get(`${bc}`).send('The music is not paused!');
  }
});

async function handleVideo(video, message, voiceChannel, playlist = false) {
  let serverQueue = queue.get(message.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return client.channels.get(`${bc}`).send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist);
    else client.channels.get(`${bc}`).send(`**${song.title}** has been added to the queue! Position: ${serverQueue.postion}`);
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
      .on('end', () => {
        console.log('Song Ended!');
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on('console', error => console.error(error));
  dispatcher.setVolumeLogarithmic(5 / 5);

  serverQueue.textChannel.send(`Now Playing: **${song.title}**`);
}
// client.on('channelCreate', channel => {
//   client.channels.get('393881895919681536').send(`The Channel "**${channel.name}**" was just created! \`(${channel.type})\``)
// });
// client.on('channelDelete', channel => {
//   client.channels.get('393881895919681536').send(`The Channel "**${channel.name}**" was just deleted! \`(${channel.type})\``)
// });
client.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.editedTimestamp === newMessage.editedTimestamp) return;
  if (oldMessage.author.bot) return;
  if (newMessage.author.bot) return;
  let msgedited = new Discord.RichEmbed()
  .setThumbnail(`${newMessage.author.displayAvatarURL}`)
  .setTitle(':writing_hand: **Message Edited**')
  .addField('**Author**', `${newMessage.author}`, true)
  .addField('**Author ID**', `${newMessage.author.id}`, true)
  .addField('**Channel**', `${newMessage.channel}`, true)
  .addField('**Channel ID**', `${newMessage.channel.id}`, true)
  .addField('\u200b', `**Before**: ${oldMessage}\n**After**: ${newMessage}\n\u200b`)
  .setFooter(`Message ID: ${newMessage.id} | Edited: ${newMessage.editedAt}`)
  client.channels.get(`${logs}`).send(msgedited)
  // console.log('Message edit event fired. ID: %s - Old content: %s - New content: %s', nmsg.id, omsg.content, nmsg.content);
  // client.channels.get(`${logs}`).send(`:writing_hand: __A message was Edited:__\n\n**Channel:** ${oldMessage.channel}\n**Author**: ${oldMessage.author.username}#${oldMessage.author.discriminator}\n**ID**: ${oldMessage.id}\n\n\n**Old Message**: ${oldMessage.cleanContent}\n**New Message**: ${newMessage.cleanContent}`)
});

client.on('messageDelete', message => {
  if (message.author.bot) return;
  let msgdelete = new Discord.RichEmbed()
  .setThumbnail(`${message.author.displayAvatarURL}`)
  .setTitle(':wastebasket: **Message Deleted**')
  .addField('**Author**', `${message.author}`, true)
  .addField('**Author ID**', `${message.author.id}`, true)
  .addField('**Channel**', `${message.channel}`, true)
  .addField('**Channel ID**', `${message.channel.id}`, true)
  .addField('\u200b', `${message.content}\n\u200b`)
  .setFooter(`Message ID: ${message.id} | ${message.createdAt}`)
  client.channels.get(`${logs}`).send(msgdelete)
//  client.channels.get(`${logs}`).send(`:wastebasket: __A message was Deleted:__\n\n${message.cleanContent}\n\n\n**Channel:** ${message.channel}\n**Author:** ${message.author.username}#${message.author.discriminator}\n**ID:** ${message.id}`)
});
// client.on('messageUpdate', message => {
//     let client = message.client;
//
//     let channel = client.channels.get(client.channel);
//     if (channel) {
//       let message = channel.messages.get(message.id);
//       if (message) {
//         message.patch(data);
//         client.emit(Constants.Events.MESSAGE_UPDATE, message._edits[0], message);
//         return {
//           old: message._edits[0],
//           updated: message,
//         };
//     client.channels.get(`${logs}`).send(`**Old**: ${oldMessage}\n**New**: ${newMessage}`)
// });
// client.on('messageDeleteBulk', message => {
//   client.channels.get('393881895919681536').send(`${message.size} messages was just deleted!`)
// });

// Prefix help
client.on('message', message => {
  if (message.content === '<@422612037198413836>') {
    message.channel.send(`My prefix is **${prefix}**`);
  } else
  
  if (message.content === 'what is your prefix <@422612037198413836>?') {
    message.channel.send(`My prefix is **${prefix}**`);
  } else 
  
  if (message.content === 'What is your prefix <@422612037198413836>?') {
    message.channel.send(`My prefix is **${prefix}**`);
  }
});

client.on('message', message => {
  if (message.content === 'hey') {
    message.channel.send(`Hey ${message.author}!`)
  } else 
  
  if (message.content === 'Hey') {
    message.channel.send(`Hey ${message.author}!`)
  } else 

  if (message.content === 'hi') {
    message.channel.send(`Hi ${message.author}!`)
  } else 

  if (message.content === 'Hi') {
    message.channel.send(`Hi ${message.author}!`)
  } else 

  if (message.content === 'hello') {
    message.channel.send(`Hello ${message.author}!`)
  } else 

  if (message.content === 'Hello') {
    message.channel.send(`Hello ${message.author}!`)
  }
});

client.on('message', message => {
  if (message.content.startsWith(prefix + 'roles')) {
    client.channels.get(`${bc}`).send(`${message.author}\n__**Available Roles/Names:**__\n• Bot-Updates\n• News/Announcements\n• News\n\nUsage: \`${prefix}giveme <Name (listed above)>\` (To get the role) \`${prefix}leave <Name (listed above)>\` (To remove the role\nPLEASE NOTE: You have to type it exactly like it is in the list for it to work!`)
  } else
    
  if (message.content.startsWith(prefix + 'giveme Bot-Updates')) {
    message.member.addRole('427189291618402304')
    message.channel.send('Ok! I have given you the "Bot-Updates" role!')
  } else
  
  if (message.content.startsWith(prefix + 'leave Bot-Updates')) {
    message.member.removeRole('427189291618402304')
    message.channel.send('Ok! I have removed the "Bot-Updates" role from you!')
  } else

  if (message.content.startsWith(prefix + 'giveme News/Announcements')) {
    message.member.addRole('428245044345044992')
    message.channel.send('Ok! I have given you the "News/Announcements" role!')
  } else
  
  if (message.content.startsWith(prefix + 'leave News/Announcements')) {
    message.member.removeRole('428245044345044992')
    message.channel.send('Ok! I have removed the "News/Announcements" role from you!')
  } else
    
  if (message.content.startsWith(prefix + 'giveme News')) {
    message.member.addRole('428245044345044992')
    message.channel.send('Ok! I have given you the "News/Announcements" role!')
  } else
  
  if (message.content.startsWith(prefix + 'leave News')) {
    message.member.removeRole('428245044345044992')
    message.channel.send('Ok! I have removed the "News/Announcements" role from you!')
  } else
  
  if (message.content.startsWith(prefix + 'bug')) {
    let args = message.content.split(' ').slice(1);
    let bug = args.join(' ')
    if (bug.length < 1) return message.channel.send('You must provide a message');
    client.channels.get('415280541760356369').send(`<@&415260857786695711>, **New Bug:**\n\n${bug}`)
    message.author.send(`You just submitted a bug!\n\n\`${bug}\`\nWe appreciate all bugs that we get!`)
    message.channel.send(':ok_hand: I have reported your bug.')
    client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`bug\` command in <#${message.channel.id}>!`)
  }
});

client.on('guildBanAdd', (guild, user) => {
  // let guild = member.guild;
  guild.channels.get(`${greetings}`).send(`**${user.tag}** Was just banned from the **Firespread Network Discord!**`);
});

client.on('guildBanRemove', (guild, user) => {
  // let guild = member.guild;
  guild.channels.get(`${greetings}`).send(`**${user.tag}** Was just unbanned from the **Firespread Network Discord!**`);
});
*/
client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let years = (((member.joinedAt - member.user.createdAt) / 1000 / 31556952) >> 0)
  let months = (((member.joinedAt - member.user.createdAt) / 1000 / 2629746 % 12) >> 0)
  let days = (((member.joinedAt - member.user.createdAt) / 1000 / 2629746 % 30) >> 0)
  let hours = (((member.joinedAt - member.user.createdAt) / 1000 / 3600 % 24) >> 0)
  let minutes = (((member.joinedAt - member.user.createdAt) / 1000 / 60 % 60) >> 0)
  let seconds = (((member.joinedAt - member.user.createdAt) / 1000 % 60) >> 0)

  let joinlog = new Discord.RichEmbed()
  .setTitle(':inbox_tray: __User Joined__')
  .setThumbnail(`${member.user.displayAvatarURL}`)
  .addField('**User**', `${member.user}\n${member.user.tag}`, true)
  .addField('**ID**', `${member.user.id}`, true)
  .addField('**Joined**', `${member.joinedAt}`, true)
  .addField('**Created**', `${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds ago`)

  guild.channels.get(`${greetings}`).send(`**${member.user}** has joined the server! To gain access to the server you must do this... (blah blah blah)`)
  // guild.channels.get(`${pbotlogs}`).send(`${prefix}new ${member.user}`);
  // member.user.send(`Hello ${member.user.username}, Thank you for being part of the Firespread Team! :heart:\n\nIf you do not mind, we would like to ask you a couple favors.\nFirst thing is that we would really appreciate it if you would read our <#392050292574781440> and when you have finished reading our rules we would like for you to check out the <#392050457230573571> and make sure that your question is or isnt there, if its not there then you can request support in <#392044096279281674> besure to tell them what your having your issue on!\n\nIf you have managed to read all of this then you are very wonderful. :heart:`)
  guild.channels.get(`${logs}`).send(joinlog)
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;

  let leavelog = new Discord.RichEmbed()
  .addField(':outbox_tray: __**User left**__', `${member.user} | ${member.user.tag}`)

  guild.channels.get(`${greetings}`).send(`**${member.user.tag}** has left the server!`)
  guild.channels.get(`${logs}`).send(leavelog)
});
// ${member.user.presence.game === null ? "Nothing! (Literally)" :  member.user.presence.game.name}
// Emoji Events
/*client.on('emojiCreate', emoji => {
  const caniemoji = emoji.animated ? "<:nitro:422127897122439168> This is an Animated Emoji" : "This is not an Animated Emoji";
  let emojicreate = new Discord.RichEmbed()
  .addField(`-=- Emoji Event Log -=-`, `"**${emoji.name}**" was created\nID: ${emoji.id}`)
  .setFooter(`${caniemoji}`)
  client.channels.get(`${logs}`).send(emojicreate)
 // client.channels.get(`${logs}`).send(`A new emoji was made: ${emoji.name}\nAnimated: ${emoji.animated}`)
});

client.on('emojiDelete', emoji => {
  const daniemoji = emoji.animated ? "<:nitro:422127897122439168> This was an Animated Emoji" : "This was not an Animated Emoji";
  let emojidelete = new Discord.RichEmbed()
  .addField(`-=- Emoji Event Log -=-`, `"**${emoji.name}**" was deleted\nID: ${emoji.id}`)
  .setFooter(`${daniemoji}`)
  client.channels.get(`${logs}`).send(emojidelete)
 // client.channels.get(`${logs}`).send(`An emoji was deleted: **${emoji.name}**`)
});

client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const uaniemoji = newEmoji.animated ? "<:nitro:422127897122439168> This is an Animated Emoji" : "This is not an Animated Emoji";
  let emojiupdate = new Discord.RichEmbed()
  .addField(`-=- Emoji Event Log -=-`, `"**${oldEmoji.name}**" was renamed to "**${newEmoji.name}**"\nID: ${newEmoji.id}`)
  .setFooter(`${uaniemoji}`)
  client.channels.get(`${logs}`).send(emojiupdate)
 // client.channels.get(`${logs}`).send(`An Emoji\'s name was updated:\n**Old Name**: ${oldEmoji.name}\n**New Name**: ${newEmoji.name}`)
});

// Channel Events
client.on('channelCreate', channel => {
  let channelcreate = new Discord.RichEmbed()
  .addField('-=- Channel Event Log -=-', `"${channel.name}" was created\nID: ${channel.id}\nParent: ${channel.parent.name}`)
  .setFooter(`This is a "${channel.type}" channel`)
  client.channels.get(`${logs}`).send(channelcreate)
//   if (channel.type ===  dm) return;
//  client.channels.get(`${logs}`).send(`__**Channel Created:**__\n• Name: ${channel.name}\n• ID: ${channel.id}\n• Channel Type: ${channel.type}`)
});

client.on('channelDelete', channel => {
  let channeldelete = new Discord.RichEmbed()
  .addField('-=- Channel Event Log -=-', `"${channel.name}" was deleted\nID: ${channel.id}`)
  .setFooter(`This was a "${channel.type}" channel`)
  client.channels.get(`${logs}`).send(channeldelete)
  // client.channels.get(`${logs}`).send(`__**Channel Deleted:**__\n• Name: ${channel.name}\n• ID: ${channel.id}\n• Channel Type: ${channel.type}`)
});

client.on('channelUpdate', (oldChannel, newChannel) => {
  
  if(oldChannel.name !== newChannel.name) {
     let channelnameupdate = new Discord.RichEmbed()
     .addField('-=- Channel Event Log -=-', `"**${oldChannel.name}**" was renamed to "**${newChannel.name}**"\nID: ${newChannel.id}`)
     client.channels.get(`${logs}`).send(channelnameupdate)
     // client.channels.get(`${logs}`).send(`${newMember.user.tag} joined a Voice Channel -=- ${newUserChannel.name}`)
     // User Joins a voice channel
  }
     // client.channels.get(`${logs}`).send(`${newMember.user.tag} left a Voice Channel -=- ${oldUserChannel.name}`)
        // User leaves a voice channel
//   let channelupdate = new Discord.RichEmbed()
//   .addfield('__Channel Updated__', `Before: ${oldChan}\nAfter: ${newChan}\n\nOld Position: ${oldChannel.position}\nNew Position: ${newChannel.position}\n\nChannel ID: ${newChannel.id}`)
  
//   client.channels.get(`${logs}`).send(channelupdate)
//   `__**Channel Updated:**__\n• Old Name: ${oldChan}\n• New Name: ${newChan}\nPosition: ${newChannel.position}`
});

client.on('channelUpdate', (oldChannel, newChannel) => {
  if(newChannel.positon !== oldChannel.position) {
     let channelposupdate = new Discord.RichEmbed()
     .addField('-=- Channel Event Log -=-', `"**${newChannel.name}**" was moved to position **${newChannel.position}** from position **${oldChannel.position}**\nOld Parent: ${oldChannel.parent.name} |-| New Parent: ${newChannel.parent.name}\nID: ${newChannel.id}`)
     client.channels.get(`${logs}`).send(channelposupdate)
  }
});

// Role Events -
client.on('roleCreate', role => {
  let permlist = {
    CREATE_INSTANT_INVITE: 1 << 0,
    KICK_MEMBERS: 1 << 1,
    BAN_MEMBERS: 1 << 2,
    ADMINISTRATOR: 1 << 3,
    MANAGE_CHANNELS: 1 << 4,
    MANAGE_GUILD: 1 << 5,
    ADD_REACTIONS: 1 << 6,
    VIEW_AUDIT_LOG: 1 << 7,
    VIEW_CHANNEL: 1 << 10,
    READ_MESSAGES: 1 << 10,
    SEND_MESSAGES: 1 << 11,
    SEND_TTS_MESSAGES: 1 << 12,
    MANAGE_MESSAGES: 1 << 13,
    EMBED_LINKS: 1 << 14,
    ATTACH_FILES: 1 << 15,
    READ_MESSAGE_HISTORY: 1 << 16,
    MENTION_EVERYONE: 1 << 17,
    EXTERNAL_EMOJIS: 1 << 18,
    USE_EXTERNAL_EMOJIS: 1 << 18,
    CONNECT: 1 << 20,
    SPEAK: 1 << 21,
    MUTE_MEMBERS: 1 << 22,
    DEAFEN_MEMBERS: 1 << 23,
    MOVE_MEMBERS: 1 << 24,
    USE_VAD: 1 << 25,
    CHANGE_NICKNAME: 1 << 26,
    MANAGE_NICKNAMES: 1 << 27,
    MANAGE_ROLES: 1 << 28,
    MANAGE_ROLES_OR_PERMISSIONS: 1 << 28,
    MANAGE_WEBHOOKS: 1 << 29,
    MANAGE_EMOJIS: 1 << 30,
  };
  
  client.channels.get(`${logs}`).send(`__**Role Created:**__\n• Name: ${role.name}\n• ID: ${role.id}\n• Color: ${role.hexColor}\n• Mentionable: ${role.mentionable}\n• Postion: ${role.calculatedPosition}`)
//   client.channels.get(`${logs}`).send(`__**Role Permissions**__ -- __**${role.name}**__\n\n${role.serialize(permlist)}`)
});

client.on('roleDelete', role => {
  client.channels.get(`${logs}`).send(`__**Role Deleted:**__\n• Name: ${role.name}\n• ID: ${role.id}`)
});

// client.on('roleUpdate', (oldRole, newRole) => {
//   client.channels.get(`${logs}`).send(`__**Role Updated:**__\n•-• Before;\nName: ${oldRole.name}\nColor: ${oldRole.hexColor}\nMentionable: ${oldRole.mentionable}\n-Permissions:\n${oldRole.permissions}`)
//   client.channels.get(`${logs}`).send(`•-• After;\nName: ${newRole.name}\nColor: ${newRole.hexColor}\nMentionable: ${newRole.mentionable}\n-Permissions:\n${newRole.permissions}`)
// });

//   +=-=+   Voice Channel Events   +=-=+ //
// Channel Join, Leave, Changed
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  
  if(oldUserChannel === undefined && newUserChannel !== undefined) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} joined a Voice Channel -=- ${newUserChannel.name}`)
      // User Joins a voice channel
  } else if(newUserChannel === undefined) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} left a Voice Channel -=- ${oldUserChannel.name}`)
        // User leaves a voice channel
  } else if(oldUserChannel !== newUserChannel) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} joined a different Voice Channel -=- From ${oldUserChannel.name} to ${newUserChannel.name}`)
          // User changes voice channels
  }
});

// Self Muted
client.on('voiceStateUpdate', (oldMember, newMember) => {
  if(oldMember.selfMute === false && newMember.selfMute === true) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} muted themselves in ${newMember.voiceChannel.name}`)
      // User client side muted 
  } else if(oldMember.selfMute === true && newMember.selfMute === false) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} unmuted themselves in ${newMember.voiceChannel.name}`)
        // User leaves a voice channel
  }
});

// Self Deafened
client.on('voiceStateUpdate', (oldMember, newMember) => {
  if(oldMember.selfDeaf === false && newMember.selfDeaf === true) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} deafened themselves in ${newMember.voiceChannel.name}`)
      // User client side muted 
  } else if(oldMember.selfDeaf === true && newMember.selfDeaf === false) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} undeafened themselves in ${newMember.voiceChannel.name}`)
        // User leaves a voice channel
  }
});

// Server Muted
client.on('voiceStateUpdate', (oldMember, newMember) => {
  if(oldMember.serverMute === false && newMember.serverMute === true) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} got Server Muted!`)
      // User client side muted 
  } else if(oldMember.serverMute === true && newMember.serverMute === false) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} got Server Unmuted!`)
        // User leaves a voice channel
  }
});

// Server Deafened
client.on('voiceStateUpdate', (oldMember, newMember) => {
  if(oldMember.serverDeaf === false && newMember.serverDeaf === true) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} got Server Deafened!`)
      // User client side muted 
  } else if(oldMember.serverDeaf === true && newMember.serverDeaf === false) {
     client.channels.get(`${logs}`).send(`${newMember.user.tag} got Server UnDeafened!`)
        // User leaves a voice channel
  }
}); */

// User Events
// client.on('presenceUpdate', (oldMember, newMember) => {
//   client.channels.get(`${logs}`).send(`__**Discriminator Changed**__\nUser: ${newMember.user.tag}\nBefore: ${oldMember.user.discriminator}\nAfter: ${newMember.user.discriminator}`)
// });

// client.on('presenceUpdate', (oldMember, newMember) => {
//   client.channels.get(`${logs}`).send(`__**Username Changed**__\nUser: ${newMember.user.tag}\nBefore: ${oldMember.user.username}\nAfter: ${newMember.user.username}`)
// });

// client.on('presenceUpdate', (oldMember, newMember) => {
//   if(oldMember.nickname === undefined && newMember.nickname !== undefined) {
//      client.channels.get(`${logs}`).send(`${newMember.user.tag} added a nick -=- ${newMember.nickname}`)
//   } else if(newMember.nickname !== undefined) {
//       client.channels.get(`${logs}`).send(`${newMember.user.tag} removed their nick -=- ${oldMember.nickname}`)
//   } else if(oldMember.nickname !== newMember.nickname) {
//      client.channels.get(`${logs}`).send(`${newMember.user.tag} changed their nickname from **${oldMember.nickname}** to **${newMember.nickname}**`)
//   }
// });
