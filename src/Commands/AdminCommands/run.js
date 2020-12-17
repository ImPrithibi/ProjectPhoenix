const Command = require('../../Structures/Command');
let {getPlayer, sendMessage} = require('../../makeBot')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Runs commands',
            requireStaff: true
        });
    }
    async run(message, args) {
        sendMessage(`/${args.join(' ')}`);
        message.channel.send(`Ran command, ${args.join(' ')}`);
    }
}