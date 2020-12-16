const Command = require('../Structures/Command');

let adminCommands = true;
module.exports.AdminCommand = adminCommands;
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ta'],
            description: 'Toggles Admin Commands being used on the bot'
        });
    }

    async run(message, ..._args) {
        adminCommands = !adminCommands;
        await message.channel.send(`Toggled Admin commands to ${adminCommands.toString()}`);
    }
}