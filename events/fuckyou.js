var prefix = "="
module.exports = message => {
    if (message.content.startsWith(prefix + 'fy')) {
      let args = message.content.split(' ').slice(1);
      let fymention = args.join(' ')
      if (fymention.length < 1) return message.reply('You must mention someone first.');
      message.channel.send(`${fymention}, Fuck You!`)
    } else

    if (message.content.startsWith(prefix + 'fuckyou')) {
      let args = message.content.split(' ').slice(1);
      let fymention = args.join(' ')
      if (fymention.length < 1) return message.reply('You must mention someone first.');
      message.channel.send(`${fymention}, Fuck You!`)
    }
};
