const Command = require('../../Structures/Command');
let {getPlayer, sendMessage} = require('../../makeBot')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Runs commands',
            requiredRoles: ["789216259568304169", /*main server*/ "480358663077494787"]
        });
    }
    async run(message, args) {
        sendMessage(`/${args.join(' ')}`);
        message.channel.send(`Ran command, ${args.join(' ')}`);
    }
}