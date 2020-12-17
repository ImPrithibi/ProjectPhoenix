const Command = require('../Structures/Command.js');

// noinspection JSUnusedLocalSymbols
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['hallo'],
            description: "prints hello"
        });
    }

    async run(message, args) {
        message.reply('Hello!');
    }
};