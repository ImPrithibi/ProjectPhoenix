const Check = require("../Check");

module.exports = class extends Check {

    constructor(client) {
        super(client, {
            name: "Bedwars Quad 1",
            id: "bedwars_q1"
        });

    }

    async run(playerData) {
        try {
            if (playerData.stats.Bedwars.final_kills_bedwars / playerData.stats.Bedwars.final_deaths_bedwars < 1.5) return false; // less than 1.5 fkdr
            if (playerData.achievements.bedwars_level < 150) return false; // less than level 150
        } catch (err) {
            return false;
        }
        return true;
    }
}