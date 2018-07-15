const Discord = require('discord.js');
const google = require('google');
const config = require("./config.json");
const Danbooru = require('danbooru')
const ytdl = require("ytdl-core");
const search = require('youtube-search');
const urban = require('relevant-urban');
const request = require('snekfetch');
const ascii_text_generator = require('ascii-text-generator');
var servers = {};
const client = new Discord.Client();
const booru = new Danbooru();

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

client.on('guildMemberAdd', member => {
       console.log(`${member.user.username} has joined`);
	let first = false;
	member.guild.channels.forEach(async (c) => {
	if (!first) {
       	 	if (c.topic && c.topic.includes("{welcome}")) {
			first = true;
			c.send(`${member.user} has joined!`);
		}
	}
	});
})
client.on("guildMemberRemove", (member) => {
	let first = false;
	member.guild.channels.forEach(async (c) => {
	if (!first) {
       	 	if (c.topic && c.topic.includes("{welcome}")) {
			first = true;
			c.send(`${member.user.username} has left!`);
		}
	}
	})
});

client.on("guildCreate", guild => {
	guild.owner.send("I'm terrabot, made by terradice, thanks for inviting me, Heres some special information, to declare a welcome channel, put {welcome} in its description,");
	
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
	console.log("RUNNING COMMAND " + command + " WITH ARGS " + args + " IN SERVER " + message.guild);
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
	if (command == "youtube") {
		search(args.join(' '), opts, function(err, results) {
			 if(err) return;
			let result = results[0].link;
			let resultname = results[0].title;
		message.channel.send(result);
		})
	}
	if (command == "invite") {
		message.reply("Click the link below to add me to your server https://discordapp.com/oauth2/authorize?client_id=459782347936628747&scope=bot&permissions=8");
	}
	if (command == "danbooru") {
		message.channel.send("<a:googling:426453223310622740>" + " Loading...").then(msg => {
		booru.posts({ tags: 'rating:e order:favcount limit:200' }).then(posts => {
			  const index = Math.floor(Math.random() * posts.length)
			  const post = posts[index]

			//{files: [link]}
			  const url = booru.url(post.file_url)
  			const name = `${post.md5}.${post.file_ext}`
			msg.delete();
			const embed = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(name).setURL(url)
			.setImage(url)
		message.channel.send.(embed)
		})
		})
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
			let tags = result.tags.join(" ");
			const embed = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(title).setURL(link)
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
		/*
		    const platforms = ['pc', 'xbl', 'psn'];
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
		*/ message.reply("WIP");
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
		   if(member.user.roles.has(muterole)){
				message.reply(`${member} is already muted!`)
			   return;
		   }
	    member.addRole(muterole);
	     message.channel.send(`${member} Has been muted by ${caller} for ${time} minutes!`); 
	    setTimeout(() => {
 	       member.removeRole(muterole);
 	   }, newtime);
	}
	if (command == "unmute") {
		if(!member.user.roles.has(muterole)){
				message.reply(`${member} isnt muted!`)
			return;
		   } 
		member.removeRole(muterole);
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
		.setTitle("Help")
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.addField(":question: Bot Info","`help` `uptime` `code` `id` `invite` `detailedhelp`", false)
		.addField(":wrench: Utilities", "`google` `say` `ascii` `ping` `avatar` `urban` `youtube`", false)
		.addField("Admin", "`kick` `mute` `ban`", false)
		.addField(":musical_note: Music", "`play` `stop`", false)
		.addField(":game_die: Fun", "`dice` `face` `8ball`", false)
		.addField(":scroll: Server", "`createinvite`", false)
		.addField("NSFW", "`danbooru`", false)
		.addField("Minecraft", "`skin` `mc-achievement`", true)
		.addField("Fortnite", "`fortnitestats`", true);
		message.channel.send(embed)
	} 
	if (command == "detailedhelp") {
		const embed = new Discord.RichEmbed()
		.setColor(color)
		.setTitle("Detailed Help: * = optional")
		.setFooter(`Terrabot, made by terradice`)
		.addField("help","Shows help", false)
		.addField("uptime","Shows bot uptime", false)
		.addField("code","Shows bot's github repository", false)
		.addField("id (*user)","Shows your or the mentioned user's id", false)
		.addField("invite","Shows invite for the bot", false)
		.addField("detailedhelp","Shows this message", false)
		.addField("google (search)","Returns first result from google search", false)
		.addField("say (text)", "Says something as the bot", false)
		.addField("ascii (text)","converts text into big ascii letters",false)
		.addField("ping","Shows users ping to the bot",false)
		.addField("avatar (*user)","Shows users or the mentioned user's avatar",false)
		.addField("urban (text)","Searches definition on urban dictionary",false)
		.addField("youtube (text)","Searches video on youtube",false)
		.addField("kick (user) (*reason)","Kicks a user from a server",false)
		.addField("mute (user) (minutes)","Mutes a user for a specified amount of minutes",false)
		.addField("ban (user) (*reason)","Bans a user from a server",false)
		.addField("play (text)","Searches text on youtube and then plays the video",false)
		.addField("stop","Stops playing music",false)
		.addField("dice (*rolls) (*min) (*max)","Rolls a dice with the given parameters, if no parameters default is 1 1 6",false)
		.addField("face (number)","Sends a face from a database",false)
		.addField("8ball (question)","Answers yes or no to a question",false)
		.addField("createinvite","Creates an invite to the server",false)
		.addField("skin (Minecraft user)","Returns a minecraft account's skin",false)
		.addField("mc-achievement (Text)","Makes a minecraft achievement with the text as the description",false)
		.addField("fortnitestats (player) (platform)","Shows stats of a fortnite account (WIP)",false)
		message.member.send(embed)
		message.reply("Check DM's!");
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
