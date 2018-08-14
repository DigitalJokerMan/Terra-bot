const search = require('youtube-search');

module.exports.config = {
    name: "youtube",
    description: "Searches for a video on youtube",
    usage: "{TEXT}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    search(args.join(' '), opts, (err, results) => {
        if (err) return;
        let result = results[0].link;
        let resultname = results[0].title;
        message.channel.send(result);
    });
}