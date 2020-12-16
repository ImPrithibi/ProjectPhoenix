let { MessageEmbed } = require("discord.js");

module.exports = (channel, message) => {
    let embed = new MessageEmbed();

    embed
        .setColor("GREEN")
        .setDescription(message);
    channel.send(embed);
}