const fs = require("fs");
const { Collection } = require("discord.js");
const Utils = require("../../Structures/Util");
const Check = require("./Check");


module.exports = class {


    constructor() {
        this.checks = new Collection();
    }

    _getAllChecks(directory) {

        let util = new Utils();
        const files = fs.readdirSync(directory).filter(f => f.endsWith(".js"));  // only search js files
        for (let file of files) {
            let f = require(`${directory}/${file}`);
            if (util.isClass(f) || !(f instanceof Check)) continue;
            let check = new f();

        }
    }
}