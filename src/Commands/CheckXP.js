/* eslint-disable no-unused-vars */
const command = require('../Structures/Command.js');
const { Client } = require('@zikeji/hypixel');
const discClient = require('discord.js');
// noinspection JSCheckFunctionSignatures
const client = new Client(require("../../config.json").hypixel_api_key);
const mcapi = require('minecraft-api');

const { customMessage } = require("../modules/MessageUtils/MessageUtils");

module.exports = class extends command {

	constructor(...args) {
		super(...args, {
			aliases: ['cxp'],
			description: 'Checks the guild XP',
			requireStaff: true
		});
	}
	async run(message, _args) {
		const guild = await client.guild.name('Intelligence Quotient');
		const naughtyPlayers = new Map();

		for(const member of guild.members) {
			let total = 0;
			for(const date of Object.keys(member.expHistory)) {
				total += member.expHistory[date];
			}

			switch (member.rank) {
				case '1st Quad':
					if(total < 75000 && member.joined < ((new Date()).getTime() - (7*24*60*60*1000))){
						naughtyPlayers.set(`\`${await mcapi.nameForUuid(member.uuid)}\` (${member.rank})`, total)
					}
					break;
				case 'Senior':
				case '2nd Quad':

					if(total < 50000 && (member.joined < (new Date().getTime() - (7*24*60*60*1000)))){
						naughtyPlayers.set(`\`${await mcapi.nameForUuid(member.uuid)}\` (${member.rank})`, total)

					}
					break;
				case 'Staff':
					if(total < 30000){
						naughtyPlayers.set(`\`${await mcapi.nameForUuid(member.uuid)}\` (${member.rank})`, total)
					}
					break;
				default:
					break;
			}
		}


		const sortedPlayers = new Map([...naughtyPlayers.entries()].sort((a, b) => a[1]-b[1]));
		buildMessage(sortedPlayers, message);
	}
}
function buildMessage(map, message){
	let description = '';
	let i = 1;
	for(const [key, value] of map){
		description = description + `${i}. ${key} - ${value} GEXP. \n`
		i++;
	}

	customMessage(message.channel, "GREEN", description);
}

