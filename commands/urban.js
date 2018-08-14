const urban = require('relevant-urban');

module.exports.config = {
    name: "urban",
    description: "Gets definition of text from urban dictionary",
    usage: "{TEXT}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    let search = args.join(' ');
    urban(search).then(result => {
        let title = result.word;
        let description = result.definition;
        let example = result.example;
        let upvote = result.thumbsUp;
        let downvote = result.thumbsDown;
        let link = result.urbanURL;
        let tags = result.tags.join(' ');
        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setTitle(title)
            .setURL(link)
            .addField('Definition', description, false)
            .addField('examples', example, false)
            .addField('tags', tags, false)
            .addField('Upvotes', `:thumbsup:${upvote}`, true)
            .addField('Downvotes', `:thumbsdown:${downvote}`, true);
        message.channel.send(embed);
    });
}