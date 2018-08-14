module.exports.config = {
    name: "face",
    description: "Returns an ascii face",
    usage: "{NUMBER}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    if (!args[0]) {
        message.reply('You need to specify a number!');
        return;
    }
    switch (parseInt(args[0])) {
        case 1:
            message.channel.send('( .-. )');
            break;
        case 2:
            message.channel.send('( .o.)');
            break;
        case 3:
            message.channel.send('( ⚆ _ ⚆ )');
            break;
        case 4:
            message.channel.send('( ﾟヮﾟ)');
            break;
        case 5:
            message.channel.send('(¬_¬)');
            break;
        case 6:
            message.channel.send("(ʘᗩʘ')");
            break;
        case 7:
            message.channel.send('( ︶︿︶)');
            break;
        case 8:
            message.channel.send('(¬‿¬)');
            break;
        case 9:
            message.channel.send('(ʘ‿ʘ)');
            break;
        case 10:
            message.channel.send('(ಠ_ಠ)');
            break;
        case 11:
            message.channel.send('(ಥ_ಥ)');
            break;
        default:
            message.reply('Unknown face!');
            break;
    }
    message.delete(500);
}