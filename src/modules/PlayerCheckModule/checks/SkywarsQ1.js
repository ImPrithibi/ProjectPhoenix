const Check = require("../Check");

module.exports = class extends Check {

    constructor(client) {
        super(client, {
            name: "Skywars Quad 1",
            id: "skywars_q1"
        });

    }

    async run(playerData) {
        try {
            if (playerData.stats.SkyWars.kills / playerData.stats.SkyWars.deaths < 1) return false; // less than 1 kdr
            if (isNaN(this.getSkywarsLevel(playerData.stats.SkyWars.skywars_experience))
                || this.getSkywarsLevel(playerData.stats.SkyWars.skywars_experience) < 12) return false; // less than level 12
        } catch (err) {
            return false;
        }
        return true;
    }

    getSkywarsLevel(xp) {
        let xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
        if (xp >= 15000) {
            return (xp - 15000) / 10000 + 12;
        } else {
            for (let i = 0; i < xps.length; i++) {
                if(xp < xps[i]) {
                    return i + (xp - xps[i-1]) / (xps[i] - xps[i-1]);
                }
            }
        }
    }
}