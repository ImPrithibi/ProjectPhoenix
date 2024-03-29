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
			requiredRoles: ["788636116978630666", "789216259568304169", /*main server*/ "480358874839252992", "480358663077494787"]
		});
	}
	async run(message, _args) {
		const guild = await client.guild.id('5a67bfa70cf29432ef9df6cc');
		const naughtyPlayers = new Map();

		for(const member of guild.members) {
			if(member.uuid === 'ee7ea5573003457eaf598331721f4590'){
				continue; //Removes IQBot from XP check
			}
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

