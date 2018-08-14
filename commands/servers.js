module.exports.config = {
    name: "servers",
    description: "Shows how many servers the bot is currently in",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    message.channel.send(`I am currently running in \`${client.guilds.size }\` servers!`);
}