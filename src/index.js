const Client = require("./Discord/Structures/DiscordClient.js");
const Config = require("../config.json");
const minef = require('mineflayer');

const client = new Client(Config);
let log = '';
module.exports.log = log;

// noinspection JSIgnoredPromiseFromCall
client.start();
const bot = minef.createBot({
    password: 'test',
    username: 'qAdam',
    version: '1.8',
    keepAlive: true
})

bot.on('connect', () => {
   bot.chat('/achat §c')
});


bot.chatAddPattern(/^(.+)> (.+)/,
    'guild_chat_event',
    'Custom Chat Regex'
    )
const logger = (_guild, message) => {
    log = log + message;
}
bot.on('guild_chat_event', logger);