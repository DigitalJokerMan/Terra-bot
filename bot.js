
const Discord = require('discord.js');
const google = require('google');
const fs = require('fs');
const config = require("./config.json");
const client = new Discord.Client();
var knock = true;
var jokeover = true;
var laugh = false;
var prefix = config.commands.prefix;

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
		let msg = message.content;
		if (message.author.bot) return;
		if(msg.startsWith(prefix)) {
			msg = msg.substring(prefix.length);
			let command = msg.split(" ")[0];
			let args = msg.split(" ").slice(1);

			handleCommand(message, command, args);
		}
});

function handleCommand(message, command, args) {
	console.log("RUNNING COMMAND " + command + " WITH ARGS " + args);
	if(command == "eval") {
		let pidor = args.join(" ");
		try {
			message.channel.send("Function: ```" + pidor + "```\n" + "Result:\n" + "```" + eval(pidor) + "```");
		} catch(e) {
			message.channel.send("Function: ```" + pidor + "```\n" + "Result:\n" + "```" + e + "```");
		}
		}
	if (command == "ping")) {
		message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
	}
	if (command == "kick")) {
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
	if (command == "help")) {
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
	if (command == "code")) {
		message.channel.send('https://github.com/Terradice/Terra-bot');
	}
	if (command =="id")) {
		message.channel.send(`ID:  ${message.author.id}`);
	}
	if (command == "dice")) {
		message.channel.send(Math.floor(Math.random()*(6-1+1)+1))
	}
	if (command == "uptime")) {
			const embed = new Discord.RichEmbed()
		.setColor(530118)
		.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
		.setAuthor("Uptime", client.user.avatarURL)
		.addField("Hours",Math.round(client.uptime / (1000 * 60 * 60)), true )
		.addField("Minutes", Math.round(client.uptime / (1000 * 60)) % 60, true);
		message.channel.send(embed)
	}


	}
function setConfigEntry(key, value) {
	config[key] = value;

	fs.writeFile("./config.json", JSON.stringify(config), function (err) {
	if (err) return console.log(err);
	console.log(JSON.stringify(config));
	console.log('writing to ' + "./config.json");
})}
client.login(process.env.TOKEN);
