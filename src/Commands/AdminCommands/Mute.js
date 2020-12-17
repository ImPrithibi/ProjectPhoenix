const command = require('../../Structures/Command');
const index = require('../../index');

module.exports = class extends command {
    constructor(args) {
        super(args);
    }
    async run(message, args) {
        let muteargs = args.join(' ');
        index.sendMessage('/g mute ' + muteargs);
    }
}