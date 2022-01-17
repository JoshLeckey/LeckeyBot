//Inclusion of nazi.cc Videos
const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nazi')
    .setDescription('Gets a random video from nazi.cc'),
    async execute(interaction){
        const{
            data: {list},
        }= await axios.get(`https://nazi.cc/api.php`)
        const [video ] = list;
        interaction.reply(video.url);
    }
}