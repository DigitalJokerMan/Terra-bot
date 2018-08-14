module.exports = (client, message) => {
    if (message.author.bot) return;
	let first = false;
	message.member.guild.channels.forEach(async c => {
		if (!first) {
			if (c.topic && c.topic.includes('{logs}')) {
				first = true;
				// if (message.attachments !== undefined) {
				// 	c.send(`${message.member.user} deleted image`);
				// 	c.send({ files: [message.attachments.url] });
				// 	return;
				// }
				c.send(`${message.member.user} deleted message` + "```" + message.content + "```");
			}
		}
	});
}