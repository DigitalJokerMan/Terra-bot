module.exports.config = {
    name: "invite",
    description: "Grabs an invite link.",
    usage: "",
    onwerOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    message.reply('Click the link below to add me to your server https://discordapp.com/oauth2/authorize?client_id=459782347936628747&scope=bot&permissions=8');
}