const Client = require("./Structures/DiscordClient.js");
const Config = require("../config.json");


const client = new Client(Config);
// noinspection JSIgnoredPromiseFromCall
client.start();
const Database = require("./modules/DatabaseModule/Database")
const minef = require('mineflayer');

// noinspection JSIgnoredPromiseFromCall
client.start();

const db = new Database(Config.db_uri);



//Minecraft bot stuff starts here, will be moved later
let bot = makeBot();
let log = '';

function makeBot(){
    return minef.createBot({
        host: 'hypixel.net',
        port: 25565,
        username: 'qAdam',
        password: 'test',
        keepAlive: true,
        colorsEnabled: false,
    })
}
//sends to limbo
bot.once('connect', () => {
    bot.chat('/achat §c');
});

bot.chatAddPattern(/^(.+)> (.+)/, 'guildFilter');

//Logger
bot.on('guildFilter', (_guild, message) => {
    log = log + message + '\n';
    if(log.length > 1900){
        client.sendLog(log);
    }
})

let joinMessages = [
    '%n just joined the server - glhf!', '%n just joined. Everyone, look busy!', '%n just joined. Can I get a heal?',
    '%n joined your party.', '%n joined. You must construct additional pylons.', 'Ermagherd. %n is here.', 'Welcome, %n. Stay awhile and listen.',
    'Welcome, %n. We were expecting you ;)', 'Welcome, %n. We hope you brought pizza.', 'Welcome %n. Leave your weapons by the door.',
    'A wild %n appeared.', 'Swoooosh. %n just landed.', 'Brace yourselves. %n just joined the guild.', '%n just joined. Hide your bananas.',
    '%n just arrived. Seems OP - please nerf.', '%n just slid into the guild.', 'A %n has spawned in the server.', 'Big %n showed up!',
    'Where’s %n? In the guild!', //TODO: FINISH LIST
]

//Join message
bot.on('message', (message) => {
    if(message.contains('joined the guild')){
        if(message.startsWith('[')){
            let playerName = message.split(' ')[1];
            bot.chat(joinMessages[Math.floor(Math.random() * joinMessages.length)].replace('%n', playerName));
        } else {
            let playerName = message.split(' ')[0];
            bot.chat(joinMessages[Math.floor(Math.random() * joinMessages.length)].replace('%n', playerName));
        }
    }
});

//auto-reconnect
bot.on('end', () => {
    bot = makeBot();
})

//sendMessagesOnCommand
function sendMessage(gMessage){
    bot.chat(gMessage);
}
module.exports = {sendMessage};
