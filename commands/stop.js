const ytdl = require('ytdl-core');

module.exports.config = {
    name: "stop",
    description: "Stops playing music",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    if (!servers[message.guild.id].playing) {
        message.reply("I'm not playing anything!");
    }
    if (message.member.voiceChannel) {
        if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) {
            message.reply("You're not in the same voice channel as me!");
            return;
        } else {
            console.log('queue over');
            servers[message.guild.id].playing = false;
            servers[message.guild.id].queue = [];
            message.member.voiceChannel.leave();
            return;
        }
    } else {
        message.reply('You need to join a voice channel first!');
        return;
    }
}