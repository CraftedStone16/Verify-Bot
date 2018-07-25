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
var memed = '437740486091079682' // Meme Dump Channel
var stafftd = '444604798189305856' // Staff To Do Channel
var staffchannel = '441718552865800192'// Main Staff Talk Channels
var sticket = '449654475481808896' // Support Ticket Channel
var logs = '437757021953982485' // logging channel
var configc = '437756098573893642' // Config Channel

/*=- Prefix & Prefix Notes + Bot Information -=*/


/* ==-> Manually Change these Prefixes;
+ Role Commands
+ Help Commands
+ Verification Commands*/

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
  client.channels.get('448873575747944448').send('I have Restarted!');
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
    let bypass = message.guild.roles.find('name', 'Advertising');
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
    if (message.channel.type === "dm") return;
    const giveme = {
      "=giveme Bot-Updates": `458349140007583765`,
      "=giveme Announcements": `458349140640792598`,
      "=giveme News": `458349141467332608`,
      "=giveme Giveaways": `458349417838149633`
    };
    const leave = {
      "=leave Bot-Updates": `458349140007583765`,
      "=leave Announcements": `458349140640792598`,
      "=leave News": `458349141467332608`,
      "=leave Giveaways": `458349417838149633`
    };

    if (message.content.startsWith(prefix + 'roles')) {
      message.channel.send(`__**Available Roles/Names:**__\n• Announcements\n• News\n• Bot-Updates\n• Giveaways\n\nUsage: \`${prefix}giveme <Name (listed above)>\` (To get the role) \`${prefix}leave <Name (listed above)>\` (To remove the role\nPLEASE NOTE: You have to type it exactly like it is in the list for it to work!`)
    } else

    if(giveme[message.content]) {
      message.delete();
      message.channel.send(`Ok! I have given you role.`).then(message => message.delete(60000));
      return message.member.addRole(giveme[message.content]);
    } else if(leave[message.content]) {
      message.delete()
      message.channel.send(`Ok! I have removed that role from you.`);
      return message.member.removeRole(leave[message.content]);
    }
});

// Link Deleter
client.on('message', async message => {
  let botowner = message.guild.roles.find('name', 'Bot Owner');
  let bypass = message.guild.roles.find('name', 'Advertising');
  
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.channel.id === `${memed}`) return;
  if (message.channel.id === `${rulesc}`) return;
  if (message.channel.id === `${announcements}`) return;
  if (message.channel.id === `${botthings}`) return;
  if (message.channel.id === `${rankinfo}`) return;
  if (message.channel.id === `${stafftd}`) return;
  if (message.author.roles.has(botowner.id)) return;
  if (message.author.roles.has(bypass.id)) return;

  let linkwarnlog = new Discord.RichEmbed()
     .setColor('PURPLE')
     .addField(':warning: __User Warned__', `Verify Bot **Warned** ${message.author} for \`Posting Links in an unallowed channel\` (${message.channel})! [Automated]`)
     .setFooter(`${message.createdAt}`)
  let linkembedwarn = new Discord.RichEmbed ()
     .setTitle('')
     .setThumbnail(`${message.author.displayAvatarURL}`)
     .setColor('PURPLE')
     .addField('Action:', 'Warning')
     .addField('User:', `${message.author.tag}`)
     .addField('Moderator:', `Verify Bot [Automated]`)
     .addField('Channel:', `${message.channel}`)
     .addField('Reason:', `Posting Links in a unallowed channel`)
  var re =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.exec(message.cleanContent);
  if (re != null) {
    message.delete()
    message.channel.send(`${message.author}, You can not include links in your message!`).then(message => message.delete(60000));
    client.channels.get(`${punishments}`).send(linkembedwarn)
    client.channels.get(`${logs}`).send(linkwarnlog)
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
    const help = {
      "=help help": `\`\`\`Displays the commands list\n\nUsage: ${prefix}help     Alias; ${prefix}h\`\`\``,
      "=h help": `\`\`\`Displays the commands list\n\nUsage: ${prefix}help     Alias; ${prefix}h\`\`\``,
      "=help h": `\`\`\`Displays the commands list\n\nUsage: ${prefix}h     Alias; ${prefix}help\`\`\``,
      "=h h": `\`\`\`Displays the commands list\n\nUsage: ${prefix}h     Alias; ${prefix}help\`\`\``,
      "=help ping": `\`\`\`Pong! :joy:\n\nUsage: ${prefix}ping\`\`\``,
      "=h ping": `\`\`\`Pong! :joy:\n\nUsage: ${prefix}ping\`\`\``,
      "=help fy": `\`\`\`A command that you trigger the bot to tell someone "Fuck You"\n\nUsage: ${prefix}fy <user>     Alias; ${prefix}fuckyou\n<> = Required  [] = Optional\`\`\``,
      "=h fy": `\`\`\`A command that you trigger the bot to tell someone "Fuck You"\n\nUsage: ${prefix}fy <user>     Alias; ${prefix}fuckyou\n<> = Required  [] = Optional\`\`\``,
      "=help fuckyou": `\`\`\`A command that you trigger the bot to tell someone "Fuck You"\n\nUsage: ${prefix}fuckyou <user>     Alias; ${prefix}fy\n<> = Required  [] = Optional\`\`\``,
      "=h fuckyou": `\`\`\`A command that you trigger the bot to tell someone "Fuck You"\n\nUsage: ${prefix}fuckyou <user>     Alias; ${prefix}fy\n<> = Required  [] = Optional\`\`\``,
      "=help setgame": `\`\`\`Sets my game status to the specified name\n\nUsage: ${prefix}setgame <game name>     Alias; ${prefix}sg\n<> = Required  [] = Optional\`\`\``,
      "=h setgame": `\`\`\`Sets my game status to the specified name\n\nUsage: ${prefix}setgame <game name>     Alias; ${prefix}sg\n<> = Required  [] = Optional\`\`\``,
      "=help sg": `\`\`\`Sets my game status to the specified name\n\nUsage: ${prefix}sg <game name>     Alias; ${prefix}setgame\n<> = Required  [] = Optional\`\`\``,
      "=h sg": `\`\`\`Sets my game status to the specified name\n\nUsage: ${prefix}sg <game name>     Alias; ${prefix}setgame\n<> = Required  [] = Optional\`\`\``,
      "=help purge": `\`\`\`Deletes the specified amount of messages - Limit: 100 (Changing Soon)\n\nUsage: ${prefix}purge <number>     Alias; ${prefix}prune\n<> = Required  [] = Optional\`\`\``,
      "=h purge": `\`\`\`Deletes the specified amount of messages - Limit: 100 (Changing Soon)\n\nUsage: ${prefix}purge <number>     Alias; ${prefix}prune\n<> = Required  [] = Optional\`\`\``,
      "=help prune": `\`\`\`Deletes the specified amount of messages - Limit: 100 (Changing Soon)\n\nUsage: ${prefix}prune <number>     Alias; ${prefix}purge\n<> = Required  [] = Optional\`\`\``,
      "=h prune": `\`\`\`Deletes the specified amount of messages - Limit: 100 (Changing Soon)\n\nUsage: ${prefix}prune <number>     Alias; ${prefix}purge\n<> = Required  [] = Optional\`\`\``,
      "=help warn": `\`\`\`Warns the user that you mention\n\nUsage: ${prefix}warn <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``,
      "=h warn": `\`\`\`Warns the user that you mention\n\nUsage: ${prefix}warn <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``,
      "=help kick": `\`\`\`Kicks the user that you mention\n\nUsage: ${prefix}kick <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``,
      "=h kick": `\`\`\`Kicks the user that you mention\n\nUsage: ${prefix}kick <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``,
      "=help mute": `\`\`\`Mutes the user that you mention\n\nUsage: ${prefix}mute <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``,
      "=h mute": `\`\`\`Mutes the user that you mention\n\nUsage: ${prefix}mute <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``,
      "=help unmute": `\`\`\`Unmutes the user that you mention\n\nUsage: ${prefix}unmute <user (mention the user)>\n<> = Required  [] = Optional\`\`\``,
      "=h unmute": `\`\`\`Unmutes the user that you mention\n\nUsage: ${prefix}unmute <user (mention the user)>\n<> = Required  [] = Optional\`\`\``,
      "=help ban": `\`\`\`Bans the user that you mention\n\nUsage: ${prefix}ban <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``,
      "=h ban": `\`\`\`Bans the user that you mention\n\nUsage: ${prefix}ban <user (mention the user)> <reason>\n<> = Required  [] = Optional\`\`\``,
      "=help unban": `\`\`\`Unbans a certain user by using their user id\n\nUsage: ${prefix}unban <user id>\n<> = Required  [] = Optional\`\`\``,
      "=h unban": `\`\`\`Unbans a certain user by using their user id\n\nUsage: ${prefix}unban <user id>\n<> = Required  [] = Optional\`\`\``,
      "=help userinfo": `\`\`\`Gives you detailed information of the account of the person that you mention.\n\nUsage: ${prefix}userinfo <mention user>\n<> = Required  [] = Optional\`\`\``,
      "=h userinfo": `\`\`\`Gives you detailed information of the account of the person that you mention.\n\nUsage: ${prefix}userinfo <mention user>\n<> = Required  [] = Optional\`\`\``,
      "=help promote": `\`\`\`Promotes a certain user from Verified to the Members rank\n\nUsage: ${prefix}promote <user>\n<> = Required  [] = Optional\`\`\``,
      "=h promote": `\`\`\`Promotes a certain user from Verified to the Members rank\n\nUsage: ${prefix}promote <user>\n<> = Required  [] = Optional\`\`\``,
      "=help poll": `\`\`\`Generates a poll for users to vote on. Currently only Yes or No polls\n\nUsage: ${prefix}poll <poll question>\n<> = Required  [] = Optional\`\`\``,
      "=h poll": `\`\`\`Generates a poll for users to vote on. Currently only Yes or No polls\n\nUsage: ${prefix}poll <poll question>\n<> = Required  [] = Optional\`\`\``,
      "=help 8ball": `\`\`\`It's so majestic that I can't even tell you the secrets\n\nUsage: ${prefix}8ball <question>\n<> = Required  [] = Optional\`\`\``,
      "=h 8ball": `\`\`\`It's so majestic that I can't even tell you the secrets\n\nUsage: ${prefix}8ball <question>\n<> = Required  [] = Optional\`\`\``,
      "=help cat": `\`\`\`Gives you a random cat meme\n\nUsage: ${prefix}cat\n<> = Required  [] = Optional\`\`\``,
      "=h cat": `\`\`\`Gives you a random cat meme\n\nUsage: ${prefix}cat\n<> = Required  [] = Optional\`\`\``,
      "=help dog": `\`\`\`Gives you a random dog meme\n\nUsage: ${prefix}dog\n<> = Required  [] = Optional\`\`\``,
      "=h dog": `\`\`\`Gives you a random dog meme\n\nUsage: ${prefix}dog\n<> = Required  [] = Optional\`\`\``,
      "=help hierarchy": `\`\`\`Gives you a list of the current ranks on the server\n\nUsage: ${prefix}hierarchy     Alias; ${prefix}ranks\n<> = Required  [] = Optional\`\`\``,
      "=h hierarchy": `\`\`\`Gives you a list of the current ranks on the server\n\nUsage: ${prefix}hierarchy     Alias; ${prefix}ranks\n<> = Required  [] = Optional\`\`\``,
      "=help ranks": `\`\`\`Gives you a list of the current ranks on the server\n\nUsage: ${prefix}ranks     Alias; ${prefix}hierarchy\n<> = Required  [] = Optional\`\`\``,
      "=h ranks": `\`\`\`Gives you a list of the current ranks on the server\n\nUsage: ${prefix}ranks     Alias; ${prefix}hierarchy\n<> = Required  [] = Optional\`\`\``,
      "=help stats": `\`\`\`Tells you all kinds of information about me including my versions\n\nUsage: ${prefix}stats\n<> = Required  [] = Optional\`\`\``,
      "=h stats": `\`\`\`Tells you all kinds of information about me including my versions\n\nUsage: ${prefix}stats\n<> = Required  [] = Optional\`\`\``,
      "=help uptime": `\`\`\`Tells you how long I have been up and running in days, hours, minutes, and seconds\n\nUsage: ${prefix}uptime\n<> = Required  [] = Optional\`\`\``,
      "=h uptime": `\`\`\`Tells you how long I have been up and running in days, hours, minutes, and seconds\n\nUsage: ${prefix}uptime\n<> = Required  [] = Optional\`\`\``,
      "=help sinfo": `\`\`\`Tells you all kinds of information about this server\n\nUsage: ${prefix}sinfo\n<> = Required  [] = Optional\`\`\``,
      "=h ticket": `\`\`\`Get support with something that you need help with and it go sraight to the Support Team\n\nUsage: ${prefix}ticket <ticket message>\n<> = Required  [] = Optional\`\`\``,
      "=help ticket": `\`\`\`Get support with something that you need help with and it go sraight to the Support Team\n\nUsage: ${prefix}ticket <ticket message>\n<> = Required  [] = Optional\`\`\``,
      "=h bug": `\`\`\`Reports a bug within the server or the bot and it will go straight the Developers\n\nUsage: ${prefix}bug <bug in details>\n<> = Required  [] = Optional\`\`\``,
      "=help bug": `\`\`\`Reports a bug within the server or the bot and it will go straight the Developers\n\nUsage: ${prefix}bug <bug in details>\n<> = Required  [] = Optional\`\`\``,
      "=h roles": `\`\`\`Gives you the list of self assignable roles\n\nUsage: ${prefix}roles\n<> = Required  [] = Optional\nCheckout ${prefix}h giveme or ${prefix}h leave\`\`\``,
      "=help roles": `\`\`\`Gives you the list of self assignable roles\n\nUsage: ${prefix}roles\n<> = Required  [] = Optional\nCheckout ${prefix}h giveme or ${prefix}h leave\`\`\``,
      "=h giveme": `\`\`\`Get a certain role that you want, this allows you to be notified for certain Announcements instead of all (Check ${prefix}roles for the list)\n\nUsage: ${prefix}giveme <role name>\n<> = Required  [] = Optional\nCheckout ${prefix}h leave or ${prefix}roles\`\`\``,
      "=help giveme": `\`\`\`Get a certain role that you want, this allows you to be notified for certain Announcements instead of all (Check ${prefix}roles for the list)\n\nUsage: ${prefix}giveme <role name>\n<> = Required  [] = Optional\nCheckout ${prefix}h leave or ${prefix}roles\`\`\``,
      "=h leave": `\`\`\`Leave a certain role using this command (Check ${prefix}roles for the list)\n\nUsage: ${prefix}leave <role name>\n<> = Required  [] = Optional\nCheckout ${prefix}h giveme or ${prefix}roles\`\`\``,
      "=help verify": `\`\`\`A command that is used in the verification channel\`\`\``,
      "=h shutdown": `\`\`\`Shutsdown the bot and doesn\'t restart with this command\n\nUsage: ${prefix}shutdown     Alias; ${prefix}quit\n<> = Required  [] = Optional\`\`\``,
      "=help shutdown": `\`\`\`Shutsdown the bot and doesn\'t restart with this command\n\nUsage: ${prefix}shutdown     Alias; ${prefix}quit\n<> = Required  [] = Optional\`\`\``,
      "=h quit": `\`\`\`Shutsdown the bot and doesn\'t restart with this command\n\nUsage: ${prefix}quit     Alias; ${prefix}shutdown\n<> = Required  [] = Optional\`\`\``,
      "=help quit": `\`\`\`Shutsdown the bot and doesn\'t restart with this command\n\nUsage: ${prefix}quit     Alias; ${prefix}shutdown\n<> = Required  [] = Optional\`\`\``,
    };
    if(help[message.content]) {
      message.delete(10000)
      message.channel.send(help[message.content]).then(message => message.delete(60000));
    }
});

client.on('message', async message => {
  let helpembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('__**Help**__')
    .addField('**Main (Informational)**', `${p}help\n${p}h\n${p}userinfo\n${p}sinfo\n${p}ping\n${p}hierarchy\n${p}ranks\n${p}stats\n${p}uptime\n${p}roles\n\u200b`)
    .addField('**Main (Useful)**', `${p}ticket${p}bug\n${p}verify\n${p}giveme\n${p}leave\n\u200b`)
    .addField('**Main (Fun)**', `${p}fuckyou\n${p}fy\n${p}8ball\n${p}cat\n${p}dog\n\u200b`)
    .addField('**Permissioned**', `${p}promote (Member Role Needed)\n${mp}poll\n${mp}setgame\n${mp}sg\n${mp}purge\n${mp}prune\n${mp}warn\n${mp}kick\n${mp}mute\n${mp}unmute\n${mp}ban\n${mp}unban\n${mp}quit\n${mp}shutdown\n\u200b`)
    .addField('\u200b', `You can do \`${p}help <command>\` or \`${p}h <command>\` for more information for that command.`)

    if (message.content === `${prefix}help`) {
      message.delete()
      return message.channel.send(helpembed).then(message => message.delete(60000));
    } else if (message.content === `${prefix}h`) {
      message.delete()
      return message.channel.send(helpembed).then(message => message.delete(60000));
    }
})

// Verification Code
client.on('message', async message => {
   // var c_easy = ["aumso", "dati", "sLs8FLwy",]
    const c_easy = {
      "=verify aumso": `Check your DMs for the Verification Code Part 2! (The code deletes after 5 minutes)`,
      "=verify dati": `Check your DMs for the Verification Code Part 2! (The code deletes after 5 minutes)`,
      "=verify sLs8FLwy": `Check your DMs for the Verification Code Part 2! (The code deletes after 5 minutes)`
    };
    const c_hard1 = {
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
    var c_hard2 = ["./captcha-hard/Hard-captcha1.png", "./captcha-hard/Hard-captcha2.png", "./captcha-hard/Hard-captcha3.png",]


    if(c_easy[message.content]) {
      message.delete();
      client.channels.get(`${vh}`).send(c_easy[message.content]).then(message => message.delete(60000));
      message.member.addRole('467428407400202240');
      return message.author.send('You need this picture in order to verify and gain access to the server!', {
       files: [c_hard2[Math.round(Math.random() * (c_hard2.length - 1))]]
      }).then(message => message.delete(300000));
    } else if(c_hard1[message.content]) {
      message.delete();
      client.channels.get(`${chat}`).send(c_hard1[message.content]);
      message.member.addRole('437738324183089154');
      return message.member.removeRole('467428407400202240');
    } else {
      client.channels.get(`${vh}`).send(`Sorry ${message.author}, You have provided the incorrect captcha code! The correct code can be found in your DMs!`).then(message => message.delete(60000));
    }
});


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
  member.user.send('You need this picture in order to verify and gain access to the server! (Disappears in 5 minutes)', {
   files: [rando_imgs[Math.round(Math.random() * (rando_imgs.length - 1))]]
  }).then(message => message.delete(300000));
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
