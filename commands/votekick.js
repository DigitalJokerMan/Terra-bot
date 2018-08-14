module.exports.config = {
    name: "votekick",
    description: "Votekicks a user",
    usage: "{USER}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply('Please mention a member to votekick!');
    if (!member.kickable) return message.reply('I cannot kick this user!');
    let onlinecount = message.guild.members.filter(user => user.presence.status === 'online').size - message.guild.members.filter(member => member.user.bot).size;
    let reactneeded = Math.round(onlinecount / 4);
    const agree = '✅';
    const disagree = '❎';
    const embed = new Discord.RichEmbed()
    .setColor(color)
    .setTitle(`Votekick initiated on ${member.user.username} by ${message.author.username}`)
    .addField(`${agree} Needed: `, reactneeded, true)
    .addField("Voting time :", `**2** Minutes`, true)
message.channel.send(embed).then(async m => {
        //await m.react(agree);
        //await m.react(disagree);
        const agreeReaction = await m.react(agree); // Keep what is returned
        const disagreeReaction = await m.react(disagree);
        await message.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 120000}).then(reactionss => {
        const agreeCount = agreeReaction.count - 1;
        const disagreeCount = disagreeReaction.count - 1;
        const finalValue = agreeCount - disagreeCount
        if (finalValue > reactneeded) {
            member.send(`You have been votekicked from ${message.guild}`);
            member.kick();
        //	message.channel.send(`${member} Has been succsesfully kicked!`);
        const embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(`Votekick`)
        .addField("Votekick Successful!", `${member} Has been successfully kicked!`, true)
        message.channel.send(embed)
          } else if (finalValue < reactneeded) {
            const embed = new Discord.RichEmbed()
            .setColor(color)
            .setTitle(`Votekick`)
            .addField("Votekick Failed!", `${member} Has not been kicked!`, true)
            message.channel.send(embed)
          } else if (finalValue == reactneeded) {
            const embed = new Discord.RichEmbed()
            .setColor(color)
            .setTitle(`Votekick`)
            .addField("Votekick Failed!", `${member} Has not been kicked!`, true)
            message.channel.send(embed)
          } else {
            message.channel.send("An error has occured, this should never ever happen!");
          }
        })
}).catch(console.error);
}