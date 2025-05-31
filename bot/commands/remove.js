const { db } = require('../../database/connect');
const config = require('../../config.json')

module.exports = {
    name: 'remove',
    description: 'Thats a remove command for the custom datas',
    async execute(message, args) {
        const apikey = await db().get("key-" + message.author.id);
        if (!apikey) {
            return message.reply(`You dont have apikey. Send me this command: ${config.prefix}apikey in DM.`)
        }

        const userId = message.author.id;
        const subId = args[0];

        if (!subId) {
            return message.channel.send('You need to say an id.');
        }

        const key = `${userId}-${subId}`;
        const exists = await db().get(key);

        if (!exists) {
            return message.channel.send(`Not found id: \`${key}\``);
        }

        await db().delete(key);
        message.channel.send(`Successfully deleted this: \`${key}\``);
    }
};
