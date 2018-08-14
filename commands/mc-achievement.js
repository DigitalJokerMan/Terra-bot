module.exports.config = {
    name: "mc-achievement",
    description: "Returns a minecraft achievement with the text",
    usage: "{TEXT}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    var description = args.join('%20');
    if (!description) {
        message.reply('You need to specify a description!');
    }
    var link = 'http://www.minecraftachievement.net/achievement/a.php?i=2&h=TerraBot&t=description';
    link = link.replace('description', description);
    message.channel.send(link);
}