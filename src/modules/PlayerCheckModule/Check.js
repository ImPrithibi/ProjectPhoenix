module.exports = class {
    constructor(client, name, options = {}) {
        this.client = client
        this.name = options.name || name;
    }

    async run(playerData) {

    }
}