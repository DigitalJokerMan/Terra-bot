const ascii_text_generator = require('ascii-text-generator');

module.exports.config = {
    name: "ascii",
    description: "Turns a sentence into big ascii letters",
    usage: "{TEXT}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1
}

module.exports.run = (client, message, args) => {
    let input_text = args.join(' ');
    let text = `\`\`\`${ascii_text_generator(input_text, '2')}\`\`\``;
    console.log(text);
    try {
        message.channel.send(text);
    } catch (e) {
        message.reply('The message is too long to be sent!');
        return;
    }
}