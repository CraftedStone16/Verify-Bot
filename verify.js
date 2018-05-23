const Discord = require('discord.js');
const { version } = require('discord.js');
const Util = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const ms = require('ms');
const moment = require('moment');
const superagent = require('superagent');
client.login(process.env.BOT_TOKEN);

var prefix = "--"
var pref = "--"
var modprefix = "~~"
var botversion = '0.3.2'

// Channels
//var rs1 = '413096711423131648' // WierdBot Discord  Channel: greets
var greetings = '441663494216220682' // greetings channel
var punishments = '442594775368073216' // punishments channel
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
    let botowner = message.guild.roles.find('name', 'Bot Owner');
    let modRole = message.guild.roles.find('name', 'Moderator');
    let supportRole = message.guild.roles.find('name', 'Support Team');
    let premiumRole = message.guild.roles.find('name', 'Premium');
    let memberRole = message.guild.roles.find('name', 'Member');
    let verified = message.guild.roles.find('name', 'Verified');
    let muteRole = message.guild.roles.find('name', 'Muted');
    
    if (!message.content.startsWith(prefix)) return;
    
    if (message.content.startsWith(prefix + 'promote s')) {
       if(message.member.roles.has(supportRole.id)) {
         let user = message.mentions.users.first();
         if(!message.guild.member(user).has(premiumRole.id)) return message.channel.send('That user must have the Premium role first!');
         message.guild.member(user).removeRole(premiumRole.id)
         message.guild.member(user).addRole(supportRole.id)
         client.channels.get(`${logs}`).send(`**${message.author.username}** just promoted **${user}**! [**Premium** to **Support Team**]`)
       } else {
         message.channel.send('You do not have the permission to use that command!')
       }
    } else
  
    if (message.content.startsWith(prefix + 'promote p')) {
       if(message.member.roles.has(premiumRole.id)) {
         let user = message.mentions.users.first();
         if(!message.guild.member(user).roles.has(memberRole.id)) return message.channel.send('That user must have the Member role first!');
         if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);
         message.guild.member(user).removeRole(memberRole.id) // return message.channel.send('That user must have the member role!');
         message.guild.member(user).addRole(premiumRole.id)
         client.channels.get(`${logs}`).send(`**${message.author.username}** just promoted **${user}**! [**Member** to **Premium**]`)
         return;
       } else {
         message.channel.send('You do not have the permission to use that command!')
       }
    } else
   
    if (message.content.startsWith(prefix + 'promote')) {
       if(message.member.roles.has(memberRole.id)) {
         let user = message.mentions.users.first();

         if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

         message.guild.member(user).addRole(memberRole.id)
      //  message.channel.send('Giving that user the needed roles for Admin now...')
          //.then(message => message.edit('Giving that user the needed roles for Admin now...'))
          //.then(message => message.edit('Giving that user the needed roles for Admin now...'))
          //.then(message => message.edit('Giving that user the needed roles for Admin now...'))
          //.then(message => message.edit('Giving that user the needed roles for Admin now...'))
          //.then(message => message.edit('I have given that user the needed roles for Admins! :ok_hand:'))
         client.channels.get(`${logs}`).send(`**${message.author.username}** just promoted **${user}**! [**Verified** to **Member**]`)
       } else {
       //  message.channel.send('You do not have the permission to use that command! (remove admin)')
       //  message.channel.send('You do not have the permission to use that command! (remove admin)')
        // message.channel.send('You do not have the permission to use that command! (remove admin)')
       //  message.channel.send('You do not have the permission to use that command! (remove admin)')
        // client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`admin\` command in <#${message.channel.id}>!`)
       }
    } else 

    /*if (message.content.startsWith(prefix + 'remove admin')) {
      if(message.member.roles.has(fsbmRole.id)) {
        let user = message.mentions.users.first();

        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

        message.guild.member(user).removeRole(fsbpRole.id)
        message.guild.member(user).removeRole(fsbRole.id)
        message.channel.send('Removing the needed roles for Admin from that user now...')
          .then(message => message.edit('I have removed the needed roles for Admins from that user! :ok_hand:'))
        client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`remove admin\` command in <#${message.channel.id}> and removed the Admin roles from **${user}**!`)
      } else {
        message.channel.send('You do not have the permission to use that command! (remove admin)')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`remove admin\` command in <#${message.channel.id}>!`)
      }
    } else */ 
      
    if (message.content.startsWith(prefix + 'warn')) {
      if(message.member.roles.has(modRole.id)) {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (reason.length < 1) return message.reply('You must provide a reason for the warning');
        if (message.mentions.users < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
        let warnlog = new Discord.RichEmbed()
        .setColor('PURPLE')
        .addField(':warning: __User Warned__', `${message.author} **Warned** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedwarn = new Discord.RichEmbed ()
        .setTitle('')
        .setColor('PURPLE')
        .addField('Action:', 'Warning')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`)
        client.channels.get(`${punishments}`).send(embedwarn)
        message.channel.send('That user has successfully been warned! :ok_hand:')
        client.channels.get(`${logs}`).send(warnlog)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`warn\` command in <#${message.channel.id}>!`)
      }
    } else
      
    if (message.content.startsWith(prefix + 'mute')) {
      if(message.member.roles.has(modRole.id)) {
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

        if (message.guild.member(user).roles.has(verified.id)) {
          message.guild.member(user).removeRole(verified.id)
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
      if(message.member.roles.has(modRole.id)) {
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
          message.guild.member(user).addRole(verified.id)
          message.guild.member(user).removeRole(muteRole.id).then(() => {
            client.channels.get(`${punishments}`).send(embedunmute)
            message.channel.send('That user has successfully been unmuted! :ok_hand:')
          client.channels.get(`${logs}`).send(unmutelog)
          });
        } else if (message.guild.member(user).roles.has(verified.id)) {
          message.channel.send(`That user is not muted! To mute that user do \`${prefix}mute\``)
          }
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`unmute\` command in <#${message.channel.id}>!`)
      }
    } else 

    if (message.content.startsWith(prefix + 'kick')) {
      if(message.member.roles.has(modRole.id)) {
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
      if(message.member.roles.has(modRole.id)) {
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
      if(message.member.roles.has(modRole.id)) {
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
      if(message.member.roles.has(modRole.id)) {
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
  
    if (message.content.startsWith(prefix + 'purge')) {
      if(message.member.roles.has(modRole.id)) {
        let messagecount = parseInt(result);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send(`Deleted **${messagecount}** messages.`).then(message => message.delete(2500));
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`purge\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(prefix + 'prune')) {
      if(message.member.roles.has(modRole.id)) {
        let messagecount = parseInt(result);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send(`Deleted **${messagecount}** messages.`).then(message => message.delete(2500));
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`prune\` command in <#${message.channel.id}>!`)
      }
    } else
  
    if (message.content.startsWith(prefix + 'sg')) {
      if(message.member.roles.has(botowner.id)) {
        client.user.setActivity(result);
        let embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`**New Game:** "${result}"`)
        message.channel.send(embed2)
        // message.channel.send(`Successfully set the game to **${result}**`);
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`sg\` command in <#${message.channel.id}>!`)
      }
    } else
    
    if (message.content.startsWith(prefix + 'setgame')) {
      if(message.member.roles.has(botowner.id)) {
        client.user.setActivity(result);
        let embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`**New Game:** "${result}"`)
        message.channel.send(embed2)
        // message.channel.send(`Successfully set the game to **${result}**`);
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`setgame\` command in <#${message.channel.id}>!`)
      }
    } else
    
    if (message.content === `${prefix}hierarchy`) {
      message.channel.send(`__**Hierarchy**__
   • Administrator
   • Developer
   • Moderator
   • Cracker
   • Mom
   • Premium
   • Member
   • Verified`)
    } else
    
    if (message.content === `${prefix}ranks`) {
      message.channel.send(`__**Hierarchy**__
   • Administrator
   • Developer
   • Moderator
   • Cracker
   • Mom
   • Premium
   • Member
   • Verified`)
    } else
    
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
      return message.channel.send(serverembed).then(message => message.delete(60000));
      //client.channels.get(`${logs}`).send(`**${message.author.username}** just used the \`sinfo\` command in <#${message.channel.id}>!`)
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
    } else

    if (message.content === `${prefix}meme`) {
      let memes=["http://i3.kym-cdn.com/photos/images/newsfeed/001/217/729/f9a.jpg",
      "https://i.ytimg.com/vi/HaLbRJ9VR68/maxresdefault.jpg",
      "https://i.ytimg.com/vi/mQ8lrBjy-7E/maxresdefault.jpg",
      "https://i.imgflip.com/20lq06.jpg",
      "https://img.memecdn.com/grandma-computer-expert_o_1142296.jpg",
      "https://i1.wp.com/picsmine.com/wp-content/uploads/2017/03/Hey-girls-lets-burn-some-rubber-Car-Memes.jpg?resize=640%2C773",
      "https://images1.westword.com/imager/u/745xauto/7979742/colorado.car.memes.13.jpg",
      "https://drivetribe.imgix.net/VFBy1i1WQQuArXPPk1aGXA?w=400&h=400&fm=pjpg&auto=compress&fit=crop&crop=faces,edges",
      "https://worldwideinterweb.com/wp-content/uploads/2015/11/cold-weather-funny-images.jpg",
      "https://i.pinimg.com/236x/96/73/d7/9673d7a46780bbf9dfb173abe2c9f6b5--minecraft-memes-minecraft-stuff.jpg",
      "http://i0.kym-cdn.com/photos/images/facebook/000/233/630/6cf.jpg",
      "https://pics.me.me/when-the-fbi-breaks-through-your-window-an-asks-if-26088337.png",
      "https://res.cloudinary.com/lmn/image/upload/c_limit,e_sharpen:150,f_auto,fl_lossy,h_360,q_80,w_640/v1/gameskinnyc/s/p/o/spongebob-58687.jpg",
      "https://media1.popsugar-assets.com/files/thumbor/Jd4nQ83myp6U6gWLzHV8aCkp6Lo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2015/07/30/615/n/1922153/6f32db66ead6ded2_Screen_Shot_2015-07-29_at_5.21.10_PM/i/Funny-Beauty-Memes.png",
      "https://fthmb.tqn.com/8cdFIfAhwNAdNAJelEebxEhrmTI=/735x0/success-56a9fd1f3df78cf772abee09.jpg",
      "http://solifequotes.com/wp-content/uploads/2016/07/35-Hilarious-Memes-1-Hilarious-Memes.jpg",
      "https://i.imgflip.com/136tm8.jpg",
      "http://images.memes.com/meme/5325.jpg",
      "https://i.imgflip.com/20kax7.jpg",
      "http://cdn.ebaumsworld.com/mediaFiles/picture/2388802/84820180.jpg",
      "https://i.pinimg.com/736x/9b/77/97/9b7797ce389244b0da6837f95fa1e112--generator-memes-monkey-memes.jpg",
      "https://media.licdn.com/mpr/mpr/shrinknp_800_800/AAEAAQAAAAAAAASIAAAAJGUxNzViZjY3LTdmYzQtNGNlMC05MDk1LWM5ZTJlYjI0OWNhYw.png",
      "https://i.pinimg.com/736x/e7/b5/9f/e7b59ffb213f99002a5cbb531ede8a8e--crazy-girlfriend-quotes-crazy-girlfriend-meme.jpg",
      "https://pics.me.me/girl-touches-my-noodle-dooodle-region-me-mess-with-this-17999703.png",
      "https://pics.me.me/ifyour-boyfriend-hasntbeen-in-the-military-then-you-have-a-2523866.png",
      "https://pics.me.me/your-girl-when-shes-mad-vs-your-girl-when-you-16255543.png",
      "http://cdn2-www.craveonline.com/assets/uploads/2017/04/2.png",
      "https://img.memecdn.com/the-struggle-v-v_o_1788253.jpg",
      "http://images.memes.com/meme/6083.jpg",
      "https://i.imgflip.com/20kax7.jpg",
      "https://pics.me.me/when-your-card-declines-and-the-total-only-2-18-the-28951063.png",
      "https://cdn.discordapp.com/attachments/270195186846531585/375657514680844289/DNaJJDSV4AAMttn.jpg",
      "**I can't always give out free memes, **:stuck_out_tongue_winking_eye: ",
      "https://tr3.cbsistatic.com/hub/i/2017/03/23/fd2cfe38-d0b2-4fee-9450-03b3d5f521d8/c3f153e108263291254737cffd045982/funnytechmemes1thumb800.jpg",
      "https://pbs.twimg.com/media/DO4xwBPX0AAHs0X.jpg",
      "http://s2.quickmeme.com/img/a6/a602774c48e075657a37b3a60bec501e58f0269dd7ce71ee0c7adf9ce6f96987.jpg",
      "http://cdn2-www.craveonline.com/assets/uploads/2017/07/0-900x713.jpg",
      "https://virily.com/wp-content/uploads/2017/03/d465cdff909bb9b3327827bf89c0061d.jpg",
      "http://cdn.ebaumsworld.com/mediaFiles/picture/730195/85460504.jpg",
      "https://appamatix.com/wp-content/uploads/2015/07/Ice_cubes_float.png",
      "http://i0.kym-cdn.com/photos/images/newsfeed/000/264/057/d1b.jpg",
      "https://i.imgflip.com/hwxkx.jpg",
      "https://i.imgflip.com/129fam.jpg",
      "https://i.imgflip.com/129fmf.jpg",
      "https://i.imgflip.com/20nhuk.jpg",
      "https://pbs.twimg.com/media/DOzFlcuW0AA81Ad.jpg",
      "https://i.imgflip.com/c01na.jpg",
      "http://thepopularteen.com/wp-content/uploads/2015/09/promposal.jpg",
      "https://i.pinimg.com/736x/43/78/63/43786326c61ecec1ddd810bc6e71e930--wolf-warriors-teen-wolf-humor.jpg",
      "https://images.rapgenius.com/8e6c529155e7f05303dd2f6ef3036a8b.400x571x1.jpg",
      "https://pbs.twimg.com/media/DOycWnxVwAA37LJ.jpg",
      "http://visionity.com/wp-content/uploads/2016/06/Grab-your-umbrella-adult-meme.jpg",
      "https://i.imgflip.com/t9w98.jpg",
      "https://i.imgflip.com/20l7a5.jpg",
      "https://i.imgflip.com/g2aql.jpg",
      "https://i.imgflip.com/t8evn.jpg",
      "https://i.imgflip.com/dt3op.jpg",
      "https://i.imgflip.com/20mm5k.jpg",
      "https://i.imgflip.com/129fzx.jpg",
      "https://i.imgflip.com/1m9zim.jpg",
      "https://i.chzbgr.com/full/9014775808/hC8B5B275/",
      "https://i.imgur.com/zk85pjN.jpg",
      "https://i.imgflip.com/li65g.jpg",
      "https://i.imgflip.com/1uu0w7.jpg",
      "https://i.imgflip.com/goo47.jpg",
      "https://i.imgflip.com/1rgwbz.jpg",
      "https://i.imgflip.com/yepnf.png",
      "http://i0.kym-cdn.com/photos/images/original/001/220/291/0fc.png",
      "https://winkgo.com/wp-content/uploads/2016/06/23-Funny-Baby-Memes-That-Are-Adorably-Cute-16.jpg",
      "http://www.mommyshorts.com/wp-content/uploads/2014/09/6a0133f30ae399970b0192aa1b4c77970d-800wi.jpg",
      "http://worldwideinterweb.com/wp-content/uploads/2017/10/funny-baby-meme-photos.jpg",
      "https://i.imgflip.com/129g5s.jpg",
      "https://i.imgflip.com/656kc.jpg",
      "https://i.imgflip.com/1s1ucg.jpg",
      "https://pics.me.me/w03-sv96-via-meme-enteric-only-men-will-understand-%E0%B8%81%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B9%83%E0%B8%88-http-9gag-com-gag-axa9m7g-6252743.png",
      "https://i.pinimg.com/736x/13/30/df/1330dfcd76cb635f59a372037ef6a234--fitness-memes-gym-memes.jpg",
      "https://i.pinimg.com/736x/2a/f3/81/2af381715d4d6c0cc84de507c0f74815--soccer-memes-kid-memes.jpg",
      "https://i.imgflip.com/129g2g.jpg",
      "https://i.imgflip.com/1uu12h.jpg",
      "http://www.dumpaday.com/wp-content/uploads/2012/12/bad-kid-meme-funny-pictures.jpg",
      "https://funnymemes.co/memes/Full_blown_lobsters_Funny_Meme.jpg",
      "https://i.imgur.com/iMXsX2T.jpg",
      "https://i.imgflip.com/8mm1m.jpg",
      "http://www.pmslweb.com/the-blog/wp-content/uploads/2013/11/35-turning-right-in-5-miles-grandma-meme.jpg",
      "https://heavyeditorial.files.wordpress.com/2013/07/m11.jpg?quality=65&strip=all",
      "http://www.wastedpotatoes.com/subcategories/2016/video_game_memes/image/video_game_memes34.jpg",
      "http://quotesnhumor.com/wp-content/uploads/2015/08/Top-30-Funny-animal-memes-and-quotes-Funniest-animals.jpg",
      "https://pics.me.me/anyone-see-a-catp-adult-humour-click-like-if-you-4953924.png",
      "https://jokideo.com/wp-content/uploads/meme/2014/04/Adult-meme---Scientists-have-discovered.jpg",
      "http://www.pmslweb.com/the-blog/wp-content/uploads/2017/06/6-how-to-know-if-your-girlfriend-is-horny-funny-adult-meme.jpg",
      "http://www.corcell.com/wp-content/uploads/8-hilarious-baby-memes-for-new-parents1.png",
      "https://i.pinimg.com/originals/90/fa/0b/90fa0ba11859183592ad27e6dd92a88a.jpg",
      "https://www.50-best.com/images/animal_memes/request_your_assistance.jpg",
      "https://pics.me.me/he-birth-of-an-autist-9gag-memes-are-dank-af-18831993.png",
      "https://images-cdn.9gag.com/photo/avrzLN5_700b.jpg",
      "http://res.cloudinary.com/nextermedia/image/fetch/w_728/http://gabworthy.com/wp-content/uploads/2015/07/Dont-like-my-sarcasm-meme.jpg",
      "http://quotespill.com/wp-content/uploads/2017/10/9a7f9b1e437b39b6dd1972700fbebc939793228b3b0e31d900713cdfcd1e2b78-min-300x295.jpg",
      "http://s.quickmeme.com/img/13/13c136ff3d2bacd0f25e6d67420a8da7135cba9f2d268a14bdf03e797f890dd0.jpg",
      "https://fthmb.tqn.com/I0AhpJFS9kVD-gpNqG782SEOWDo=/768x0/filters:no_upscale()/trump-supporters-stupid-56b6de965f9b5829f835018e.jpg",
      "https://i.imgflip.com/ukvtb.jpg",
      "https://i.imgflip.com/fc1hn.jpg",
      "http://i0.kym-cdn.com/photos/images/original/001/165/960/049.jpg",
      "https://pics.me.me/living-with-parents-v-s-living-alone-idk-about-you-people-23816783.png",
      "https://i.imgflip.com/1uikdz.jpg",
      "https://pbs.twimg.com/media/DOuk8n0XkAAzNnN.jpg",]

      let memesans = memes[Math.floor(Math.random() * memes.length)];
      let memesanswer = memesans.toString();

      let memeembed = new Discord.RichEmbed()
      .setImage(memesanswer);
      message.channel.send(memeembed)
    }
  
    if (message.content === `${prefix}dog`) {
      let {body} = await superagent
      .get(`https://random.dog/woof.json?filter=png,jpg,jpeg,mp4`);

      let dogembed = new Discord.RichEmbed()
      .setImage(body.url);
      message.channel.send(dogembed)
    } else

    if (message.content === `${prefix}cat`) {
      let {body} = await superagent
      .get(`http://aws.random.cat/meow`);

      let catembed = new Discord.RichEmbed()
      .setImage(body.file);
      message.channel.send(catembed)
    }
  
    if (message.content === `${prefix}image`) {
      message.channel.send({
          files: [
              "./captcha.png"
          ]
      })
    }
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(pref)) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;
    if (!message.channel === '437757021953982485') return;
    if (!message.channel === '441663623216103426') return;
  
    if (message.content === `${prefix}verify 22583888`) {
      message.delete(500); 
      // message.channel.send('it hpned');
      client.channels.get('437738261150957579').send(`${message.author} just verified! Please welcome them with a warm hacking hug.`)
      return message.member.addRole('437738324183089154');
    }
});
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(pref)) return; //message.delete(2000);
    if (!message.channel === '437757021953982485') return;
    if (!message.channel === '441663623216103426') return;
    if (!message.content.startsWith(`${prefix}verify`)) return;//.then(message => message.delete(3000)) return;
    if (message.content === `${prefix}verify 22583888`) return;
    if (message.content.length === prefix.length) return;
    message.content = message.content.substr(prefix.length);
    let args = message.content.split(' ');
    let cmd = args;
    
    // if (message.content != '--') return;
    if (cmd != 'verify 22583888') {
      message.delete(500)
      return message.channel.send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`).then(message => message.delete(30000));
    }
});

/* client.on('message', async message => {
    let args = message.content.split(' ').slice(1);
    var result = args.join(' ')
    let botowner = message.guild.roles.find('name', 'Bot Owner');
    let modRole = message.guild.roles.find('name', 'Moderator');
    let memberRole = message.guild.roles.find('name', 'Members')
    let verified = message.guild.roles.find('name', 'Verified')
    
    if (!message.content.startsWith(prefix)) return;
  
    if (message.content.startsWith(prefix + 'mute')) {
      if(message.member.roles.has(modRole.id)) {
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
// });
/*
// client.on('channelCreate', channel => {
//   client.channels.get('393881895919681536').send(`The Channel "**${channel.name}**" was just created! \`(${channel.type})\``)
// });
// client.on('channelDelete', channel => {
//   client.channels.get('393881895919681536').send(`The Channel "**${channel.name}**" was just deleted! \`(${channel.type})\``)
// });
*/
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
  if (message.channel === '441663623216103426') return;
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

client.on('guildBanAdd', (guild, user) => {
  // let guild = member.guild;
  guild.channels.get(`${greetings}`).send(`**${user.tag}** Was just banned from **${user.guild.name}**`);
});

client.on('guildBanRemove', (guild, user) => {
  // let guild = member.guild;
  guild.channels.get(`${greetings}`).send(`**${user.tag}** Was just unbanned from **${user.guild.name}**`);
});

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

  guild.channels.get(`${greetings}`).send(`**${member.user}** has joined the server! To gain access to the server you must enter the captcha sent to your direct messages in <#441663623216103426> by doing '\`--verify (captcha code)\`'`)
  member.user.send('You need this picture in order to verify and gain access to the server!', {
       files: [
           "./captcha1.png"
       ]
  })
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
*/
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
});

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
