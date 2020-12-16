const mongoose = require("mongoose");

class Database {
    constructor(databaseURI, parameters = {}) {
        this._initConnection(databaseURI, parameters);
        this.connected = false;
    }

    _initConnection(databaseURI, parameters) {
        mongoose.connect(databaseURI, parameters);

        this.connection = mongoose.connection;

        let self = this;

        this.connection.once('open', () => {
            self.connected = true;
            console.log("Database is connected. ");
        });
    }

    async save(data) {
        return data.save();
    }

    async find(schema, query) {
        return await schema.find(query);
    }

    // if data already exists choose to override otherwise set the data
    async set(schema, data, override, query) {
        if (await schema.exists(query)) {
            if (override) {
                let doc = await schema.findOne(query);
                doc.overwrite(data);
                return doc.save();
            }
        } else {
            return this.save(data);
        }
    }
}

module.exports = Database;