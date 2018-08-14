module.exports.config = {
    name: "avatar",
    description: "Shows avatar of a user",
    usage: "{USER}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    if (args[0]) {
        var user = message.mentions.users.first();
        message.reply(`Here you go! ${user.avatarURL}`);
    } else {
        message.reply(`Here you go! ${message.author.avatarURL}`);
    }
}