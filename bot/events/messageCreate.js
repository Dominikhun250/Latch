const { ChannelType } = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'messageCreate',
    execute(client, message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix) || "!") return;

        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Hiba történt a parancs futtatása közben.');
        }
    }
};
