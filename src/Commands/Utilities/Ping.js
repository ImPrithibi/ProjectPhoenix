const Command = require('../../Structures/Command.js');

// noinspection JSUnresolvedVariable
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: 'pong'
        });
    }
    async run(message, ...args) {
        const msg = await message.channel.send('Pinging...');

        const latency = msg.createdTimestamp - message.createdTimestamp;
        const choices = ['Is it really my ping?', 'Is this ok? I can\'t look!', 'I hope it isn\'t bad!'];
        const response = choices[Math.floor(Math.random() * choices.length)];

        msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
    }
}