const fs = require("fs");
const { Collection } = require("discord.js");
const Utils = require("../../Structures/Util");
const Check = require("./Check");


module.exports = class {

    constructor(client) {
        this.client = client;
        this.checks = new Collection();
        this._getAllChecks(__dirname + "/checks");
    }

    async check(playerData, ignored) {
        let e = {};

        for (let kv of this.checks) {
            if (ignored && ignored.includes(kv[0])) continue;
            let re = await kv[1].run(playerData);
            e[kv[0]] = {
                "check": kv[1],
                "value": re
            };
        }

        return e;
    }

    _getAllChecks(directory) {
        let util = new Utils();
        const files = fs.readdirSync(directory).filter(f => f.endsWith(".js"));  // only search js files
        for (let file of files) {
            let f = require(`${directory}/${file}`);
            if (!util.isClass(f)) continue;
            let check = new f(this.client);
            if (!(check instanceof Check)) continue;
            this.checks.set(check.id, check);
        }
    }
}