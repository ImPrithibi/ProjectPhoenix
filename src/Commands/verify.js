const Command = require('../Structures/Command.js');
const { sendErrorMessage, sendSuccessMessage } = require("../modules/MessageUtils/MessageUtils");

const {Client} = require('@zikeji/hypixel');
const client = new Client(require("../../config.json").hypixel_api_key);

const minecraftapi = require("minecraft-api");

const UserLinkData = require("../Schemas/UserLinkData");

let DataSimilarError = require("../modules/DatabaseModule/DataSimilarError");

const Role = require("../modules/RoleSync/GiveGuildMemberRoles");

let RoleManager = new Role.GuildMemberRole();

const rank = {
    "VIP": "VIP",
    "VIP_PLUS": "VIP+",
    "MVP": "MVP",
    "MVP_PLUS": "MVP+",
    "MVP_PLUS_PLUS": "MVP++",
    "YOUTUBE": "YOUTUBE"
}

// noinspection JSUnusedLocalSymbols
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: "Links discord and minecraft",
            requireStaff: false
        });
    }

    async run(message, args, bot, database) {
        if (args.length < 1) {
            return sendErrorMessage(message.channel, "Please specify the username that you would like to link to. ");
        }
        let username = args[0];

        let failed = false;

        let uuid;

        if (bot.UserUUIDCache.has(username)) {
            uuid = bot.UserUUIDCache.get(username);
        } else {
            uuid = await minecraftapi.uuidForName(username)
                .catch((err) => {
                    if (err) failed = true;
                });
        }

        if (failed) return sendErrorMessage(message.channel, "There was an error while contacting the API. Please try again later. ");


        if (!uuid) return sendErrorMessage(message.channel, "Error: This is an invalid username. ");

        if (!bot.UserUUIDCache.has(username)) bot.UserUUIDCache.set(username, uuid);

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

        let queryFailed = false;

        // query database and set the user link data
        database.set(UserLinkData, new UserLinkData({
            "DiscordID": message.member.id,
            "UUID": uuid
        }), true, {"DiscordID": message.member.id}, {"checkData": ["UUID"]})
            .then(() => {
                sendSuccessMessage(message.channel, `Your discord has been linked/updated with the minecraft account, ${playerData.displayname}!`);
            })
            .catch((err) => {
                queryFailed = true;
                if (err instanceof DataSimilarError) {
                    if (message.member.nickname !== playerData.displayname) {
                        message.member.setNickname(playerData.displayname);
                        return sendSuccessMessage(message.channel, `Your nickname has been synchronized with your account name, ${playerData.displayname}`);
                    }
                    return sendErrorMessage(message.channel, `Your discord is already linked with the minecraft account, ${playerData.displayname}!`);
                }
                return sendErrorMessage(message.channel, "An error occurred when trying to add data to the database");
            });

        if (queryFailed) return;
        await RoleManager.add(message.member, "Verified Member");

        // check if user is in IQ

        let guildFailed = false;

        let guild = await client.guild.player(uuid)
            .catch((err) => {
                guildFailed = true;
            })

        if (guildFailed || !guild) return;

        if (guild._id !== "5a67bfa70cf29432ef9df6cc") return;

        // proven user is in IQ

        for (let member of guild.members) {
            if (member.uuid === uuid) {
                await RoleManager.add(message.member, member.rank);
                sendSuccessMessage(message.channel, `Welcome to Intelligence Quotient, ${message.member}!`);
                try {
                    let isError = false;
                    message.member.user.createDM()
                        .catch(() => {
                            isError = true;
                        })
                        .then((channel) => {
                            if (!isError) {
                                sendSuccessMessage(channel, `<:check:788939320262000650> **You have been linked to an account!** 
**Your Minecraft account has been linked**

You have linked your discord account to Minecraft account <a:Minecraft:788940069951242261> \`${playerData.newPackageRank ? `[${rank[playerData.newPackageRank] ? rank[playerData.newPackageRank] : playerData.newPackageRank}]` : ``} ${playerData.displayname}\`

This gives you the ability to see channels and talk with other members of our community! Please make sure that you are following our server's rules at all times, you can find these in <#483380719863857152>, If you need any help, you may ask in <#746830362663190579>.

**Useful Links:**
[🔗 Follow us on Twitter!](https://twitter.com/IQOverPowered)
[🔗 Subscribe to our Youtube Channel!](https://www.youtube.com/channel/UCNmJA1bj-wd3zH5thuR_lgw)
🔗 Apply for our guild! <#746830326957080686>
🔗 Check out our latest events! <#733367762906251308>

_If you need any help, feel free to message a staff member ❤️_`);
                            }
                        })
                } catch (ignored) {

                }
            }
        }
    }

};