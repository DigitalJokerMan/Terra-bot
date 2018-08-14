module.exports.config = {
    name: "fortnitestats",
    description: "Returns stats of a fortnite user",
    usage: "{PLATFORM} {USERNAME}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 2
}

module.exports.run = (client, message, args) => {
		/*
		    Const platforms = ['pc', 'xbl', 'psn'];
   		 const username = args.slice(1).join(' ');
 		   let platform = args[0];

 	 	if (!platforms.includes(platform)) {
			message.reply("You need to specify a correct platform! EX: xbl, pc, psn");
			return;
		}
  	  	if (!username) {
			message.reply("You need to specify a username!");
			return;
		}
		let key = process.env.FORTNITE;
		request.get(`https://api.fortnitetracker.com/v1/profile/${platform}/${username}`)
  		.set('TRN-Api-Key', key)
		console.log("keying");
  		.then(r => console.log(r.body))
		return;
		let data = fortnite.user(username, 'pc').then(data => {
			console.log(data);
		const embed = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(`${data.username}`)
			.setDescription(`**Top Placement**\n\n**Top 3s:** *${data.stats.lifetime[2]['Top 3s']}*\n**Top 5s:** *${data.stats.lifetime[1]['Top 5s']}*\n**Top 6s:** *${data.stats.lifetime[3]['Top 6s']}*\n**Top 12s:** *${data.stats.lifetime[4]['Top 12s']}*\n**Top 25s:** *${data.stats.lifetime[5]['Top 25s']}*`)
			.addField('Matches Played', data.stats.lifetime[7]['Matches Played'], true)
			 .addField('Wins', data.stats.lifetime[8]['Wins'], true)
           		 .addField('Win Percentage', data.stats.lifetime[9]['Win%'], true)
           		 .addField('Kills', data.stats.lifetime[10]['Kills'], true)
          		  .addField('K/D Ratio', data.stats.lifetime[11]['K/d'], true);
		message.channel.send(embed)
		}).catch(e => {
			console.log(e);
		});
		*/
		message.reply('WIP');
}