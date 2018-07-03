
const Discord = require('discord.js');
const google = require('google');
const config = require("./config.json");
const ytdl = require("ytdl-core");
var search = require('youtube-search');
const client = new Discord.Client();
const streamOptions = { seek: 0, volume: 1 };
var promise = "";
var prefix = config.prefix;
var opts = {
  maxResults: 10,
  key: process.env.youtubekey
};
client.on('ready', () => {
  console.log(`Bots is ready and working in ${client.guilds.size} servers with ${client.users.size} users!`);
  client.user.setActivity("Terradice&RedSponge|;help");
});
client.voiceConnections.forEach(channel => channel.disconnect())
function byefaggots() {
    window.stop();
}

client.on('guildMemberAdd', member => {
       member.send(`Welcome to the server, ${member}!`);
       console.log(`${member.user.username} has joined`);
});
client.on('message', message => {
	if (!message.guild.roles.find("name", "terra-mute")) {
	message.guild.createRole({
  		name: 'terra-mute',
 		color: 'BLUE',
		SEND_MESSAGES: false
	})
	
	}
		let msg = message.content;
		if (message.author.bot) return;
		if (!message.guild) return;
		if(msg.startsWith(prefix)) {
			msg = msg.substring(prefix.length);
			let command = msg.split(" ")[0];
			let args = msg.split(" ").slice(1);

			handleCommand(message, command, args);
		}
});

function handleCommand(message, command, args) {
	console.log("RUNNING COMMAND " + command + " WITH ARGS " + args);
	if (command == "google") {
			var lookup = args.join(" ");
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
	if(command == "eval") {
		if(message.author.id !== "244111430956089344" && message.author.id !== "263995600641589248") return;
		let pidor = args.join(" ");
		try {
			message.channel.send("Function: ```" + pidor + "```\n" + "Result:\n" + "```" + eval(pidor) + "```");
		} catch(e) {
			message.channel.send("Function: ```" + pidor + "```\n" + "Result:\n" + "```" + e + "```");
		}
		}
	if (command == "ping") {
		message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
	}
	if (command == "play") {
		    if (message.member.voiceChannel) {
			    if (!args[0]) {
				    message.reply("You must specify a name!");
				    return;
			    }
				 let result;
				 let resultname;
			    search(args.join(' '), opts, function(err, results) {
 				 if(err) return console.log(err);
				 result = results[0].link;
				 resultname = results[0].title;
			    });
				 console.log(result);
				 console.log(resultname);
 			     const connection = message.member.voiceChannel.join().then(connection => {
			    if (promise.channel.guild.voiceConnection) {
				    message.reply("I'm already in a voice channel!");
				    return;
			    }
			     message.reply(`Now playing ${resultname}`);
            			const stream = ytdl(result,  { filter : 'audioonly' });
            			const dispatcher = connection.playStream(stream, streamOptions);
				dispatcher.on('end', () => {
					message.reply('Queue finished, disconnecting...');
					message.member.voiceChannel.leave();
					return;
				})
			     })
		    } else {
   			   message.reply('You need to join a voice channel first!');
			   return;
    			}
		  }
	if (command == "stop") {
		    if (message.member.voiceChannel) {
			   try {
			    if (message.member.voiceChannelID !== message.guild.voiceConnection.channel.id) {
				    message.reply("You're not in the same voice channel as me!")
				    return;
			    } else { 
				    message.member.voiceChannel.leave();
			    }
			    	} catch(e) {
				    message.reply("I'm not in a voice channel!");
			    }
		    } else {
   			   message.reply('You need to join a voice channel first!');
			    return;
    			}
		  }
	if (command == "mute") {
		let member = message.mentions.members.first() || message.guild.members.get(args[0]);
		let time = args[1];
		let caller = message.guild.members.get(message.author.id);
		let has_mute = caller.hasPermission("MUTE_MEMBERS");
		if(!has_mute) return message.reply("Sorry, you don't have permissions to use this!");
		if(!member) return message.reply("Please mention a valid member of this server");
		let muterole = message.guild.roles.find("name", "terra-mute");
		let newtime = time * 60 * 1000;
		member.addRole(muterole).then(msg => {
			message.channel.send(`${member} Has been muted by ${caller} for ${time} minutes!`); 
			message.channel.overwritePermissions(member, {
 				 SEND_MESSAGES: false
			})
			setTimeout(() => { 
			message.channel.overwritePermissions(member, {
 				 SEND_MESSAGES: true
			})
			member.removeRole(muterole);
			}, newtime);
		})
	}
	if (command == "kick") {
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
	if (command == "help") {
		const embed = new Discord.RichEmbed()
		.setColor(530118)
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.setAuthor("Help", client.user.avatarURL)
		.addField("Bot Info","`help` `uptime` `code` `id`", false)
		.addField("Utilities", "`google`", false)
		.addField("Admin", "`kick` `mute` `ban`", false)
		.addField("Music", "`play` `stop`", false)
		.addField("Fun", "`dice`", false);
		message.channel.send(embed)
	}
	if (command == "code") {
		message.channel.send('https://github.com/Terradice/Terra-bot');
	}
	if (command =="id") {
		if (args[0]) {
 		   message.channel.send(`ID:  ${message.mentions.members.first().id}`);
 		   return;
		}
		message.channel.send(`ID:  ${message.author.id}`);
	}
	if (command == "dice") {
		let roll = "";
		let rolls = Number(args[0]) || 1;
		let min = Number(args[1]) || 1;
		let max = Number(args[2]) || 6;
		for(var i = 0; i < rolls; i++) {
			let dice = Math.floor(Math.random()*(max-min+1)+min);
			roll = roll.concat(dice).concat(",");
		}
		message.channel.send(roll);
	}
	if (command == "uptime") {
			const embed = new Discord.RichEmbed()
		.setColor(530118)
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.setAuthor("Uptime", client.user.avatarURL)
		.addField("Hours",Math.round(client.uptime / (1000 * 60 * 60)), true )
		.addField("Minutes", Math.round(client.uptime / (1000 * 60)) % 60, true);
		message.channel.send(embed)
	}


	}
client.login(process.env.TOKEN);
