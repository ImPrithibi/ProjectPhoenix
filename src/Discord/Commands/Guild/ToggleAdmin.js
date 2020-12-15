const Command = require('../../Structures/Command.js')

let adminCommands = false;
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ta'],
            description: 'toggles the ability to have admin commands'
        });
    }
    async run(message, ..._args) {
        adminCommands = !adminCommands;
        await message.channel.send(`Set admin commands to ${adminCommands.toString()}`);
    }

}