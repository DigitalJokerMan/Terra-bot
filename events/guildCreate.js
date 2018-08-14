module.exports = (client, guild) => {
    guild.owner.send("I'm terrabot, made by terradice, thanks for inviting me, Heres some special information, to declare a welcome channel, put {welcome} in its topic, to block swear words in a channel, put {safe} in its topic, to make a logs channel, put {logs} in its topic");
	let first = false;
	guild.channels.forEach(async c => {
		if (!first) {
			if (c.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
				c.send('Hi, my name is terrabot, thank you very much for inviting me to your server! The bot does not require admin access but some features might not work without it! Write ;help to get started, and have fun! And make sure to join my creators server to chat and have fun https://discord.gg/q8theun ');
				first = true;
			}
		}
	});
}