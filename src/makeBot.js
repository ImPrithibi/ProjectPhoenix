// imports
const minef = require('mineflayer');

let log = '';
let logCounter = 0;
let player;

let joinMessages = [
    '%n just joined the server - glhf!', '%n just joined. Everyone, look busy!', '%n just joined. Can I get a heal?',
    '%n joined your party.', '%n joined. You must construct additional pylons.', 'Ermagherd. %n is here.', 'Welcome, %n. Stay awhile and listen.',
    'Welcome, %n. We were expecting you ;)', 'Welcome, %n. We hope you brought pizza.', 'Welcome %n. Leave your weapons by the door.',
    'A wild %n appeared.', 'Swoooosh. %n just landed.', 'Brace yourselves. %n just joined the guild.', '%n just joined. Hide your bananas.',
    '%n just arrived. Seems OP - please nerf.', '%n just slid into the guild.', 'A %n has spawned in the server.', 'Big %n showed up!',
    'Where’s %n? In the guild!', '%n hopped into the server. Kangaroo!!', '%n just showed up. Hold my beer.', 'Challenger approaching - %n has appeared!',
    'It\'s a bird! It\'s a plane! Nevermind, it\'s just %n.', 'It\'s %n! Praise the sun! [T]/', 'Never gonna give %n up. Never gonna let %n down.',
    'Ha! %n has joined! You activated my trap card!', 'Cheers, love! %n\'s here!', 'Hey! Listen! %n has joined!', 'We\'ve been expecting you %n.',
    'It\'s dangerous to go alone, take %n!', '%n has joined the server! It\'s super effective!', 'Cheers, love! %n is here!', '%n is here, as the prophecy foretold.',
    '%n has arrived. Party\'s over.', 'Ready player %n', '%n is here to kick butt and chew bubblegum. And %n is all out of gum.', 'Hello. Is it %n you\'re looking for?',
    '%n has joined. Stay a while and listen!', 'Roses are red, violets are blue, %n joined this guild with you'
];

let bot;

function makeBot(client) {

    bot = minef.createBot({
        host: 'IQOP.hypixel.net',
        port: 25565,
        username: 'paul.prithibi@hotmail.com',
        password: '#IQOP2020Prithibi',
        keepAlive: true,
        colorsEnabled: false,
        version: '1.12.2'
    });

    bot.chatAddPattern(/(.*)/, "AllChat");

        bot.on('AllChat', (message) => {
            if(message.includes('has requested to join the Guild!')) {
                if(message.startsWith('[')){
                    player = message.split(' ')[1];
                } else{
                    player = message.split(' ')[0];
                }
                client.sendMessage(`<@480358874839252992> ${player} has requested to join the guild. Do >accept to accept them in`).then(r => r);
            }

            if(message.includes('joined the guild')) {
                if (message.startsWith('[')) {
                    let playerName = message.split(' ')[1];
                    // console.log(joinMessages[Math.floor(Math.random() * joinMessages.length)].replace('%n', playerName));
                    bot.chat("/gc " + joinMessages[Math.floor(Math.random() * joinMessages.length)].replace('%n', playerName));
                } else {
                    let playerName = message.split(' ')[0];
                    // console.log(joinMessages[Math.floor(Math.random() * joinMessages.length)].replace('%n', playerName))
                    bot.chat("/gc " + joinMessages[Math.floor(Math.random() * joinMessages.length)].replace('%n', playerName));
                }
            }
        })

        let isFirstLimboed = false;

    // listeners
        bot.on('error', function(err) {
            console.log(err);
        });

        bot.on('end', () => {
            makeBot(client);
        });

        bot.on('spawn', () => {
            console.log('Connected to hypiexl');
            if (!isFirstLimboed) {
                bot.chat("/achat §c");
                isFirstLimboed = true;
            }
        });

        bot.on('chat', async (username, message) => {
            // console.log((username + ': ' + message));
            if (username === 'Guild' || username === 'Officer') {
                (await client.channels.fetch("788533520058155018")).send(`\`${username + " > " + message}\``);
                // log = log + message + '\n';
                // logCounter++;
                // if (logCounter >= 30 || log.length >= 1950) {
                //     // console.log(log.length);
                //     await client.sendLog(`\`${log}\``);
                //     log = '';
                //     logCounter = 0;
                // }
            }
        });

}


function sendMessage(gMessage) {
    bot.chat(gMessage);
}

function getLog() {
    return log;
}

function getPlayer() {
    return player;
}

function setPlayer(plr) {
    player = plr;
}

module.exports = {
    makeBot, getPlayer, sendMessage, joinMessages, getLog, setPlayer
}

//Join message


