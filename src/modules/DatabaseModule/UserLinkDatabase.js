const UserLinkData = require("../../Schemas/UserLinkData");

module.exports = class {
    constructor() {

    }

    async getUUID(discordID) {
        return (await UserLinkData.findOne({"DiscordID": discordID})).UUID;
    }

    async getDiscordID(uuid) {
        return (await UserLinkData.findOne({"UUID": uuid})).DiscordID;
    }
}