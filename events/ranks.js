var prefix = "="
module.exports = message => {
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
    }
};
