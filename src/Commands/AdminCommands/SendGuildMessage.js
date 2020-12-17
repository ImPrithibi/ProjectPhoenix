const command = require('../../Structures/Command');
const index = require('../../index');

module.exports = class extends command {
    constructor(...args) {
        super(...args, {
            aliases: ['sgm'],
            description: 'Sends a message',
            requireStaff: true
        });
    }
    async run(message, args){
        let msg = args.join(' ');
        index.sendMessage("/gc " + msg);
    }
}