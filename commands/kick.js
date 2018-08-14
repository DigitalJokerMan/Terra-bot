module.exports.config = {
    name: "kick",
    description: "Kicks a user from the server",
    usage: "{USER} {REASON}",
    ownerOnly: false,
    adminOnly: true,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    let caller = message.guild.members.get(message.author.id);
    let has_kick = caller.hasPermission('KICK_MEMBERS');
    if (!has_kick) return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply('Please mention a valid member of this server');
    if (!member.kickable) return message.reply('I cannot kick this user');
    let reason = message.content.replace(';kick ', '');
    reason = reason.replace(member, '');
    if (!reason) reason = 'No reason provided';
    member.send(`You have been kicked from ${message.guild.name} by ${message.author.tag} for reason: ${reason}`).then(kicke => {
        member.kick(reason);
    });
    message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
}