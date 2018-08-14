module.exports.config = {
    name: "dice",
    description: "Rolls a dice",
    usage: "{ROLLS} {MINIMUM} {MAXIMUM}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 3
}

module.exports.run = (client, message, args) => {
    let roll = '';
    let rolls = Number(args[0]) || 1;
    let min = Number(args[1]) || 1;
    let max = Number(args[2]) || 6;
    for (var i = 0; i < rolls; i++) {
        let dice = Math.floor(Math.random() * (max - min + 1) + min);
        roll = roll.concat(dice).concat(',');
    }
    message.channel.send(roll);
}