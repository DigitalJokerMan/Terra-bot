const Discord = require('discord.js');
const google = require('google');
const config = require("./config.json");
const ytdl = require("ytdl-core");
const search = require('youtube-search');

var servers = {};
const client = new Discord.Client();
const streamOptions = { seek: 0, volume: 1 };
var prefix = config.prefix;
var opts = {
  maxResults: 10,
  key: process.env.youtubekey
};
client.on('ready', () => {
  console.log(`Bots is ready and working in ${client.guilds.size} servers with ${client.users.size} users!`);
  client.user.setActivity("Terradice&RedSponge|;help");
	/*for(var id of client.guilds.keys()) {
		console.log(id);
		servers["" + id]["queue"] = [];
	}*/
	for(var key of client.guilds.keys()) {
		 servers[key] = {}
		servers["" + key]["queue"] = [];
	}
});
client.voiceConnections.forEach(channel => channel.disconnect())
function byefaggots() {
    window.stop();
}

client.on('guildMemberAdd', member => {
       console.log(`${member.user.username} has joined`);
});
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  guild.defaultChannel.send("Hi, my name is terrabot, im the android sent by terradice. All jokes aside, thank you very much for inviting me to your server! The bot does not require admin access but some features might not work without it! Write ;help to get started, and have fun!");
});
client.on('message', message => {
if (!message.guild.roles.find("name", "terra-mute")) {
			    message.guild.createRole({
  			        name: 'terra-mute',
 			        color: 'BLUE',
 			       SEND_MESSAGES: false
   			 })
			}
			let muterole = message.guild.roles.find("name", "terra-mute");
	    let cIDS = await message.guild.channels.forEach(c => c.id);
	for(var key of message.guild.channels) {
		 message.cIDS.overwritePermissions(muterole, {
 				 SEND_MESSAGES: false //overwrite
			})
	}
	if (message.guild.id !== "110373943822540800") {
		if (message.content == "owo") {
			message.channel.send("https://media.discordapp.net/attachments/461069635165487137/463796448576929815/CatDance.gif");
		}
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
		if (pidor.includes(client.token)) {
			message.reply("Nice try");
			return;
		}
		try {
			message.channel.send("Function: ```" + pidor + "```\n" + "Result:\n" + "```" + eval(pidor) + "```");
		} catch(e) {
			message.channel.send("Function: ```" + pidor + "```\n" + "Result:\n" + "```" + e + "```");
		}
		}
	if (command == "ping") {
		message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
	}
	if (command == "invite") {
		message.reply("Click the link below to add me to your server https://discordapp.com/oauth2/authorize?client_id=459782347936628747&scope=bot&permissions=8");
	}
	if (command == "queue") {
		message.reply( servers[message.guild.id].queue );
	}	
	if (command == "face") {
		console.log("face");
		if (!args[0]) {
			message.reply("You need to specify a number!");
			return;
		}
		switch (parseInt(args[0])) {
			 	case 1: message.channel.send("( .-. )"); break;
				case 2: message.channel.send("( .o.)"); break;
				case 3: message.channel.send("( ⚆ _ ⚆ )"); break;
				case 4: message.channel.send("( ﾟヮﾟ)"); break;
				case 5: message.channel.send("(¬_¬)"); break;
				case 6: message.channel.send("(ʘᗩʘ')"); break;
				case 7: message.channel.send("( ︶︿︶)"); break;
				case 8: message.channel.send("(¬‿¬)"); break;
				case 9: message.channel.send("(ʘ‿ʘ)"); break;
				case 10: message.channel.send("(ಠ_ಠ)"); break;
				case 11: message.channel.send("(ಥ_ಥ)"); break;
				
		}
		message.delete(500);
	}
	if (command == "say") {
		if (!args[0]) {
			message.reply("You need to specify what to say!");
			return;
		}
		message.channel.send(`${message.author} Says: ${args.join(" ")}`);
	}
	if (command == "play") {
		    if (message.member.voiceChannel) {
		try {
		if (message.member.voiceChannelID !== message.guild.voiceConnection.channel.id) {
			message.reply("You're not in the same voice channel as me!")
			return;
		}
		} catch (e) {}
			    if (!args[0]) {
				    message.reply("You must specify a name!");
				    return;
			    	}
			    
				 let result;
				 let resultname;
			search(args.join(' '), opts, function(err, results) {
 				 if(err) return;
				 result = results[0].link; //servers[message.guild.id].queue.push(result);
				 resultname = results[0].title;
				message.reply(`Added ${results[0].title} to the queue`);
				servers[message.guild.id].queue.push(results[0].link);
				console.log(servers[message.guild.id].queue.length);
			    })
 			     const connection = message.member.voiceChannel.join().then(connection => {
				     const stream = ytdl(servers[message.guild.id].queue[0],  { filter : 'audioonly' });
            				const dispatcher = connection.playStream(stream, streamOptions);
				dispatcher.on('end', () => {
					dispatcher.destroy();
				     console.log("Song playing");
					console.log(servers[message.guild.id].queue.length);
					playQueue(message, resultname, connection);
				})
			     	})
			     } else {
   			   message.reply('You need to join a voice channel first!');
			   return;
    			}
		  }
	if (command == "stop") {
		    if (message.member.voiceChannel) {
			    if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) {
				    message.reply("You're not in the same voice channel as me!")
				    return;
			    } else { 
				    console.log("queue over");
				    		servers[message.guild.id].queue = []
						message.member.voiceChannel.leave();
						return;
			    }
		    } else {
   			   message.reply('You need to join a voice channel first!');
			    return;
    			}
		  }
	if (command == "createinvite") {
	message.guild.channels.get(message.guild.id).createInvite().then(invite =>
   		 message.channel.send(invite.url)
	);
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
			member.removeRole(muterole);
			}, newtime);
	}
	if(command == "-;" && args.length == 0) {
		message.reply("Dont cry!");
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
	if (command == "ban") {
			let caller = message.guild.members.get(message.author.id);
			let has_ban = caller.hasPermission("BAN_MEMBERS");
    			if(!has_ban) return message.reply("Sorry, you don't have permissions to use this!");
    			let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    			if(!member) return message.reply("Please mention a valid member of this server");
    			if(!member.bannable) return message.reply("I cannot ban this user");
    				let reason = message.content.replace(";kick ", "");
				reason = reason.replace(member, "");
    			if(!reason) reason = "No reason provided";
			member.send(`You have been banned from ${message.guild.name} by ${message.author.tag} for reason: ${reason}`).then(kicke => {
    			member.ban(reason)
			});
    			message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
	 }
	 if (command == "8ball") {
		 var rand = Math.floor(Math.random()*(2-1+1)+1);
		 if (rand == 1) {
			 message.reply("No");
		 } else if (rand == 2) {
			 message.reply("Yes");
		 }
	 }
	if (command == "help") {
		const embed = new Discord.RichEmbed()
		.setColor(530118)
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.setAuthor("Help", client.user.avatarURL)
		.addField("Bot Info","`help` `uptime` `code` `id` `invite`", false)
		.addField("Utilities", "`google` `say`", false)
		.addField("Admin", "`kick` `mute` `ban`", false)
		.addField("Music", "`play` `stop` `pause` `resume`", false)
		.addField("Fun", "`dice` `face` `8ball`", false);
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
	}}
function playQueue(msg, results, connection) {
	try {
	servers[msg.guild.id].queue.shift();
	var queues = servers[msg.guild.id].queue;
	console.log(queues.length);
	console.log("func working");
	if(!queues[0]) {
		console.log("queue over");
		msg.channel.send("Queue over, disconnecting...");
		msg.member.voiceChannel.leave();
		return;
	}
		msg.channel.send(`Next up, ${results}`); 
		console.log(queues[0]);
		 const stream = ytdl(servers[msg.guild.id].queue[0],  { filter : 'audioonly' });
            	const dispatcher = connection.playStream(stream, streamOptions);
		dispatcher.on('end', () => {
			dispatcher.destroy();
			playQueue(msg, results, connection);
		})
	} catch(e) { msg.reply(`Undefined error! ${e}`); return; }
}
client.login(process.env.TOKEN);
