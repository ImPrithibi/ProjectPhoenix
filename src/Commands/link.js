const Command = require('../Structures/Command.js');
const { sendErrorMessage, sendSuccessMessage } = require("../modules/MessageUtils/MessageUtils");

const {Client} = require('@zikeji/hypixel');
const client = new Client(require("../../config.json").hypixel_api_key);

const minecraftapi = require("minecraft-api");

const UserLinkData = require("../Schemas/UserLinkData");

// noinspection JSUnusedLocalSymbols
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: "Links discord and minecraft"
        });
    }

    async run(message, args, database) {
        if (args.length < 1) {
            return sendErrorMessage(message.channel, "Please specify the username that you would like to link to. ");
        }
        let username = args[0];

        let failed = false;

        let uuid = await minecraftapi.uuidForName(username)
            .catch((err) => {
                if (err) failed = true;
            });

        if (failed) return sendErrorMessage(message.channel, "There was an error while contacting the API. Please try again later. ");


        if (!uuid) return sendErrorMessage(message.channel, "Error: This is an invalid username. ");

        let playerData = await client.player.uuid(uuid);

        if (!playerData) return sendErrorMessage(message.channel, "Error: This player has never logged onto Hypixel!");

        let links;

        try {
            links = playerData.socialMedia.links.DISCORD;
        } catch (err) {
            return sendErrorMessage(message.channel, "Error: The specified player does not have discord linked!");
        }

        if (!links) return sendErrorMessage(message.channel, "Error: The specified player does not have discord linked!");

        if (links !== message.member.user.tag) return sendErrorMessage(message.channel, "Error: The specified player does not have their discord linked as your discord. Please go to Profile > Social Media > Discord and follow the instructions. ");

        // query database and set the user link data
        database.set(UserLinkData, new UserLinkData({
            "DiscordID": message.member.id,
            "UUID": uuid
        }), true, {"DiscordID": message.member.id})
            .then(() => {
                sendSuccessMessage(message.channel, `Your discord has been linked/updated with the minecraft account, ${playerData.displayname}!`);
            })
            .catch(() => {
                sendErrorMessage(message.channel, "An error occurred when trying to add data to the database");
            })
    }

};