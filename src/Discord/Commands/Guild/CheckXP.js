/* eslint-disable no-unused-vars */
const command = require('../../Structures/Command.js');
const {Client} = require('@zikeji/hypixel');
const discord = require('discord.js');
const client = new Client('cb0ecbdb-a60e-4a30-bca4-f48d8e58a7fb');
const mcapi = require('minecraft-api');

// noinspection JSUnresolvedVariable
module.exports = class extends command {

	constructor(...args) {
		super(...args, {
			aliases: ['cxp'],
			description: 'Checks the guild XP'
		});
	}
	async run(message, ..._args) {
		console.log('running');
		const guild = await client.guild.name('Intelligence Quotient');
		const naughtyPlayers = new Map();

		for await (const member of guild.members) {
			console.log('checking data for ' + member.uuid);
			let total = 0;
			for(const date of Object.keys(member.expHistory)) {
				total += member.expHistory[date];
			}

			switch (member.rank) {
				case '1st Quad':
					if(total < 75000 && member.joined < ((new Date()).getUTCMilliseconds() - (7*24*60*60*1000))){
						naughtyPlayers.set(`${await mcapi.nameForUuid(member.uuid)} (1st Quad)`, total)
					}
					break;
				case '2nd Quad':
					if(total < 50000 && member.joined < (new Date().getUTCMilliseconds() - (7*24*60*60*1000))){
						naughtyPlayers.set(`${await mcapi.nameForUuid(member.uuid)} (2nd Quad)`, total)
					}
					break;
				case 'Staff':
					if(total < 30000){
						naughtyPlayers.set(`${await mcapi.nameForUuid(member.uuid)} (2nd Quad)`, total)
					}
					break;
				default:
					break;
			}
		}
		const sortedPlayers = new Map([naughtyPlayers.entries()].sort((a, b) => a[1] - b[1]));
		buildMessage(sortedPlayers, message);
	}
}
function buildMessage(map, message){
	let description = '';
	let i = 1;
	for(const [key, value] of map){
		description = description + `${i}. ${key} - ${value} GEXP. \n`
		i++
	}
	const embedBuilder = new discord.MessageEmbed()
		.setColor("#00ff36")
		.setDescription(description)
		.setTitle("List of players to kick");
	message.channel.send(embedBuilder).then(() => {});
}

