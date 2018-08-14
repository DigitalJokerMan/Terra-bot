const google = require('google');

module.exports.config = {
    name: "google",
    description: "Googles some text and returns the first result",
    usage: "{TEXT}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    var lookup = args.join(' ');
    message.channel.send('<a:googling:426453223310622740>' + ' Loading...').then(msg => {
        google(lookup, (err, res) => {
            if (err) { console.error(err); } else {
                let url = res.links[res.start].href; // You can also use .href instead of .link
                if (url != null) {
                    msg.edit(url);
                } else {
                    msg.edit('error');
                }
            }
        });
    });
}