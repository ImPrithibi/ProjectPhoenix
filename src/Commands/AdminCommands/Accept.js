const Command = require('../../Structures/Command');
let {getPlayer, sendMessage, setPlayer} = require('../../makeBot')
let { sendErrorMessage, sendSuccessMessage } = require('../../modules/MessageUtils/MessageUtils');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Accepts player',
            requiredRoles: ["788636116978630666", "789216259568304169", /*main server*/ "480358874839252992", "480358663077494787"]
        });
    }
    async run(message, args){
        let plr;
        if (args.length > 0) {
            plr = args[0];
        } else {
            plr = getPlayer();
        }
        if (!plr) return sendErrorMessage(message.channel, 'Invalid player!');
        sendSuccessMessage(message.channel, 'Accepted ' + plr + '\'s invite!');
        sendMessage("/g accept " + plr);
    }
}