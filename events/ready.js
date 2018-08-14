const Bot = require("../bot.js");

module.exports = (client) => {
    console.log(`Bots is ready and working in ${client.guilds.size} servers with ${client.users.size} users!`);
	client.user.setActivity('Terradice&RedSponge|;help');
	for (var key of client.guilds.keys()) {
		Bot.Servers[key] = {};
		Bot.Servers[`${key}`].queue = [];
		Bot.Servers[`${key}`].playing = false;
	}
}