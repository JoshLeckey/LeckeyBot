//initalizing discord.js
require('dotenv').config();
const fs = require('fs');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const{Client,Intents,Collection} = require('discord.js');
//Creating a new client object :)
const client = new Client({intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
//Creating an array of commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = [];
for (const files of commandFiles){
	const command = require(`./commands/${files}`);
    commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

client.once('ready', ()=> {
    console.log('Leckey ready for action :)');
    const Clientid = client.user.id;
    const rest = new REST({version: "9"}).setToken(process.env.TOKEN);
    (async() =>{
        try{
            if(process.env.ENV === "production"){
                await rest.put(Routes.applicationCommands(Clientid),{
                    body: commands
                });
                console.log("commands registered globally");
            }else{
                await rest.put(Routes.applicationGuildCommands(Clientid,process.env.GUILD_ID),{
                    body: commands
                });
                console.log("commands registered locally");
            }
        }catch(error){
            console.error(error);
        }
    })();
})

client.on('interactionCreate', async interaction =>{
    if(!interaction.isCommand)return;
    const command = client.commands.get(interaction.commandName);
    if(!command)return;
    try{
        await command.execute(interaction);
    }catch(error){
        console.error(error);
        await interaction.reply({content: 'There was an error while running this, please try again', ephermeral:true})
    }
})

client.login(process.env.TOKEN);