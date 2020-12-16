let { MessageEmbed } = require("discord.js");

module.exports = (channel, error) => {
    let embed = new MessageEmbed();

    embed
        .setColor("RED")
        .setDescription(error);
    channel.send(embed);
}