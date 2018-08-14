const Discord = require("discord.js");

module.exports.config = {
    name: "help",
    description: "Shows a help menu.",
    usage: "",
    ownerOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    var embed = new Discord.RichEmbed()
        .setTitle("Help")
        .setColor(Math.floor(Math.random() * (16777216 - 0 + 1) + 0))
        .setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png');

    var description = "";
    var lineSize = 0;

    client.commands.forEach(command => {
        if (command.config.ownerOnly) return;
        description += " `" + command.config.name + "` ";
        lineSize++;

        if (lineSize > 6) {
            lineSize = 0;
            description += "\n";
        }
    });

    embed.setDescription(description);

    message.channel.send({embed});
}