let { MessageEmbed } = require("discord.js");

module.exports = (channel, error) => {
    let embed = new MessageEmbed();

    embed
        .setColor("RED")
        .setTitle('Error')
        .setDescription(error);
    channel.send(embed);
}