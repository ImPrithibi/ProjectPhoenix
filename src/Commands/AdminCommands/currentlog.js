const Command = require('../../Structures/Command');
let { log } = require('../../makeBot');
let { customMessage } = require('../../modules/MessageUtils/MessageUtils');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['clog'],
            description: 'prints current log',
            requireStaff: true
        });
    }
    async run(message){
        console.log(log);
        customMessage(message.channel, "GREEN", log);
    }
}