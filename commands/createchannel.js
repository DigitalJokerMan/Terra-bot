module.exports.config = {
    name: "createchannel",
    description: "Creates a channel",
    usage: "",
    ownerOnly: false,
    adminOnly: true,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    let caller = message.guild.members.get(message.author.id);
    let has_channels = caller.hasPermission('MANAGE_CHANNELS');
    if (!has_mute) return message.reply("Sorry, you don't have permissions to use this!");
    if (message.guild.roles.find('name', args.join('-'))) {
        message.reply('That channel already exists!');
        return;
    }
    message.guild.createChannel(args.join('-')).then(c => {
        c.setName(args.join('-'));
        c.sendMessage('Here you go!');
    });
}