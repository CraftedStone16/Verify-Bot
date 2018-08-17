var prefix = "="
module.exports = message => {
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
};
