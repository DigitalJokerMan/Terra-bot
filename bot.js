
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
	}
function setConfigEntry(key, value) {
	config[key] = value;

	fs.writeFile("./config.json", JSON.stringify(config), function (err) {
	if (err) return console.log(err);
	console.log(JSON.stringify(config));
	console.log('writing to ' + "./config.json");
})}
client.login(process.env.TOKEN);
