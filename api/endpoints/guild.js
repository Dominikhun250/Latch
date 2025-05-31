const express = require('express');
const config = require('../../config.json');
const client = require('../../bot/client.js');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const guildId = req.params.id;
    const API_URL = `https://discord.com/api/v10/guilds/${guildId}`;

    fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bot ${config.TOKEN}`
        }
    })
        .then(res => res.json())
        .then(data => res.json({data: data, success: true}))
        .catch(res.json({error: 'The guild not founded.', success: false}));
})

router.get('/:id/users', async (req, res) => {
    try {
        const guildId = req.params.id;
        const guild = client.guilds.cache.get(guildId);

        if (!guild) {
            return res.status(404).json({ success: false, error: 'The guild not founded.' });
        }

        const members = await guild.members.fetch();

        const data = {
            guildName: guild.name,
            guildId: guild.id,
            memberCount: guild.memberCount,
            members: members.map(member => ({
                id: member.user.id,
                username: member.user.username,
                tag: member.user.tag
            }))
        };

        res.json({ data: data, success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'Error when we tried fetch the guild datas.', details: err.message });
    }
});

module.exports = router;
