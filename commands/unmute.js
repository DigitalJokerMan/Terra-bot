module.exports.config = {
    name: "unmute",
    description: "Unmutes a user",
    usage: "{USER}",
    ownerOnly: false,
    adminOnly: true,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    let muterole = message.guild.roles.find('name', 'terra-mute');
    if (!message.member.user.roles.has(muterole)) {
        message.reply(`${member} isnt muted!`)
        return;
    }
    member.removeRole(muterole);
}