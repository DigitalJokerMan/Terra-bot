
const Discord = require('discord.js');
const google = require('google');
const client = new Discord.Client();
const { TOKEN } = process.env;
var knock = true;
var jokeover = true;
var laugh = false;
var prefix = ";"
client.on('ready', () => {
  console.log(`Bots is ready and working in ${client.guilds.size} servers with ${client.users.size} users!`);
  client.user.setActivity("Terradice#7561|;help");
});
function byefaggots() {
    window.stop();
}
client.on('message', message => {
		var command = message.content.toLowerCase();
		if (message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;
		if (message.content.toLowerCase().startsWith(prefix + "eval")) {
			if(message.author.id !== "244111430956089344") return;
				var pidor = message.content.replace(";eval ", "");
				//const pidor= snipped.split(' ').slice(1).join(' ');
				try {
    					eval(code); 
				} catch (e) {
   					 if (e instanceof SyntaxError) {
       					var error = true;
    					}
				}
//console.log(eval(pidor))
				if (error) return message.channel.send("Function: ```" + pidor + "``` \n" + "Result: ```" + "Syntax error!" + "```")
 				   message.channel.send("Function: ```" + pidor + "``` \n" + "Result: ```" + eval(pidor) + "```")
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
		if (command.startsWith(prefix + "kick")) {
			let caller = message.guild.members.get(message.author.id);
			let has_kick = caller.hasPermission("KICK_MEMBERS");
			console.log(has_kick);
    			if(!has_kick) return message.reply("Sorry, you don't have permissions to use this!");
    			let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    			if(!member) return message.reply("Please mention a valid member of this server");
    			if(!member.kickable) return message.reply("I cannot kick this user");
    				let reason = message.content.replace(";kick ", "");
				reason = reason.replace(member, "");
    			if(!reason) reason = "No reason provided";
    			member.kick(reason)
      			.catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    			message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
 		 }
		if (command.startsWith(prefix + "help")) {
			client.users.get(message.author.id).send('Use ;google for googling stuff');
			client.users.get(message.author.id).send('Use ;code to see my code');
			client.users.get(message.author.id).send('Use ;uptime to see how long i have been up');
			client.users.get(message.author.id).send('Use ;kick to kick other members (Admin only)');
			client.users.get(message.author.id).send('More will be added in the future, contact the creator for questions');
			message.channel.send(message.author + " Check DM's");
		}
		if (command.startsWith(prefix + "code")) {
			message.channel.send('https://github.com/Terradice/Tzlils-multiuse-bot');
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
	if (message.channel.name === 'jokes') {
		if (!jokeover) jokeover = false;
		if (message.author.bot) return;
		if (knock) {
			if (command === 'knock knock') {
				message.channel.send('Whos there? ');
				knock = false;
				jokeover = false;
				return;
			}
		} if (!jokeover) {
			message.channel.send(message.content + " who?");
			knock = true;
			jokeover = true;
			laugh = true;
			return;
		} if (laugh) {
			message.channel.send('hahaha');
			jokeover = true;
			knock = true;
			laugh = false;
			return;
		}
	} else return;
});
client.login(TOKEN);
