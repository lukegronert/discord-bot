// Init dotenv
import 'dotenv/config'
import fetch from 'cross-fetch';

import { Client, Intents } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

// Log in bot
client.login(process.env.CLIENT_TOKEN)

client.on('messageCreate', msg => {
    console.log(msg)
    if(msg.content.includes('crypto')) {
        let arr = msg.content.split(' ');
        arr = arr.splice(arr.indexOf('crypto'));
        let idString = arr.join(',')
        fetch(`https://api.coincap.io/v2/assets?ids=${idString}`)
            .then(response => response.json())
            .then(data => {
                data.data.forEach(coin => {
                    msg.reply(`${coin.symbol} - ${coin.priceUsd}`)
                })
            })
            .catch( err => {
                msg.reply('Error in retrieving data...')
            })
    }
})