module.exports = (client, member) => {
    console.log(`${member.user.username} has joined`);
	let first = false;
	member.guild.channels.forEach(async c => {
		if (!first) {
			if (c.topic && c.topic.includes('{welcome}')) {
				first = true;
				c.send(`${member.user} has joined!`);
			}
		}
	});
}