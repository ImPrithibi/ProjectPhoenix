const { Client, Collection, MessageEmbed } = require('discord.js');
const Util = require('./Util.js');
const Database = require("../modules/DatabaseModule/Database");
const { db_uri } = require("../../config.json");
const { sendErrorMessage } = require("../modules/MessageUtils/MessageUtils");
const hypixel = require('@zikeji/hypixel');
// noinspection JSCheckFunctionSignatures
const client = new hypixel.Client(require("../../config.json").hypixel_api_key);

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

        let self = this;

        this.statusMessage = false;

        this.statusInterval = setInterval(() => {
            if (self.statusMessage) {
                self.statusMessage = false;
                self.setStatus(self, "Playing with amount IQ Discord Members", "discord");
            } else {
                self.statusMessage = true;
                self.setStatus(self, "amount/125 members in IQ Guild", "guild");
            }
        }, 30000);

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
            if(cmd === 'shutdown') {
                await message.channel.send('Stopping...')
                process.exit(0);
            }
            const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
            if(command) {
                if(command.requiredRoles) {
                    let isAllowed = false;
                    command.requiredRoles.forEach((roleName) => {
                        if (message.member.roles.cache.find(r => r.id === roleName)) isAllowed = true;
                    });
                    if (!isAllowed) return sendErrorMessage(message.channel, "You are not a high enough role to use this.");
                }
                // noinspection ES6MissingAwait
                message.channel.startTyping();
                command.run(message, args, this, this.database);
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
        await this.utils.loadCommands();
        await super.login(token);
    }
    async sendLog(log) {
        let channel = await this.channels.fetch('789131645361455105');
        let eb = new MessageEmbed()
            .setColor("#00ff36")
            .setDescription(log)
            .setTitle(`Log of ${new Date().toTimeString()}`);
        channel.send(eb);
    }
    async sendMessage(message){
        let channel = await this.channels.fetch('788533520058155018');
        channel.send(message);
    }

    async getGuild() {
        return await this.guilds.fetch("478237364729151498"); // TODO: Make this IQ guild ID
    }

    async setStatus(_client, message, type) {
        if (type === "guild") {
            let amount = (await client.guild.id('5a67bfa70cf29432ef9df6cc')).members.length;

            _client.user.setPresence({
                status: 'online',
                activity: {
                    name: message.replace("amount", amount),
                    type: 'PLAYING',
                }
            });
        } else {
            let amount = (await _client.getGuild()).members.cache.filter(member => !member.user.bot).size;

            _client.user.setPresence({
                status: 'online',
                activity: {
                    name: message.replace("amount", amount),
                    type: 'PLAYING',
                }
            });
        }
    }
}
