const command = require('../../Structures/Command');
const index = require('../../index');

module.exports = class extends command {
    constructor(args) {
        super(args, {
            aliases: ['sendgm', 'sgmessage']
        });
    }
    async run(args){
        let message = args.join(' ');
        index.sendMessage(message);
    }
}