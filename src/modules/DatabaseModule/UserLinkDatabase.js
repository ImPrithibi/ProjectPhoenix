const UserLinkData = require("../../Schemas/UserLinkData");

module.exports = class {
    constructor() {

    }

    async getUUID(discordID) {
        if (!discordID) return;
        let res = await UserLinkData.findOne({"DiscordID": discordID});
        if (!res) return;
        return res.UUID;
    }

    async getDiscordID(uuid) {
        if (!uuid) return;
        let res = await UserLinkData.findOne({"UUID": uuid});
        if (!res) return;
        return res.DiscordID;
    }
}