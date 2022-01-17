const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder().setName('urbandictionary')
    .setDescription('Search a term on urban dictonary')
    .addStringOption(option => option.setName('input').setDescription('Enter a string')),
    async execute(interaction){
        const term = interaction.options.getString('input');
        const{
            data: {list},
        }= await axios.get(`https://api.urbandictionary.com/v0/define?term=${term}`)
        const [answer ] = list;
        try{
            const embed = new MessageEmbed()
            .setTitle(answer.word)
            .addField("Definition", answer.definition)
            .addField('Example' ,answer.example)
            .addField('Rating',`👍${answer.thumbs_up} || 👎${answer.thumbs_down}`)
            interaction.reply({embeds: [embed]});
        }
        catch(error){
            const embed = new MessageEmbed()
            .setTitle("Word not found")
            .setDescription("Sorry but the word you searched wasnt found\n rip")
            .setImage("https://preview.redd.it/iysl5f5vrxe31.jpg")
            interaction.reply({embeds: [embed]});
        }
    }
}