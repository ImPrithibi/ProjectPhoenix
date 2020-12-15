const mongoose = require("mongoose");

class Database {
    constructor(databaseURI, parameters = {}) {
        this._initConnection(databaseURI, parameters);
        this.connected = false;
    }

    _initConnection(databaseURI, parameters) {
        mongoose.connect(databaseURI, parameters);

        this.db = mongoose.connection;

        let self = this;

        this.db.once('open', () => {
            self.connected = true;
            console.log("Database is connected. ")
        });
    }
}

module.exports = Database;