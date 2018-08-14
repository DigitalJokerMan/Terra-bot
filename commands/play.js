const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
var prefix = config.prefix;
var opts = {
	maxResults: 10,
	key: process.env.youtubekey
};

module.exports.config = {
    name: "play",
    description: "Searches text on youtube and plays the first result on a loop",
    usage: "{TEXT}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
	if (message.member.voiceChannel) {
        try {
            if (message.member.voiceChannelID !== message.guild.voiceConnection.channel.id) {
                message.reply("You're not in the same voice channel as me!");
                return;
            }
        } catch (e) {}
        if (!args[0]) {
            message.reply('You must specify a name!');
            return;
        }
        let result;
        let resultname;
        search(args.join(' '), opts, (err, results) => {
            if (err) return;
            result = results[0].link; // Servers[message.guild.id].queue.push(result);
            resultname = results[0].title;
            message.reply(`Added ${results[0].title} to the queue`);
            servers[message.guild.id].queue.push(results[0].link);
            console.log(servers[message.guild.id].queue.length);
        });
        const connection = message.member.voiceChannel.join().then(connection => {
            const stream = ytdl(servers[message.guild.id].queue[0], { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
            dispatcher.on('end', () => {
                dispatcher.destroy();
                console.log('Song playing');
                console.log(servers[message.guild.id].queue.length);
                servers[message.guild.id].playing = true;
                playQueue(message, resultname, connection);
            });
        });
    } else {
        message.reply('You need to join a voice channel first!');
        return;
    }
}