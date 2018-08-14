module.exports.config = {
    name: "ping",
    description: "Returns the bot's ping",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    message.channel.send(`${new Date().getTime() - message.createdTimestamp} ms`);
}