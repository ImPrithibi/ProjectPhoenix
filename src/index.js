const Client = require("./Structures/DiscordClient.js");
const Config = require("../config.json");
const Database = require("./modules/DatabaseModule/Database")

const client = new Client(Config);
// noinspection JSIgnoredPromiseFromCall
client.start();

const db = new Database(Config.db_uri);

