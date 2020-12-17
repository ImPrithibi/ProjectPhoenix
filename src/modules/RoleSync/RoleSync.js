const {Client} = require('@zikeji/hypixel');
const { compareObjects } = require("../ObjectUtils/ObjectUtils");
const client = new Client(require("../../../config.json").hypixel_api_key);
const compareDifferences = require("../ObjectUtils/compareDifferences");
const UserLinkDatabase = require("../DatabaseModule/UserLinkDatabase");
const Role = require("./GiveGuildMemberRoles");

class RoleSync {
    constructor(client) {
        this.dataCache;
        this.client = client;
        // this.run();
        this.interval = setInterval(this.run, 10000);
    }

    async run() {
        // api call to get guild members
        const guild = await client.guild.name('Intelligence Quotient');

        let currentDataBuild = {};

        for (const member of guild.members) {
            currentDataBuild[member.uuid] = {
                "uuid": member.uuid,
                "rank": member.rank
            };
        }


        if (!this.dataCache) return;

        // detect changes in data
        if (compareObjects(this.dataCache, currentDataBuild)) return; // same data, cut off some extra work

        let changed = compareDifferences(this.dataCache, currentDataBuild);

        let roleManager = new Role.GuildMemberRole();

        for (let uuid in changed) {
            let value = changed[uuid];

            let db = new UserLinkDatabase();

            let id = db.getDiscordID(uuid);
            if (!id) continue; // user not linked, dont worry about it

            if (!this.dataCache[uuid]) { // new data being added
                await roleManager.add(await (await client.getGuild()).members.fetch(id), value.rank);
            } else if (value == null) { // data being removed
                await roleManager.removeAll(await (await client.getGuild()).members.fetch(id));
            } else {// data change
                await roleManager.removeAll(await (await client.getGuild()).members.fetch(id));
                await roleManager.add(await (await client.getGuild()).members.fetch(id), value.rank);
            }
        }


        // at last
        this.dataCache = currentDataBuild;
    }
}

module.exports = RoleSync;