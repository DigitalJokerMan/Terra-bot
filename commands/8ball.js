module.exports.config = {
    name: "8ball",
    description: "Returns yes or no to a question",
    usage: "{QUESTION}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    var rand = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    if (rand == 1) {
        message.reply('No');
    } else if (rand == 2) {
        message.reply('Yes');
    }
}