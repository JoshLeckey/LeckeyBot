const { SlashCommandBuilder } = require('@discordjs/builders');
const randomPuppy = require('random-puppy');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Gets you a random meme'),
	async execute(interaction) {
        const subreddits = ['dankmeme', 'meme', 'me_irl'];
        const random = subreddits[Math.floor(Math.random() * subreddits.length)];
        const img = await randomPuppy(random);
        const embed = new MessageEmbed().setImage(img).setTitle(`Random Image from ${random}`).setURL(`https://reddit.com/r/${random}`);
        interaction.reply({ embeds: [embed] })
	},
};