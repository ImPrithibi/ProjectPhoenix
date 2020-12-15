const schema = new mongoose.Schema({
    DiscordID: String,
    UUID: String
});

module.exports = mongoose.model("UserLinkData", schema);