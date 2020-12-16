const Client = require("./Structures/DiscordClient.js");
const Config = require("../config.json");

const { Collection } = require("discord.js");

const client = new Client(Config);
// noinspection JSIgnoredPromiseFromCall
client.start();

client.UserUUIDCache = new Collection();