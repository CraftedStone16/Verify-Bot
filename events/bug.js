var prefix = "="
module.exports = message => {
    if (message.content.startsWith(prefix + 'bug')) {
      let args = message.content.split(' ').slice(1);
      let bug = args.join(' ')
      if (bug.length < 1) return message.channel.send('You must provide a message');
      client.channels.get('458359176431796244').send(`<@&441648649395765259>, **New Bug:**\n\n${bug}`)
      message.author.send(`You just submitted a bug!\n\n\`${bug}\`\nWe appreciate all bugs that we get!`)
      message.channel.send(':ok_hand: I have reported your bug.')
    }
};
