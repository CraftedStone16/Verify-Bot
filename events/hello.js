module.exports = message => {
  if (message.content === '=hello') {
    message.channel.send('Hello There')
  }
};
