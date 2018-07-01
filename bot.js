
const Discord = require('discord.js');
const google = require('google');
const fs = require('fs');
const config = require("./config.json");
const client = new Discord.Client();
var knock = true;
var jokeover = true;
var laugh = false;
var prefix = ";"
client.on('ready', () => {
  console.log(`Bots is ready and working in ${client.guilds.size} servers with ${client.users.size} users!`);
  client.user.setActivity("Terradice&RedSponge|;help");
});
function byefaggots() {
    window.stop();
}
client.on('guildMemberAdd', member => {
       member.send(`Welcome to the server, ${member}!`);
       console.log(`${member.user.username} has joined`);
});
client.on('message', message => {
		var command = message.content.toLowerCase();
		if (message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;
		if (command === prefix + "ev_toggle") {
			setConfigEntry("commands.cmd_eval.embed", !config.commands.cmd_eval.embed);
			message.channel.send("Toggled embed mode for eval");
		}
		if (message.content.toLowerCase().startsWith(prefix + "eval")) {
			if(message.author.id !== "244111430956089344" && message.author.id !== "263995600641589248") return;
				var error = false;
				var pidor = message.content;
				if(pidor == (";eval")) message.channel.send("You need to specify a function!"); return;
				for(var entry of config.commands.cmd_eval.replace) {
					pidor = pidor.replace(entry[0], entry[1]);
				}
				try {
				message.channel.send("Function: ```" + pidor + "```\n" + "Result:\n" + "```" + eval(pidor) + "```");
				} catch(e) {
				message.channel.send("Function: ```" + pidor + "```\n" + "Result:\n" + "```" + e + "```");
				}
		}
		if (command.startsWith(prefix + "google")) {
			var lookup = message.content.replace(";google ", "");
			message.channel.send("<a:googling:426453223310622740>" + " Loading...").then(msg => {
 			google(lookup, (err, res) => {
				if (err) console.error(err);
				else {
					let url = res.links[res.start].href; //you can also use .href instead of .link
					if (url != null) {
						msg.edit(url);
					} else {
						msg.edit("error");
					}
					}
			});
			});
		}
		if (command.startsWith(prefix + "test")) {
			message.channel.send('Working ');
		}
		if (command.startsWith(prefix + "embed")) {
			message.channel.send('Working ');
		}
		if (command.startsWith(prefix + "ping")) {
			message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
		}
		if (command.startsWith(prefix + "kick")) {
			let caller = message.guild.members.get(message.author.id);
			let has_kick = caller.hasPermission("KICK_MEMBERS");
    			if(!has_kick) return message.reply("Sorry, you don't have permissions to use this!");
    			let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    			if(!member) return message.reply("Please mention a valid member of this server");
    			if(!member.kickable) return message.reply("I cannot kick this user");
    				let reason = message.content.replace(";kick ", "");
				reason = reason.replace(member, "");
    			if(!reason) reason = "No reason provided";
			member.send(`You have been kicked from ${message.guild.name} by ${message.author.tag} for reason: ${reason}`).then(kicke => {
    			member.kick(reason)
			});
    			message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
 		 }
		if (command.startsWith(prefix + "help")) {
			var googlehelp = "Use ;google for googling stuff \n";
			var codehelp =  "Use ;code to see my code \n";
			var uptimehelp = "Use ;uptime to see how long i have been up \n";
			var pinghelp = "Use ;ping to see your ping to the bot \n";
			var idhelp = "Use ;id to see your user id \n";
			var randomhelp = "Use ;dice to generate a random number between 1-6";
			var kickhelp = "Use ;kick to kick other members (Admin only) \n";
			var morehelp = "More will be added in the future, contact us; @RedSponge#8461 & @Terradice#7561";
			var concat = googlehelp.concat(codehelp.concat(uptimehelp.concat(pinghelp.concat(idhelp.concat(kickhelp.concat(morehelp))))));
			client.users.get(message.author.id).send(concat);
			message.channel.send(message.author + " Check DM's");
		}
		if (command.startsWith(prefix + "code")) {
			message.channel.send('https://github.com/Terradice/Terra-bot');
		}
		if (command.startsWith(prefix + "id")) {
			message.channel.send(`ID:  ${message.author.id}`);
		}
		if (command.startsWith(prefix + "dice")) {
			message.channel.send(Math.floor(Math.random()*(6-1+1)+1))
		}
		if (command.startsWith(prefix + "uptime")) {
			const embed = new Discord.RichEmbed()
		.setColor(530118)
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.setAuthor("Uptime", client.user.avatarURL)
		.addField("Hours",Math.round(client.uptime / (1000 * 60 * 60)), true )
		.addField("Minutes", Math.round(client.uptime / (1000 * 60)) % 60, true);
		message.channel.send(embed)
		}
		if (command.startsWith(prefix + "leave")) {
			if(message.author.id !=="244111430956089344") return;
			message.channel.send('Leaving...');
			client.users.get("244111430956089344").send("i left.. " );
			setTimeout(byefaggots, 3000)
		} 
});
 
function setConfigEntry(key, value) {
	config[key] = value;

	fs.writeFile("./config.json", JSON.stringify(config), function (err) {
	if (err) return console.log(err);
	console.log(JSON.stringify(config));
	console.log('writing to ' + "./config.json");
});
}
client.login(process.env.TOKEN);
