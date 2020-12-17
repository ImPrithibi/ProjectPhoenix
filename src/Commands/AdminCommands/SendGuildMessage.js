const command = require('../../Structures/Command');
const index = require('../../makeBot');

module.exports = class extends command {
    constructor(...args) {
        super(...args, {
            aliases: ['sgm', 'say'],
            description: 'Sends a message',
            requiredRoles: ["788636116978630666", "789216259568304169", /*main server*/ "480358874839252992", "480358663077494787"]
        });
    }
    async run(message, args){
        let msg = args.join(' ');
        index.sendMessage("/gc " + msg);
    }
}