module.exports.config = {
    name: "skin",
    description: "Shows a minecraft player's ingame skin",
    usage: "{USERNAME}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    var parameter = args[0];
    var link = 'https://minotar.net/body/GTR.png';
    if (!parameter) {
        message.reply('You need to specify a name!');
        return;
    }
    link = link.replace('GTR', parameter);
    message.channel.send({ files: [link] });
}