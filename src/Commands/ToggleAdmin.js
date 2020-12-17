const Command = require('../Structures/Command');

let adminCommands = true;
module.exports.AdminCommand = adminCommands;
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ta'],
            description: 'Toggles Admin Commands being used on the bot',
            requiredRoles: ["788636116978630666", "789216259568304169", /*main server*/ "480358874839252992", "480358663077494787"]
        });
    }

    async run(message, ..._args) {
        adminCommands = !adminCommands;
        await message.channel.send(`Toggled Admin commands to ${adminCommands.toString()}`);
    }
}