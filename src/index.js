const { Collection } = require("discord.js");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
const RoleSync = require('./modules/RoleSync/RoleSync');
const Client = require('./Structures/DiscordClient.js');
const Config = require('../config.json');
const client = new Client(Config);

const { makeBot } = require("./makeBot");
// noinspection JSIgnoredPromiseFromCall
// client.start();
//
// makeBot(client);


client.UserUUIDCache = new Collection();


const rs = new RoleSync(client);
