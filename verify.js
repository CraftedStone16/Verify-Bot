const Discord = require('discord.js');
const { version } = require('discord.js');
const Util = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const ms = require('ms');
const moment = require('moment');
const superagent = require('superagent');
const cooldown = new Set();
const fetch = require("snekfetch");
const hexcols = [`#4285F4, #2D313C, #ffd700`];
client.login(process.env.BOT_TOKEN);


// <-=-> Channel Variables
var vh = '441663623216103426' // Verify Here Channel
var greetings = '441663494216220682' // Greetings channel
var rulesc = '437744189455728640' // Rules Channel
var announcements = '437740937448390657' // Announcements Channel
var botthings = '448871211389288449' // Bot Things Channel
var rankinfo = '445362784071450630' // Hierarchy Info Channel
var pollchannel = '448893894768197632' // Polls Channel
var punishments = '442594775368073216' // Punishments channel
var chat = '437738261150957579' // Main Server Chat
var roler = '437739768223367168' // Role Request Channel
var tsupport = '437739674577010688' // Support Channel
var stafftd = '444604798189305856' // Staff To Do Channel
var staffchannel = '441718552865800192'// Main Staff Talk Channels
var sticket = '449654475481808896' // Support Ticket Channel
var logs = '437757021953982485' // logging channel
var configc = '437756098573893642' // Config Channel

var prefix = "="
var p = "="
var mp = "=="
var modprefix = "=="
var botversion = '3.0.5'

client.on('ready', () => {
  console.log(`Bot version: ${botversion}`);
  console.log(`Bot Prefix: "${prefix}"`);
  console.log('All commands Loaded!');
  console.log(chalk.bgWhite.black('Your bot is now online (Verify Bot)'));
  client.channels.get('448873575747944448').send('Im here after restarting');
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


// Bot Shut Down Commands //
client.on('message', async message => {
    let botowner = message.guild.roles.find('name', 'Bot Owner');
  
    if (message.content.startsWith(modprefix + 'quit')) {
      if(message.member.roles.has(botowner.id)) {
        message.channel.send('Shutting Down now...').then(() => {
          process.exit()
        });
      } else {
        message.channel.send('You do not have the permission to use that command!')
      }
    } else
    
    if (message.content.startsWith(modprefix + 'shutdown')) {
      if(message.member.roles.has(botowner.id)) {
        message.channel.send('Shutting Down now...').then(() => {
          process.exit()
        });
      } else {
        message.channel.send('You do not have the permission to use that command!')
      }
    }
});

/* <=-=> Bot Code Starts Here <=-=> */
client.on('message', async message => {
    let args = message.content.split(' ').slice(1);
    var result = args.join(' ');
    let botowner = message.guild.roles.find('name', 'Bot Owner');
    let modRole = message.guild.roles.find('name', 'Moderator');
    let supportRole = message.guild.roles.find('name', 'Support Team');
    let premiumRole = message.guild.roles.find('name', 'Premium');
    let memberRole = message.guild.roles.find('name', 'Member');
    let verified = message.guild.roles.find('name', 'Verified');
    let muteRole = message.guild.roles.find('name', 'Muted');
    if (!message.content.startsWith(prefix)) return;

    // Info Commands
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

    // Punishment Commands
    if (message.content.startsWith(modprefix + 'warn')) {
      if(message.member.roles.has(modRole.id)) {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.reply('You must mention someone to warn them.').catch(console.error);
        if (reason.length < 3) return message.reply('You must provide a reason for the warning');
        let warnlog = new Discord.RichEmbed()
        .setColor('PURPLE')
        .addField(':warning: __User Warned__', `${message.author} **Warned** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedwarn = new Discord.RichEmbed ()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
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

    if (message.content.startsWith(modprefix + 'mute')) {
      if(message.member.roles.has(modRole.id)) {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.reply('You must mention someone to mute them.').catch(console.error);
        if (reason.length < 3) return message.reply('You must provide a reason for the mute').catch(console.error);

        let mutelog = new Discord.RichEmbed()
        .setColor('GREEN')
        .addField(':speak_no_evil: __User Muted__', `${message.author} **Muted** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedmute = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
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

    if (message.content.startsWith(modprefix + 'unmute')) {
      if(message.member.roles.has(modRole.id)) {
        message.delete(1500);
        let user = message.mentions.users.first();

        let unmutelog = new Discord.RichEmbed()
        .setColor('GREEN')
        .addField(':monkey_face: __User Unmuted__', `${message.author} **Unmuted** ${user}!`)
        .setFooter(`${message.createdAt}`)

        let embedunmute = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
        .setColor('GREEN')
        .addField('Action:', 'Un-Mute')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)

        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

        if (message.guild.member(user).roles.has(muteRole.id)) {
          message.guild.member(user).addRole(verified.id)
          message.guild.member(user).removeRole(muteRole.id).then(() => {
            client.channels.get(`${punishments}`).send(embedunmute)
            message.channel.send('That user has successfully been unmuted! :ok_hand:').then(message => message.delete(1500));
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

    if (message.content.startsWith(modprefix + 'kick')) {
      if(message.member.roles.has(modRole.id)) {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.reply('You must mention someone to kick them.').catch(console.error);
        if (reason.length < 3) return message.reply('You must provide a reason for the kick');

        if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
        message.guild.member(user).kick();

        let kicklog = new Discord.RichEmbed()
        .setColor('BLUE')
        .addField(':boot: __User Kicked__', `${message.author} **Kicked** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedkick = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
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

    if (message.content.startsWith(modprefix + 'ban')) {
      if(message.member.roles.has(modRole.id)) {
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.reply('You must mention someone to ban them.').catch(console.error);
        if (reason.length < 3) return message.reply('You must provide a reason for the ban');

        if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
        message.guild.ban(user, );

        let banlog = new Discord.RichEmbed()
        .setColor('RED')
        .addField(':no_entry_sign: __User Banned__', `${message.author} **Banned** ${user} (${user}) for \`${reason}\``)
        .setFooter(`${message.createdAt}`)

        let embedban = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
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

    if (message.content.startsWith(modprefix + 'unban')) {
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
        .setThumbnail(`${user.displayAvatarURL}`)
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

    // Super Useful Commands
    if (message.content.startsWith(prefix + 'promote')) {
       if(message.member.roles.has(memberRole.id)) {
         let user = message.mentions.users.first();

         if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

         message.guild.member(user).addRole(memberRole.id)
         client.channels.get(`${logs}`).send(`**${message.author.username}** just promoted **${user}**! [**Verified** to **Member**]`)
       } else {
         message.channel.send('You must have the Member role in order to promote that user to Member!')
       }
    } else

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
    } else
      
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
     client.channels.get(`${sticket}`).send(atembed)
    } else
      
    if (message.content.startsWith(prefix + 'bug')) {
      let args = message.content.split(' ').slice(1);
      let bug = args.join(' ')
      if (bug.length < 1) return message.channel.send('You must provide a message');
      client.channels.get('458359176431796244').send(`<@&441648649395765259>, **New Bug:**\n\n${bug}`)
      message.author.send(`You just submitted a bug!\n\n\`${bug}\`\nWe appreciate all bugs that we get!`)
      message.channel.send(':ok_hand: I have reported your bug.')
    } else

    // Fun Commands
    if (message.content === `${prefix}rando`) {
      var rando_imgs = ["./captcha-easy/Easy-captcha1.png", "./captcha-easy/Easy-captcha2.png", "./captcha-easy/Easy-captcha3.png",]
      
      message.channel.send('Testing Random Image Thingy', {
       files: [rando_imgs[Math.round(Math.random() * (rando_imgs.length - 1))]]
      })
    } else
    
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
    } else

    if (message.content.startsWith(prefix + 'fy')) {
      let fymention = args.join(' ')
      if (fymention.length < 1) return message.reply('You must mention someone first.');
      message.channel.send(`${fymention}, Fuck You!`)
    } else

    if (message.content.startsWith(prefix + 'fuckyou')) {
      let fymention = args.join(' ')
      if (fymention.length < 1) return message.reply('You must mention someone first.');
      message.channel.send(`${fymention}, Fuck You!`)
    } else

    if (message.content.startsWith(prefix + '8ball')) {
      if (!args[2]) return message.channel.send('Please ask a full question!');
      let replies = ["Yes.", "No.", "I don't know", "Ask Again Later"];

      let result = Math.floor((Math.random() * replies.length));
      let question = args.slice(0).join(" ");
      message.channel.send(`${replies[result]}`)
    } else
      
    // Other Commands
    if (message.content.startsWith(prefix + 'ping')) {
      message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
    } else

    if (message.content.startsWith(modprefix + 'purge')) {
      if(message.member.roles.has(modRole.id)) {
        let messagecount = parseInt(result);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send(`Deleted **${messagecount}** messages.`).then(message => message.delete(2500));
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`purge\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(modprefix + 'prune')) {
      if(message.member.roles.has(modRole.id)) {
        let messagecount = parseInt(result);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send(`Deleted **${messagecount}** messages.`).then(message => message.delete(2500));
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`prune\` command in <#${message.channel.id}>!`)
      }
    } else

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

    /*if (message.content.startsWith(prefix + 'nitro')) {
    message.channel.send('<:nitro:422127897122439168>')
    }*/
});

// Self Roles Commands 
client.on('message', message => {
    if (message.content.startsWith(prefix + 'roles')) {
      message.channel.send(`__**Available Roles/Names:**__\n• Announcements\n• News\n• Bot-Updates\n• Giveaways\n\nUsage: \`${prefix}giveme <Name (listed above)>\` (To get the role) \`${prefix}leave <Name (listed above)>\` (To remove the role\nPLEASE NOTE: You have to type it exactly like it is in the list for it to work!`)
    } else
    
    if (message.content.startsWith(prefix + 'giveme Bot-Updates')) {
      message.member.addRole('458349140007583765')
      message.channel.send('Ok! I have given you the "Bot-Updates" role!')
    } else
  
    if (message.content.startsWith(prefix + 'leave Bot-Updates')) {
      message.member.removeRole('458349140007583765')
      message.channel.send('Ok! I have removed the "Bot-Updates" role from you!')
    } else

    if (message.content.startsWith(prefix + 'giveme Announcements')) {
      message.member.addRole('458349140640792598')
      message.channel.send('Ok! I have given you the "Announcements" role!')
    } else
  
    if (message.content.startsWith(prefix + 'leave Announcements')) {
      message.member.removeRole('458349140640792598')
      message.channel.send('Ok! I have removed the "Announcements" role from you!')
    } else
    
    if (message.content.startsWith(prefix + 'giveme News')) {
      message.member.addRole('458349141467332608')
      message.channel.send('Ok! I have given you the "News" role!')
    } else
  
    if (message.content.startsWith(prefix + 'leave News')) {
      message.member.removeRole('458349141467332608')
      message.channel.send('Ok! I have removed the "News" role from you!')
    } else
  
    if (message.content.startsWith(prefix + 'giveme Giveaways')) {
      message.member.addRole('458349417838149633')
      message.channel.send('Ok! I have given you the "Giveaways" role!')
    } else
  
    if (message.content.startsWith(prefix + 'leave Giveaways')) {
      message.member.removeRole('458349417838149633')
      message.channel.send('Ok! I have removed the "Giveaways" role from you!')
    }
});

// Help Commands
client.on('message', async message => {
    if (message.author.bot) return;
    let botowner = message.guild.roles.find('name', 'Bot Owner');
    let modRole = message.guild.roles.find('name', 'Moderator');
    let supportRole = message.guild.roles.find('name', 'Support Team');
    let premiumRole = message.guild.roles.find('name', 'Premium');
    let memberRole = message.guild.roles.find('name', 'Member');
    let verified = message.guild.roles.find('name', 'Verified');
    let muteRole = message.guild.roles.find('name', 'Muted');
  
    if (message.content.startsWith(prefix + 'help help')) {
      message.channel.send(`\`\`\`Displays the commands list\n\nUsage: ${prefix}help     Alias; ${prefix}h\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h help')) {
      message.channel.send(`\`\`\`Displays the commands list\n\nUsage: ${prefix}help     Alias; ${prefix}h\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help h')) {
      message.channel.send(`\`\`\`Displays the commands list\n\nUsage: ${prefix}h     Alias; ${prefix}help\`\`\``)
    } else

    if (message.content.startsWith(prefix +'h h')) {
      message.channel.send(`\`\`\`Displays the commands list\n\nUsage: ${prefix}h     Alias; ${prefix}help\`\`\``)
    } else

    if (message.content.startsWith(prefix +'help ping')) {
      message.channel.send(`\`\`\`Pong! :joy:\n\nUsage: ${prefix}ping\`\`\``)
    } else

    if (message.content.startsWith(prefix +'h ping')) {
      message.channel.send(`\`\`\`Pong! :joy:\n\nUsage: ${prefix}ping\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help fy')) {
      message.channel.send(`\`\`\`A command that you trigger the bot to tell someone "Fuck You"\n\nUsage: ${prefix}fy <user>     Alias; ${prefix}fuckyou\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h fy')) {
      message.channel.send(`\`\`\`A command that you trigger the bot to tell someone "Fuck You"\n\nUsage: ${prefix}fy <user>     Alias; ${prefix}fuckyou\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help fuckyou')) {
      message.channel.send(`\`\`\`A command that you trigger the bot to tell someone "Fuck You"\n\nUsage: ${prefix}fuckyou <user>     Alias; ${prefix}fy\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h fuckyou')) {
      message.channel.send(`\`\`\`A command that you trigger the bot to tell someone "Fuck You"\n\nUsage: ${prefix}fuckyou <user>     Alias; ${prefix}fy\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help setgame')) {
      message.channel.send(`\`\`\`Sets my game status to the specified name\n\nUsage: ${prefix}setgame <game name>     Alias; ${prefix}sg\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h setgame')) {
      message.channel.send(`\`\`\`Sets my game status to the specified name\n\nUsage: ${prefix}setgame <game name>     Alias; ${prefix}sg\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help sg')) {
      message.channel.send(`\`\`\`Sets my game status to the specified name\n\nUsage: ${prefix}sg <game name>     Alias; ${prefix}setgame\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h sg')) {
      message.channel.send(`\`\`\`Sets my game status to the specified name\n\nUsage: ${prefix}sg <game name>     Alias; ${prefix}setgame\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help purge')) {
      message.channel.send(`\`\`\`Deletes the specified amount of messages - Limit: 100 (Changing Soon)\n\nUsage: ${prefix}purge <number>     Alias; ${prefix}prune\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h purge')) {
      message.channel.send(`\`\`\`Deletes the specified amount of messages - Limit: 100 (Changing Soon)\n\nUsage: ${prefix}purge <number>     Alias; ${prefix}prune\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help prune')) {
      message.channel.send(`\`\`\`Deletes the specified amount of messages - Limit: 100 (Changing Soon)\n\nUsage: ${prefix}prune <number>     Alias; ${prefix}purge\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h prune')) {
      message.channel.send(`\`\`\`Deletes the specified amount of messages - Limit: 100 (Changing Soon)\n\nUsage: ${prefix}prune <number>     Alias; ${prefix}purge\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help warn')) {
      message.channel.send(`\`\`\`Warns the user that you mention\n\nUsage: ${prefix}warn <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h warn')) {
      message.channel.send(`\`\`\`Warns the user that you mention\n\nUsage: ${prefix}warn <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help kick')) {
      message.channel.send(`\`\`\`Kicks the user that you mention\n\nUsage: ${prefix}kick <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h kick')) {
      message.channel.send(`\`\`\`Kicks the user that you mention\n\nUsage: ${prefix}kick <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help mute')) {
      message.channel.send(`\`\`\`Mutes the user that you mention\n\nUsage: ${prefix}mute <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h mute')) {
      message.channel.send(`\`\`\`Mutes the user that you mention\n\nUsage: ${prefix}mute <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help unmute')) {
      message.channel.send(`\`\`\`Unmutes the user that you mention\n\nUsage: ${prefix}unmute <user (mention the user)>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h unmute')) {
      message.channel.send(`\`\`\`Unmutes the user that you mention\n\nUsage: ${prefix}unmute <user (mention the user)>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help ban')) {
      message.channel.send(`\`\`\`Bans the user that you mention\n\nUsage: ${prefix}ban <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h ban')) {
      message.channel.send(`\`\`\`Bans the user that you mention\n\nUsage: ${prefix}ban <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help unban')) {
      message.channel.send(`\`\`\`Unbans a certain user by using their user id\n\nUsage: ${prefix}unban <user id>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h unban')) {
      message.channel.send(`\`\`\`Unbans a certain user by using their user id\n\nUsage: ${prefix}unban <user id>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help userinfo')) {
      message.channel.send(`\`\`\`Gives you detailed information of the account of the person that you mention.\n\nUsage: ${prefix}userinfo <mention user>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h userinfo')) {
      message.channel.send(`\`\`\`Gives you detailed information of the account of the person that you mention.\n\nUsage: ${prefix}userinfo <mention user>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help promote')) {
      message.channel.send(`\`\`\`Promotes a certain user from Verified to the Members rank\n\nUsage: ${prefix}promote <user>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h promote')) {
      message.channel.send(`\`\`\`Promotes a certain user from Verified to the Members rank\n\nUsage: ${prefix}promote <user>\n<> = Required  [] = Optional\`\`\``)
    } else
          
    if (message.content.startsWith(prefix + 'help poll')) {
      message.channel.send(`\`\`\`Generates a poll for users to vote on. Currently only Yes or No polls\n\nUsage: ${prefix}poll <poll question>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix +'h poll')) {
      message.channel.send(`\`\`\`Generates a poll for users to vote on. Currently only Yes or No polls\n\nUsage: ${prefix}poll <poll question>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help 8ball')) {
      message.channel.send(`\`\`\`It's so majestic that I can't even tell you the secrets\n\nUsage: ${prefix}8ball <question>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h 8ball')) {
      message.channel.send(`\`\`\`It's so majestic that I can't even tell you the secrets\n\nUsage: ${prefix}8ball <question>\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help cat')) {
      message.channel.send(`\`\`\`Gives you a random cat meme\n\nUsage: ${prefix}cat\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix +'h cat')) {
      message.channel.send(`\`\`\`Gives you a random cat meme\n\nUsage: ${prefix}cat\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help dog')) {
      message.channel.send(`\`\`\`Gives you a random dog meme\n\nUsage: ${prefix}dog\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h dog')) {
      message.channel.send(`\`\`\`Gives you a random dog meme\n\nUsage: ${prefix}dog\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help hierarchy')) {
      message.channel.send(`\`\`\`Gives you a list of the current ranks on the server\n\nUsage: ${prefix}hierarchy     Alias; ${prefix}ranks\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h hierarchy')) {
      message.channel.send(`\`\`\`Gives you a list of the current ranks on the server\n\nUsage: ${prefix}hierarchy     Alias; ${prefix}ranks\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help ranks')) {
      message.channel.send(`\`\`\`Gives you a list of the current ranks on the server\n\nUsage: ${prefix}ranks     Alias; ${prefix}hierarchy\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h ranks')) {
      message.channel.send(`\`\`\`Gives you a list of the current ranks on the server\n\nUsage: ${prefix}ranks     Alias; ${prefix}hierarchy\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help stats')) {
      message.channel.send(`\`\`\`Tells you all kinds of information about me including my versions\n\nUsage: ${prefix}stats\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h stats')) {
      message.channel.send(`\`\`\`Tells you all kinds of information about me including my versions\n\nUsage: ${prefix}stats\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help uptime')) {
      message.channel.send(`\`\`\`Tells you how long I have been up and running in days, hours, minutes, and seconds\n\nUsage: ${prefix}uptime\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix +'h uptime')) {
      message.channel.send(`\`\`\`Tells you how long I have been up and running in days, hours, minutes, and seconds\n\nUsage: ${prefix}uptime\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'help sinfo')) {
      message.channel.send(`\`\`\`Tells you all kinds of information about this server\n\nUsage: ${prefix}sinfo\n<> = Required  [] = Optional\`\`\``)
    } else

    if (message.content.startsWith(prefix + 'h sinfo')) {
      message.channel.send(`\`\`\`Tells you all kinds of information about this server\n\nUsage: ${prefix}sinfo\n<> = Required  [] = Optional\`\`\``)
    }
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content === `${prefix}help`) {
      let helpembed1 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('__**Help**__')
      .addField('**Main**', `${p}help                        Alias; ${p}h\n${p}userinfo\n${p}ping\n${p}sinfo\n${p}fuckyou                 Alias; ${p}fy\n${p}hierarchy              Alias; ${p}ranks\n${p}stats\n${p}uptime\n${p}8ball\n${p}cat\n${p}dog\n\u200b`)
      .addField('**Permissioned**', `${p}promote (Member Role Needed)\n${mp}poll\n${mp}setgame                Alias; ${mp}sg\n${mp}purge                     Alias; ${mp}prune\n${mp}warn\n${mp}kick\n${mp}mute\n${mp}unmute\n${mp}ban\n${mp}unban\n${mp}quit                          Alias; ${mp}shutdown\n\u200b`)
      .addField('\u200b', `You can do \`${p}help <command>\` or \`${p}h <command>\` for more information for that command.`)
      message.channel.send(helpembed1).then(message => message.delete(60000));
    } else

    if (message.content === `${prefix}h`) {
      let helpembed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('__**Help**__')
      .addField('**Main**', `${p}help                        Alias; ${p}h\n${p}userinfo\n${p}ping\n${p}sinfo\n${p}fuckyou                 Alias; ${p}fy\n${p}hierarchy              Alias; ${p}ranks\n${p}stats\n${p}uptime\n${p}8ball\n${p}cat\n${p}dog\n\u200b`)
      .addField('**Permissioned**', `${p}promote (Member Role Needed)\n${mp}poll\n${mp}setgame                Alias; ${mp}sg\n${mp}purge                     Alias; ${mp}prune\n${mp}warn\n${mp}kick\n${mp}mute\n${mp}unmute\n${mp}ban\n${mp}unban\n${mp}quit                          Alias; ${mp}shutdown\n\u200b`)
      .addField('\u200b', `You can do \`${p}help <command>\` or \`${p}h <command>\` for more information for that command.`)
      message.channel.send(helpembed2).then(message => message.delete(60000));
    }
});
/*
// Verification Succeeded Code 4 
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;

    if (message.content === `${prefix}verify TIeVnMF`) {
      message.delete(500);
      client.channels.get(`${chat}`).send(`${message.author} just verified! Please welcome them with a warm hacking hug.`)
      return message.member.addRole('437738324183089154');
    }
});

// Verification Failed Code 4
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if(!message.member.roles.has('467428407400202240')) return message.channel.send("You must complete the first verification first")
    if (!message.content.startsWith(prefix)) return; //message.delete(2000);
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;//.then(message => message.delete(3000)) return;
    if (message.content === `${prefix}verify TIeVnMF`) return;
    if (message.content.length === prefix.length) return;
    message.content = message.content.substr(prefix.length);
    let args = message.content.split(' ');
    let cmd = args;

    if (cmd != 'verify TIeVnMF') {
      message.delete(500)
      return message.channel.send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`).then(message => message.delete(30000));
    }
});

// Verification Succeeded Code 5
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;

    if (message.content === `${prefix}verify anictiu`) {
      message.delete(500);
      client.channels.get(`${chat}`).send(`${message.author} just verified! Please welcome them with a warm hacking hug.`)
      return message.member.addRole('437738324183089154');
    }
});

// Verification Failed Code 5
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if(!message.member.roles.has('467428407400202240')) return message.channel.send("You must complete the first verification first")
    if (!message.content.startsWith(prefix)) return; //message.delete(2000);
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;//.then(message => message.delete(3000)) return;
    if (message.content === `${prefix}verify anictiu`) return;
    if (message.content.length === prefix.length) return;
    message.content = message.content.substr(prefix.length);
    let args = message.content.split(' ');
    let cmd = args;

    if (cmd != 'verify anictiu') {
      message.delete(500)
      return message.channel.send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`).then(message => message.delete(30000));
    }
});

// Verification Succeeded Code 6
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;

    if (message.content === `${prefix}verify 7JpAL5n`) {
      message.delete(500);
      client.channels.get(`${chat}`).send(`${message.author} just verified! Please welcome them with a warm hacking hug.`)
      return message.member.addRole('437738324183089154');
    }
});

// Verification Failed Code 6
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if(!message.member.roles.has('467428407400202240')) return message.channel.send("You must complete the first verification first")
    if (!message.content.startsWith(prefix)) return; //message.delete(2000);
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;//.then(message => message.delete(3000)) return;
    if (message.content === `${prefix}verify 7JpAL5n`) return;
    if (message.content.length === prefix.length) return;
    message.content = message.content.substr(prefix.length);
    let args = message.content.split(' ');
    let cmd = args;

    if (cmd != 'verify 7JpAL5n') {
      message.delete(500)
      return message.channel.send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`).then(message => message.delete(30000));
    }
}); */

// Verification (Hard/Part 2)
client.on('message', async message => {
   // var c_easy = ["aumso", "dati", "sLs8FLwy",]
    const responseObject = {
      "=verify TIeVnMF": `${message.author} just verified! Please welcome them with a warm hacking hug.`,
      "=verify anictiu": `${message.author} just verified! Please welcome them with a warm hacking hug.`,
      "=verify 7JpAL5n": `${message.author} just verified! Please welcome them with a warm hacking hug.`
    };
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
  
    if(responseObject[message.content]) {
      client.channels.get(`${configc}`).send(responseObject[message.content]);
      message.member.addRole('437738324183089154');
      return message.member.removeRole('467428407400202240');
    } else {
      client.channels.get(`${configc}`).send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`)
    }
});

// Verification (Easy/Part 1)
client.on('message', async message => {
   // var c_easy = ["aumso", "dati", "sLs8FLwy",]
    const responseObject = {
      "=verify aumso": `Check your DMs for the Verification Code Part 2!`,
      "=verify dati": `Check your DMs for the Verification Code Part 2!`,
      "=verify sLs8FLwy": `Check your DMs for the Verification Code Part 2!`
    };
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (message.content === `${prefix}verify TIeVnMF`) return;
    if (message.content === `${prefix}verify anictiu`) return;
    if (message.content === `${prefix}verify 7JpAL5n`) return;
  
    if(responseObject[message.content]) {
      client.channels.get(`${configc}`).send(responseObject[message.content]);
      return message.member.addRole('467428407400202240');
    } else {
      client.channels.get(`${configc}`).send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`)
    }
});

/*
// Verification Failed Code 1
client.on('message', async message => {
    var c_easy = ["aumso", "dati", "sLs8FLwy",]
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return; //message.delete(2000);
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;//.then(message => message.delete(3000)) return;
    if (message.content === `${prefix}verify ${c_easy}`) return;
    if (message.content.length === prefix.length) return message.channel.send('You must provide numbers/letters of the captcha sent in your DMs').then(message => message.delete(30000));
    if (message.content === `${prefix}verify TIeVnMF`) return;
    if (message.content === `${prefix}verify anictiu`) return;
    if (message.content === `${prefix}verify 7JpAL5n`) return;
    message.content = message.content.substr(prefix.length);
    let args = message.content.split(' ');
    let cmd = args;

    if (cmd != `verify ${c_easy}`) {
      message.delete(500)
      return message.channel.send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`).then(message => message.delete(30000));
    }
});


// Verification Succeeded Code 2
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (message.content === `${prefix}verify TIeVnMF`) return;
    if (message.content === `${prefix}verify anictiu`) return;
    if (message.content === `${prefix}verify 7JpAL5n`) return;

    if (message.content === `${prefix}verify dati`) {
      message.delete(500);
      client.channels.get(`${chat}`).send(`${message.author} just verified! Please welcome them with a warm hacking hug.`)
      return message.member.addRole('437738324183089154');
    }
});

// Verification Failed Code 2
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return; //message.delete(2000);
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;//.then(message => message.delete(3000)) return;
    if (message.content === `${prefix}verify dati`) return;
    if (message.content.length === prefix.length) return;
    if (message.content === `${prefix}verify TIeVnMF`) return;
    if (message.content === `${prefix}verify anictiu`) return;
    if (message.content === `${prefix}verify 7JpAL5n`) return;
    message.content = message.content.substr(prefix.length);
    let args = message.content.split(' ');
    let cmd = args;

    if (cmd != 'verify dati') {
      message.delete(500)
      return message.channel.send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`).then(message => message.delete(30000));
    }
});

// Verification Succeeded Code 3
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (message.content === `${prefix}verify TIeVnMF`) return;
    if (message.content === `${prefix}verify anictiu`) return;
    if (message.content === `${prefix}verify 7JpAL5n`) return;

    if (message.content === `${prefix}verify sLs8FLwy`) {
      message.delete(500);
      client.channels.get(`${chat}`).send(`${message.author} just verified! Please welcome them with a warm hacking hug.`)
      return message.member.addRole('437738324183089154');
    }
});

// Verification Failed Code 3
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return; //message.delete(2000);
    if (!message.channel === `${vh}`) return;
    if (!message.channel === `${staffchannel}`) return;
    if (!message.channel === `${logs}`) return;
    if (!message.channel === `${configc}`) return;
    if (!message.content.startsWith(`${prefix}verify`)) return;//.then(message => message.delete(3000)) return;
    if (message.content === `${prefix}verify sLs8FLwy`) return;
    if (message.content.length === prefix.length) return;
    if (message.content === `${prefix}verify TIeVnMF`) return;
    if (message.content === `${prefix}verify anictiu`) return;
    if (message.content === `${prefix}verify 7JpAL5n`) return;
    message.content = message.content.substr(prefix.length);
    let args = message.content.split(' ');
    let cmd = args;

    if (cmd != 'verify sLs8FLwy') {
      message.delete(500)
      return message.channel.send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`).then(message => message.delete(30000));
    }
});
*/

// <+-=-+>   Message Events   <+-=-+>
// Message Edited
client.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.editedTimestamp === newMessage.editedTimestamp) return;
  if (oldMessage.author.bot) return;
  if (newMessage.author.bot) return;
  if (newMessage.channel.id === `${rulesc}`) return;
  if (newMessage.channel.id === `${announcements}`) return;
  if (newMessage.channel.id === `${botthings}`) return;
  if (newMessage.channel.id === `${rankinfo}`) return;
  if (newMessage.channel.id === `${stafftd}`) return;
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
});

// Message Deleted
client.on('messageDelete', message => {
  if (message.author.bot) return;
  if (message.channel === `${vh}`) return;
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
});


// <-+=+->   Guild Member Events   <-+=+->
// User Joins
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

  guild.channels.get(`${greetings}`).send(`**${member.user}** has joined the server! To gain access to the server you must enter the captcha sent to your direct messages in <#441663623216103426> by doing '\`=verify (captcha code)\`'`)
  var rando_imgs = ["./captcha-easy/Easy-captcha1.png", "./captcha-easy/Easy-captcha2.png", "./captcha-easy/Easy-captcha3.png",]
  member.user.send('You need this picture in order to verify and gain access to the server!', {
   files: [rando_imgs[Math.round(Math.random() * (rando_imgs.length - 1))]]
  })
  guild.channels.get(`${logs}`).send(joinlog)
});

// User Leaves
client.on('guildMemberRemove', member => {
  let guild = member.guild;

  let leavelog = new Discord.RichEmbed()
  .addField(':outbox_tray: __**User left**__', `${member.user} | ${member.user.tag}`)

  guild.channels.get(`${greetings}`).send(`**${member.user.tag}** has left the server!`)
  guild.channels.get(`${logs}`).send(leavelog)
});

// User Banned
client.on('guildBanAdd', (guild, user) => {
  guild.channels.get(`${greetings}`).send(`**${user.tag}** Was just banned from **${guild.name}**`);
});

// User Unbanned
client.on('guildBanRemove', (guild, user) => {
  guild.channels.get(`${greetings}`).send(`**${user.tag}** Was just unbanned from **${guild.name}**`);
});

/*
// =+-+=   Voice Channel Events   =+-+=
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
*/
