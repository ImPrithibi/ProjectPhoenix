// noinspection JSUnusedLocalSymbols
module.exports = class Command {
    constructor(client, name, options = {"requireStaff": false}) {
        this.client = client
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || "No description provided";
        this.category = options.category || "Misc";
        this.usage = options.usage || "No usage provided";
        this.requireStaff = options.requireStaff;
    }

    async run(message, args, client, database) {
        throw new Error(`Command ${this.name} doesnt provide a run method`);
    }
}