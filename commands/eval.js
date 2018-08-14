module.exports.config = {
    name: "eval",
    description: "Runs a function",
    usage: "{FUNCTION}",
    ownerOnly: true,
    adminOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    if (message.author.id !== '244111430956089344' && message.author.id !== '263995600641589248') return message.reply('Only the owners of the bot have access to that command!');
    let pidor = args.join(' ');
    try {
        message.channel.send(`Function: \`\`\`${pidor}\`\`\`\n` + `Result:\n` + `\`\`\`${eval(pidor)}\`\`\``);
    } catch (e) {
        message.channel.send(`Function: \`\`\`${pidor }\`\`\`\n` + `Result:\n` + `\`\`\`${e}\`\`\``);
    }
}