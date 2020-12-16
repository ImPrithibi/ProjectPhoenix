const Client = require("./Structures/DiscordClient.js");
const Config = require("../config.json");
const Database = require("./modules/DatabaseModule/Database")
const minef = require('mineflayer');

const client = new Client(Config);
// noinspection JSIgnoredPromiseFromCall
client.start();

const db = new Database(Config.db_uri);
let log = '';

//Minecraft bot stuff starts here, will be moved later
const bot = minef.createBot({
    username: 'qAdam',
    password: 'test',
    version:'1.8',
    host:'hypixel.net',
    port:25565
});
bot.once('connect', () => {
    bot.chat('/achat §c');
});
bot.chatAddPattern(/^(.+)> (.+)/, 'guildFilter');
bot.on('guildFilter', (_guild, message) => {
    log = log + message + '\n';
    if(log.length > 1900){
        client.sendLog(log);
    }
})
