module.exports.config = {
    name: "uptime",
    description: "Shows how long the bot has been online",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor(color)
    .setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
    .setAuthor('Uptime', client.user.avatarURL)
    .addField('Hours', Math.round(client.uptime / (1000 * 60 * 60)), true)
    .addField('Minutes', Math.round(client.uptime / (1000 * 60)) % 60, true);
message.channel.send(embed);
}