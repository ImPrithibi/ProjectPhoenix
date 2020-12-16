const command = require('../../Structures/Command');
const index = require('../../index');

module.exports = class extends command {
    constructor(args) {
        super(args, {
            //TODO: make this do things
        });
    }
    async run(args){
        let message = args.join(' ');
        index.sendMessage(message);
    }
}