const Discord = require('discord.js');
const google = require('google');
const config = require("./config.json");
const ytdl = require("ytdl-core");
const YouTube = require('simple-youtube-api');
const client = new Discord.Client();
const streamOptions = { seek: 0, volume: 1 };
var prefix = config.prefix;
const queue = new Map();
const youtube = new YouTube(process.env.youtubekey);
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

async function handleCommand(message, command, args) {
	const serverQueue = queue.get(message.guild.id);
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
	if (command == "say") {
		if (!args[0]) {
			message.reply("You need to specify what to say!");
			return;
		}
		message.channel.send(`${message.author} Says: ${args.join(" ")}`);
	}
	if (command == "play") {
		const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
				const voiceChannel = message.member.voiceChannel;
				if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
				const permissions = voiceChannel.permissionsFor(message.client.user);
				if (!permissions.has('CONNECT')) {
					return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
					}
				if (!permissions.has('SPEAK')) {
					return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
				}
				if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
					const playlist = await youtube.getPlaylist(url);
					const videos = await playlist.getVideos();
					for (const video of Object.values(videos)) {
						const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
						await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
					}
					return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
				} else {
					try {
						var video = await youtube.getVideo(url);
					} catch (error) {
						try {
							var videos = await youtube.searchVideos(args, 10);
							let index = 0;
							message.channel.send(`
		__**Song selection:**__
		
		${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
		
		Please provide a value to select one of the search results ranging from 1-10.
							`);
							// eslint-disable-next-line max-depth
							try {
								var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
									maxMatches: 1,
									time: 10000,
									errors: ['time']
								});
							} catch (err) {
								console.error(err);
								return message.channel.send('No or invalid value entered, cancelling video selection.');
							}
							const videoIndex = parseInt(response.first().content);
							var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
						} catch (err) {
							console.error(err);
							return message.channel.send('🆘 I could not obtain any search results.');
						}
					}
					return handleVideo(video, message, voiceChannel);
				}
			}
	if (command == "stop") {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
		  }
	if (command == "queue") {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
		`);
	}
	if (command == "skip") {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	}
	 if (command === 'pause') {
	if (serverQueue && serverQueue.playing) {
		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		return message.channel.send('⏸ Paused the music for you!');
	}
	} if (command === 'resume') {
	if (serverQueue && !serverQueue.playing) {
		serverQueue.playing = true;
		serverQueue.connection.dispatcher.resume();
		return message.channel.send('▶ Resumed the music for you!');
	}
	return message.channel.send('There is nothing playing.');
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
	if (command == "help") {
		const embed = new Discord.RichEmbed()
		.setColor(530118)
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.setAuthor("Help", client.user.avatarURL)
		.addField("Bot Info","`help` `uptime` `code` `id`", false)
		.addField("Utilities", "`google` `say`", false)
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
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}
client.login(process.env.TOKEN);
