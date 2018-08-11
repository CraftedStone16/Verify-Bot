const superagent = require('superagent');
var prefix = "="
module.exports = message => {
    if (message.content === `${prefix}dog`) {
      let {body} = superagent
      .get(`https://random.dog/woof.json?filter=png,jpg,jpeg,mp4`);

      let dogembed = new Discord.RichEmbed()
      .setImage(body.url);
      message.channel.send(dogembed)
    } else

    if (message.content === `${prefix}cat`) {
      let {body} = superagent
      .get(`http://aws.random.cat/meow`);

      let catembed = new Discord.RichEmbed()
      .setImage(body.file);
      message.channel.send(catembed)
    } else

    if (message.content.startsWith(prefix + '8ball')) {
      let args = message.content.split(' ').slice(1);
      if (!args[2]) return message.channel.send('Please ask a full question!');
      let replies = ["Yes.", "No.", "I don't know", "Ask Again Later"];

      let result = Math.floor((Math.random() * replies.length));
      let question = args.slice(0).join(" ");
      message.channel.send(`${replies[result]}`)
    } else
    
    if (message.content === `${prefix}gamble`) {
      let args = message.content.split(' ').slice(1);
      let replies = [
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "You Lose!",
      "**YOU WIN!!**\n Please Ask Opensource what your prize is!"];

      let result = Math.floor((Math.random() * replies.length));
      message.channel.send(`${replies[result]}`)
    }
};
