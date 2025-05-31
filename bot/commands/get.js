const { db } = require('../../database/connect');
const config = require('../../config.json')

module.exports = {
    name: 'get',
    description: 'Get command for custom datas.',
    async execute(message, args) {
        const apikey = await db().get("key-" + message.author.id);
        if(!apikey) {
            return message.reply(`You dont have apikey. Send me this command: ${config.prefix}apikey in DM.`)
        }

        const userId = args[0] || message.author.id;
        const allData = await db().all();

        const filtered = allData.filter(entry => entry.id.startsWith(`${userId}-`));

        if (filtered.length === 0) {
            return message.channel.send('Not founded any data.');
        }

        let reply = `**Datas for the ${userId}:**\n`;

        for (const entry of filtered) {
            const subId = entry.id.split('-')[1];
            reply += `🔹 **${subId}**: ${JSON.stringify(entry.value)}\n`;
        }

        message.channel.send(reply);
    }
};
