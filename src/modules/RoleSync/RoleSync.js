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
        let self = this;
        this.interval = setInterval(() => {
            this.run(self);
        }, 10000); // loophole thingymajigy
    }

    async run(rs) {
        // api call to get guild members
        const guild = await client.guild.name('Intelligence Quotient');

        let currentDataBuild = {};

        for (const member of guild.members) {
            currentDataBuild[member.uuid] = {
                "uuid": member.uuid,
                "rank": member.rank
            };
        }


        if (!rs.dataCache) {
            rs.dataCache = currentDataBuild;
            return;
        }

        // detect changes in data
       //  if (compareObjects(this.dataCache, currentDataBuild)) return; // same data, cut off some extra work


        let changed = compareDifferences(rs.dataCache, currentDataBuild);

        let roleManager = new Role.GuildMemberRole();

        for (let uuid in changed) {
            let value = changed[uuid];

            let db = new UserLinkDatabase();

            let id = await db.getDiscordID(uuid);
            if (!id) continue; // user not linked, dont worry about it

            if (!rs.dataCache[uuid]) { // new data being added
                await roleManager.add(await (await rs.client.getGuild()).members.fetch(id), value.rank);
            } else if (value == null) { // data being removed
                await roleManager.removeAll(await (await rs.client.getGuild()).members.fetch(id));
            } else {// data change
                await roleManager.removeAll(await (await rs.client.getGuild()).members.fetch(id));
                await roleManager.add(await (await rs.client.getGuild()).members.fetch(id), value.rank);
            }
        }


        // at last
        rs.dataCache = currentDataBuild;
    }
}

module.exports = RoleSync;