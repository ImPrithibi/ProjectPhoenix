const Command = require('../../Structures/Command');
let { getLog } = require('../../makeBot');
let { customMessage } = require('../../modules/MessageUtils/MessageUtils');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['clog'],
            description: 'prints current log',
            requireStaff: true
        });
    }
    async run(message) {
        console.log(getLog());
        customMessage(message.channel, "GREEN", getLog());
    }
}