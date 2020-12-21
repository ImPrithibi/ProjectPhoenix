const Check = require("../Check");

module.exports = class extends Check {

    constructor(client) {
        super(client, {
            name: "Duels Quad 1",
            id: "duels_q1"
        });

    }

    async run(playerData) {
        try {
            if (playerData.stats.Duels.wins < 3000) return false; // less than 3k duels wins
        } catch (err) {
            return false;
        }
        return true;
    }
}