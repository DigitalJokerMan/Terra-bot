const Config = require("../config.json");
const Discord = require("discord.js");

module.exports = (client, message) => {
    if (message.author.bot) return;
	var color = Math.floor(Math.random() * (16777216 - 0 + 1) + 0);
	if (message.channel.topic && message.channel.topic.includes('{safe}')) {
		if (customFilter.isProfane(message.content)) {
			let newmsg = customFilter.clean(message.content);
			message.delete();
			message.channel.send(`${message.author.username}: ${newmsg}`);
		}
	}
	if (message.channel.topic && message.channel.topic.includes('{translate}')) {
		googleTranslate.detectLanguage('Hello', function(err, detection){
			console.log(detection.langauge);
			return
		})
		googleTranslate.translate("Ich liebe es zu programmieren", 'he', 'en', function(err, translation) {
			//console.log(translation.translatedText); //[0].translatedText
			return
			// =>  { translatedText: 'Hallo', originalText: 'Hello', detectedSourceLanguage: 'en' }
			const embed = new Discord.RichEmbed()
			.setColor(color)
			.setTitle('Translate')
			.setFooter(`Terrabot operating in ${client.guilds.size} servers`, 'https://cdn.discordapp.com/embed/avatars/4.png')
			.addField(`Translating from ${translation[0].detectedSourceLanguage}`, translation[0].translatedText, false)
		message.channel.send(embed);
		  });
	}
	const codeblock = /```(?:(\S+)\n)?\s*([^]+?)\s*```/i;
	if (codeblock.test(message.content)) {
		if (!message.channel.permissionsFor(message.client.user).has(['ADD_REACTIONS', 'READ_MESSAGE_HISTORY'])) return;
		const parsed = codeblock.exec(message.content);
		// Console.log(parsed);
	}

	let messageArray = message.content.split(" ");
    let command = messageArray[0];

    if (command.startsWith(Config.prefix)) {
        let args = messageArray.slice(1);
        let commandHandler = client.commands.get(command.toLowerCase().slice(Config.prefix.length));

        if (commandHandler) {
            if (commandHandler.config.ownerOnly && message.author.id != Config.ownerID) {
                message.reply("Only the bot owner can do that.");
                return;
            }

            if (args.length < commandHandler.config.argsMinimum && commandHandler.config.argsMinimum > 0) {
                message.reply(`**${commandHandler.config.name}** requires a minimum of **${commandHandler.config.argsMinimum.toString()}** arguments.`);
                return;
            }
            
            commandHandler.run(client, message, args);
        }
    }

	// let msg = message.content;
	// if (!message.guild) return;
	// if (msg.startsWith(Config.prefix)) {
	// 	msg = msg.substring(Config.prefix.length);
	// 	let command = msg.split(' ')[0];
	// 	let args = msg.split(' ').slice(1);

	// 	handleCommand(message, command, args, client);
	// }
}
