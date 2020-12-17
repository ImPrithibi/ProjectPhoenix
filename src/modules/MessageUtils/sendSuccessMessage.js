let { MessageEmbed } = require("discord.js");

module.exports = (channel, message) => {
    let embed = new MessageEmbed();

    embed
        .setColor("GREEN")
        .setTitle("Success!")
        .setDescription(message);
    channel.send(embed);
}