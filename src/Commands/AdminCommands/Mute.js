const command = require('../../Structures/Command');
const index = require('../../makeBot');

module.exports = class extends command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Accepts player',
            requireStaff: true
        });
    }
    async run(message, args) {
        let muteargs = args.join(' ');
        index.sendMessage('/g mute ' + muteargs);
    }
}