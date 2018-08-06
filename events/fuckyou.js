var prefix = "="
module.exports = message => {
    if (message.content.startsWith(prefix + 'fy')) {
      let fymention = args.join(' ')
      if (fymention.length < 1) return message.reply('You must mention someone first.');
      message.channel.send(`${fymention}, Fuck You!`)
    } else

    if (message.content.startsWith(prefix + 'fuckyou')) {
      let fymention = args.join(' ')
      if (fymention.length < 1) return message.reply('You must mention someone first.');
      message.channel.send(`${fymention}, Fuck You!`)
    }
};
