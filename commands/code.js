module.exports.config = {
    name: "code",
    description: "Shows the bot's github repo",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    message.channel.send('https://github.com/Terradice/Terra-bot');
}