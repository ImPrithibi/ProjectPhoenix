const Command = require('../../Structures/Command');
let {player, sendMessage} = require('../../index')

module.exports = class extends Command {
    constructor(args) {
        super(args);
    }
    async run(message){
        message.send('Accepted ' + player + '\'s invite!');
        sendMessage("/g accept " + player);
    }
}