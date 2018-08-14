module.exports = (client, member) => {
    let first = false;
	member.guild.channels.forEach(async c => {
		if (!first) {
			if (c.topic && c.topic.includes('{welcome}')) {
				first = true;
				c.send(`${member.user.username} has left!`);
			}
		}
	});
}