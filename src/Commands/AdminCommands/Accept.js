const Command = require('../../Structures/Command');
let {getPlayer, sendMessage} = require('../../makeBot')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Accepts player',
            requireStaff: true
        });
    }
    async run(message){
        message.send('Accepted ' + getPlayer() + '\'s invite!');
        sendMessage("/g accept " + getPlayer());
    }
}