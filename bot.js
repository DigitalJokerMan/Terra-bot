const Discord = require('discord.js');
const google = require('google');
const config = require("./config.json");
const ytdl = require("ytdl-core");
const search = require('youtube-search');
const fortniteinit = require('fortnite');
const urban = require('relevant-urban');
const fortnite = new fortniteinit(process.env.fortnite);
const ascii_text_generator = require('ascii-text-generator');
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
	for(var key of client.guilds.keys()) {
		 servers[key] = {}
		servers["" + key]["queue"] = [];
		servers["" + key]["playing"] = false;
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
	let first = false;
      guild.channels.forEach(async (c) => {
	if (!first) {
        if (c.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
                c.send("Hi, my name is terrabot, thank you very much for inviting me to your server! The bot does not require admin access but some features might not work without it! Write ;help to get started, and have fun!");
                first = true;
            }
	}
            })
});
client.on('message', message => {

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

async function handleCommand(message, command, args) {
	var color = Math.floor(Math.random()*(16777216-0+1)+0);
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
		if(message.author.id !== "244111430956089344" && message.author.id !== "263995600641589248") return message.reply("Only the owners of the bot have access to that command!");
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
	if (command == "invite") {
		message.reply("Click the link below to add me to your server https://discordapp.com/oauth2/authorize?client_id=459782347936628747&scope=bot&permissions=8");
	}
	if (command == "urban") {
		let search = args.join(" ");
		urban(search).then(result => {
			let title = result.word;
			let description = result.definition;
			let example = result.example;
			let upvote = result.thumbsUp
			let downvote = result.thumbsDown;
			let link = result.urbanURL;
			let tags = result.tags;
			const embed = new Discord.RichEmbed()
			.setColor(color)
			.setFooter(`Terrabot operating in ${client.guilds.size} servers`)
			.setAuthor("Terrabot", client.user.avatarURL)
			.setTitle([title](link))
			.addField("Definition", description , false)
			.addField("examples", example, false)
			.addField("tags", tags, false)
			.addField("Upvotes",":thumbsup:" + upvote, true)
			.addField("Downvotes",":thumbsdown:" + downvote, true);
		message.channel.send(embed)
		})
	}
	if (command == "queue") {
		message.reply( servers[message.guild.id].queue );
	}
	if (command == "fortnitestats") {
		let parameter = args[0];
		let platform = args[1];
		if (!parameter) {
			message.reply("You need to specify a user!");
			return;	
		}
		if (!platform) {
			message.reply("You need to specify a platform! EX: xbox, pc, ps4");
			return;
		}
		switch (platform) {
			case "xbox": platform = "xbl"; break;
			case "ps4": platform = "psn"; break;
		}
		fortnite.user('Number1Swifty', 'xbl').then(console.log);
	}
	if (command == "ascii") {
		let input_text = args.join(" ");
		let text = "```" + ascii_text_generator(input_text,"2") + "```";
		console.log(text);
		try {
		message.channel.send(text);
		} catch(e) {
			message.reply("The message is too long to be sent!");
			return;
		}
	}
	if (command == "skin") {
		var parameter = args[0];
		var link = "https://minotar.net/body/GTR.png";
		if (!parameter) {
			message.reply("You need to specify a name!");
			return;
		}
		link = link.replace("GTR", parameter);
		message.channel.send({files: [link]});
	}
	if (command == "mc-achievement") {
		var description = args.join("%20");
		if (!description) {
			message.reply("You need to specify a description!");
		}
		var link = "http://www.minecraftachievement.net/achievement/a.php?i=2&h=TerraBot&t=description";
		link = link.replace("description", description);
		message.channel.send(link);
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
			default: message.reply("Unknown face!"); break;
				
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
				await (!servers[message.guild.id].queue[0]);
 			     const connection = message.member.voiceChannel.join().then(connection => {
				     const stream = ytdl(servers[message.guild.id].queue[0],  { filter : 'audioonly' });
            				const dispatcher = connection.playStream(stream, streamOptions);
				dispatcher.on('end', () => {
					dispatcher.destroy();
				     console.log("Song playing");
					console.log(servers[message.guild.id].queue.length);
					servers[message.guild.id].playing = true;
					playQueue(message, resultname, connection);
				})
			     	})
			     } else {
   			   message.reply('You need to join a voice channel first!');
			   return;
    			}
		  }
	if (command == "stop") {
		if (!servers[message.guild.id].playing) {
			message.reply("I'm not playing anything!")
		}
		    if (message.member.voiceChannel) {
			    if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) {
				    message.reply("You're not in the same voice channel as me!")
				    return;
			    } else { 
					console.log("queue over");
						servers[message.guild.id].playing = false;
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
	message.channel.createInvite().then(invite =>
   		 message.channel.send(invite.url)
	);
	}
	if (command === "mute") {
	if (!message.guild.roles.find("name", "terra-mute")) {
			    message.guild.createRole({
  			        name: 'terra-mute',
 			        color: 'BLUE',
 			       SEND_MESSAGES: false
   			 })
			}
			let muterole = message.guild.roles.find("name", "terra-mute");
		message.guild.channels.forEach(async (c) => {
 		   await c.overwritePermissions(muterole, {
  		      SEND_MESSAGES: false //overwrite
 		   })
		})
		if (!message.guild.roles.find("name", "terra-mute")) {
			message.reply("I dont have permissions to create a mute role therefore i cant mute!");	
		}
	    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You dont have permission to use this");
 	   let member =  message.mentions.members.first() || message.guild.members.get(args[0]);
  	  if (!member) return message.reply("Please mention a member to mute!");
	let caller = message.guild.members.get(message.author.id);
	let has_mute = caller.hasPermission("MANAGE_ROLES");
        if(!has_mute) return message.reply("Sorry, you don't have permissions to use this!");
  	  let time = args[1] * 1;
	  let newtime = time * 60 * 1000;
 	   if (!time) return message.reply("Specify a time!");
 	   if (isNaN(time)) return message.reply("Time must be an integer");
		if (!muterole) {
			message.reply("I dont have the right permissions to create a muterole! therefore i cant mute");	
		}
		   if(user.roles.has(muterole)){
				message.reply(`${member} is already muted!`)
		   }
	    member.addRole(muterole);
	     message.channel.send(`${member} Has been muted by ${caller} for ${time} minutes!`); 
	    setTimeout(() => {
 	       member.removeRole(muterole);
 	   }, newtime);
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
		.setColor(color)
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.setAuthor("Help", client.user.avatarURL)
		.addField(":question: Bot Info","`help` `uptime` `code` `id` `invite`", false)
		.addField(":wrench: Utilities", "`google` `say` `ascii` `ping` `avatar`", false)
		.addField("Admin", "`kick` `mute` `ban`", false)
		.addField("Music", "`play` `stop` `pause` `resume`", false)
		.addField("Fun", "`dice` `face` `8ball`", false)
		.addField("Server", "`createinvite`", false)
		.addField("Minecraft", "`skin` `mc-achievement`", false)
		.addField("Fortnite", "`fortnitestats`", false);
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
	if (command == "avatar") {
		if (args[0]) {
			var user = message.mentions.users.first();
			message.reply(`Here you go! ${user.avatarURL}`)
		} else {
			message.reply(`Here you go! ${message.author.avatarURL}`)
		}
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
		.setColor(color)
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.setAuthor("Uptime", client.user.avatarURL)
		.addField("Hours",Math.round(client.uptime / (1000 * 60 * 60)), true )
		.addField("Minutes", Math.round(client.uptime / (1000 * 60)) % 60, true);
		message.channel.send(embed)
	}}
function playQueue(msg, results, connection) {
	var queues = servers[msg.guild.id].queue;
	if(!queues[0]) {
		servers[message.guild.id].playing = false;
		msg.channel.send("Queue over, disconnecting...");
		msg.member.voiceChannel.leave();
		return;
	}
		msg.channel.send(`Next up, ${results}`); 
		console.log(queues[0]);
		 const stream = ytdl(servers[msg.guild.id].queue[0],  { filter : 'audioonly' });
            	const dispatcher = connection.playStream(stream, streamOptions);
		dispatcher.on('end', () => {
			servers[msg.guild.id].queue.shift();
			dispatcher.destroy();
			playQueue(msg, results, connection);
		})
	}
client.login(process.env.TOKEN);
