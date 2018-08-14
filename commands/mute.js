module.exports.config = {
    name: "mute",
    description: "Mutes a user for a specified time",
    usage: "{USER} {TIME (M)}",
    ownerOnly: false,
    adminOnly: true,
    argsMinimum: 2
}

module.exports.run = (client, message, args) => {
    if (!message.guild.roles.find('name', 'terra-mute')) {
        message.guild.createRole({
            name: 'terra-mute',
            color: 'BLUE',
            SEND_MESSAGES: false
        });
    }
    let muterole = message.guild.roles.find('name', 'terra-mute');
    message.guild.channels.forEach(async c => {
        await c.overwritePermissions(muterole, { SEND_MESSAGES: false // Overwrite
        });
    });
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You dont have permission to use this');
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply('Please mention a member to mute!');
    let caller = message.guild.members.get(message.author.id);
    let has_mute = caller.hasPermission('MANAGE_ROLES');
    if (!has_mute) return message.reply("Sorry, you don't have permissions to use this!");
    let time = args[1] * 1;
    let newtime = time * 60 * 1000;
    if (!time) return message.reply('Specify a time!');
    if (isNaN(time)) return message.reply('Time must be an integer');
    /*        If (member.user.roles.has(muterole)) {
        message.reply(`${member} is already muted!`)
        return;
    } */
    member.addRole(muterole);
    message.channel.send(`${member} Has been muted by ${caller} for ${time} minutes!`);
    setTimeout(() => {
        member.removeRole(muterole);
    }, newtime);
}