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
client.start();
//
makeBot(client);




client.UserUUIDCache = new Collection();


const rs = new RoleSync(client);

// playerCheck
const playerCheckMod = require("./modules/PlayerCheckModule/PlayerCheck");
const hypixel = require("@zikeji/hypixel");

const api = new hypixel.Client(require("../config.json").hypixel_api_key);


let pc = new playerCheckMod(client);

api.player.uuid("b428763f1a534de0aa222b1da66f9fd9").then(async res => {
    console.log(await pc.check(res));
})