let { MessageEmbed } = require("discord.js");

module.exports = (channel, color, message) => {
    let embed = new MessageEmbed();

    embed
        .setColor(color)
        .setDescription(message);
    channel.send(embed);
}