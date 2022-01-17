const { SlashCommandBuilder } = require('@discordjs/builders');
const randomPuppy = require('random-puppy');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('puppy')
		.setDescription('Gets you a random puppy'),
	async execute(interaction) {
        const img = await randomPuppy('puppies');
        const embed = new MessageEmbed().setImage(img).setTitle(`Random pupper <3`);
        interaction.reply({ embeds: [embed] })
	},
};