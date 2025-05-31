const { db } = require('../../database/connect');
const config = require('../../config.json')

module.exports = {
    name: 'set',
    description: 'Thats a command for add custom datas.',
    async execute(message, args) {
        const apikey = await db().get("key-" + message.author.id);
        if (!apikey) {
            return message.reply(`You dont have apikey. Send me this command: ${config.prefix}apikey in DM.`)
        }

        if (args[0] && args[1]) {
            const szam = await db().get("serial-" + message.author.id) || 0;
            const key = args[0];
            const value = args[1];

            await db().set(message.author.id + "-" + szam, [{ [key]: value }]);
            await db().add("serial-" + message.author.id, 1)
            message.channel.send(`Successfully added a custom json object. (name: ${args[0]}, value: ${args[1]})`);
        }
    }
};
