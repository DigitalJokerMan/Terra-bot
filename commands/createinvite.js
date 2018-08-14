module.exports.config = {
    name: "createinvite",
    description: "Creates an invite to the channel",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    message.channel.createInvite().then(invite =>
        message.channel.send(invite.url)
    );
}