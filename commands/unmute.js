module.exports.config = {
    name: "unmute",
    description: "Unmutes a user",
    usage: "{USER}",
    ownerOnly: false,
    adminOnly: true,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    let member = message.mentions.first || args[1]
    let muterole = message.guild.roles.find('name', 'terra-mute');
    if (!member.roles.has(muterole)) {
       message.channel.send(`${member} isnt muted!`)
        return;
    }
    member.removeRole(muterole);
}