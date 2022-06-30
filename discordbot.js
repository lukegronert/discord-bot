// Init dotenv
require('dotenv').config();

const { Client, Intents } = require('discord.js');
const { mkdirSync } = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

// Log in bot
client.login(process.env.CLIENT_TOKEN)

client.on('messageCreate', msg => {
    console.log(msg)
    if(msg.content === 'Hello') {
        msg.reply(`Hello ${msg.author.username}`)
    }
})