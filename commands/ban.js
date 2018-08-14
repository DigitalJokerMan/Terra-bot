module.exports.config = {
    name: "ban",
    description: "Bans a user from the server",
    usage: "{USER} {REASON}",
    ownerOnly: false,
    adminOnly: true,
    argsMinimum: 2
}

module.exports.run = (client, message, args) => {
    let caller = message.guild.members.get(message.author.id);
    let has_ban = caller.hasPermission('BAN_MEMBERS');
    if (!has_ban) return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply('Please mention a valid member of this server');
    if (!member.bannable) return message.reply('I cannot ban this user');
    let reason = message.content.replace(';kick ', '');
    reason = reason.replace(member, '');
    if (!reason) reason = 'No reason provided';
    member.send(`You have been banned from ${message.guild.name} by ${message.author.tag} for reason: ${reason}`).then(kicke => {
        member.ban(reason);
    });
    message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
}