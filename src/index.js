const Client = require("./Structures/DiscordClient.js");
const Config = require("../config.json");

const client = new Client(Config);
// noinspection JSIgnoredPromiseFromCall
client.start();