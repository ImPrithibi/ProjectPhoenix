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

    check() {

    }

    _getAllChecks(directory) {

        let util = new Utils();
        const files = fs.readdirSync(directory).filter(f => f.endsWith(".js"));  // only search js files
        for (let file of files) {
            let f = require(`${directory}/${file}`);
            if (!util.isClass(f)) continue;
            let check = new f(this.client);
            if (!(check instanceof Check)) continue;
            this.checks.set(check.name, check);
        }
    }
}