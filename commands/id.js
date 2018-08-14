module.exports.config = {
    name: "id",
    description: "Returns a user's ID",
    usage: "{USER}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    if (args[0]) {
        message.channel.send(`ID:  ${message.mentions.members.first().id}`);
        return;
    }
    message.channel.send(`ID:  ${message.author.id}`);
}