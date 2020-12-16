const {Client} = require('@zikeji/hypixel');
const { compareObjects } = require("../ObjectUtils/ObjectUtils");
const client = new Client(require("../../../config.json").hypixel_api_key);

class RoleSync {
    constructor() {
        this.dataCache;
        this.run();
        // this.interval = setInterval(this.run, 10000);
    }

    async run() {
        // api call to get guild members
        const guild = await client.guild.name('Intelligence Quotient');

        console.log(guild);

        let currentDataBuild = [];

        for (const member of guild.members) {
            console.log(member);
            currentDataBuild.push({
                "uuid": member.uuid,
                "rank": member.rank
            });
        }

        console.log(currentDataBuild);

        if (!this.dataCache) return;

        // detect changes in data
        if (compareObjects(this.dataCache, currentDataBuild)) return; // same data, cut off some extra work

        // at last
        this.dataCache = currentDataBuild;
    }
}

module.exports = RoleSync;