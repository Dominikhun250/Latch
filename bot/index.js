const { GatewayIntentBits, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config.json')
const prefix = config.prefix;

const { generateKey } = require('./functions/keyGen');
const { db } = require('../database/connect')

const client = require('./client');

client.commands = new Map();

async function startBot() {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    require('./events/ready')(client);

    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        if (message.channel.isDMBased()) {
            if (!message.content) return;

            if (message.content.toLowerCase() == config.prefix + "apikey") {
                const key = generateKey();

                db().set("key-" + message.author.id, key)
                return message.reply(`Successfully generated a api key!!! Do not share it anyone!!! Key: ||${key}||`);
            }
        }


        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();
        const command = client.commands.get(cmdName);
        if (command) {
            try {
                await command.execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('Error when you used the command.');
            }
        }
    });



    await client.login(config.TOKEN);
}

module.exports = { startBot, client };
