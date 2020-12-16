const { Client, Collection} = require('discord.js');
const Util = require('./Util.js');
const Database = require("../modules/DatabaseModule/Database");
const { db_uri } = require("../../config.json");
const { sendErrorMessage } = require("../modules/MessageUtils/MessageUtils");

module.exports = class DiscordClient extends Client {

    constructor(options = {}) {
        super({
                disableMentions: 'everyone'
            });
        this.validate(options);

        this.commands = new Collection();

        this.utils = new Util(this);

        this.aliases = new Collection();

        this.database = new Database(db_uri, {useNewUrlParser: true});

        this.once('ready', () => {
            console.log(`Logged in as ${this.user.username}!`);
        });

        this.on('message', async (message) => {
            // const mentionRegex = new RegExp(`^<@!${this.user.id}>$`);
            // const mentionRegexPrefix = new RegExp(`^<@!${this.user.id}> `)

            if(!message.guild || message.author.bot) return;

            if (!message.content.startsWith(this.prefix)) return; 

            // if(message.content.match(mentionRegex)) await message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\`.`);

            // const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.prefix;


            //eslint-disable-next-line no-unused-vars
            const [cmd, ...args] = message.content.slice(this.prefix.length).trim().split(/ +/g);
//
            const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
            if(command) {
                if(command.requireStaff && (!(message.member.roles.highest.name === 'Staff') || !(message.member.roles.highest.name === 'Guild Master'))) {
                    sendErrorMessage(message.channel, "You are not a high enough role to use this.")
                    return;
                }
                // noinspection ES6MissingAwait
                message.channel.startTyping();
                await command.run(message, args, this, this.database);
                message.channel.stopTyping();
            }
        })
    }
    validate(options){
        if(typeof options !== 'object') throw new TypeError('Options must be type of object');

        if(!options.token) throw new Error('You must provide a token for the client');
        this.token = options.token;

        if(!options.prefix) throw new Error('You must provide a prefix for the bot.');

        if(typeof options.prefix !== 'string') throw new TypeError('Prefix should be a string');
        this.prefix = options.prefix;
    }
    // noinspection ES6MissingAwait
    async start(token = this.token){
        console.log(this.commands);
        await this.utils.loadCommands();
        await super.login(token);
        console.log(this.commands.size)
    }
    async sendLog(log) {
        let channel = await this.channels.fetch('788533520058155018');
        let eb = new this.MessageEmbed()
            .setColor("#00ff36")
            .setDescription(log)
            .setTitle(`Log of ${new Date().toTimeString()}`);
        channel.send(eb);
    }
}