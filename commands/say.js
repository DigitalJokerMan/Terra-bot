module.exports.config = {
    name: "say",
    description: "Says some text",
    usage: "{TEXT} ",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    if (!args[0]) {
        message.reply('You need to specify what to say!');
        return;
    }
    if (args.join(' ').includes("@everyone")) {
        message.reply("I cant @ everyone!");
        return;
    }
    message.channel.send(`${message.author} Says: ${args.join(' ')}`);
}