const express = require('express');
const fetch = require('node-fetch');
const config = require('../../config.json');
const { db } = require('../../database/connect');
const { getPresenceData } = require('../others/presence');
const { getImage, getBanner } = require('../others/picture')
const router = express.Router();

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const API_URL = `https://discord.com/api/v10/users/${userId}`;

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bot ${config.TOKEN}`,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).catch((error) => {
        return {
            debug: { error: error.message },
            data: {
                message: `The searched user not monitored. (${userId})`,
            },
            success: false
        };
    });

    const allData = await db().all();
    const matched = allData.filter(entry => entry.id.startsWith(`${userId}-`));
    const result = {};
    for (const entry of matched) {
        const parts = entry.id.split('-');
        const subId = parts[1];
        result[subId] = { value: entry.value };
    }

    const presence = await getPresenceData(userId);

    return res.send({
        custom: result,
        data: { response, status: presence.status, activities: presence.activities, online_on_mobile: presence.onlineMobile, online_on_web: presence.onlineWeb, online_on_dektop: presence.onlinePc, devices: presence.devices },
        success: true
    });
});

router.get('/avatar/:id/:format', async (req, res) => {
    const userId = req.params.id;
    const formatData = req.params.format;
    const presence = await getPresenceData(userId);
    const member = presence?.raw?.member;

    const avatar = await getImage(userId, formatData)
    res.json({
        data: {
            avatar: avatar.replace(".webp", `.${formatData}`)
        }, success: true
    });
});

router.get('/banner/:id/:format', async (req, res) => {
    const userId = req.params.id;
    const formatData = req.params.format;
    const presence = await getPresenceData(userId);
    const member = presence?.raw?.member;

    const banner = await getBanner(userId, formatData)
    res.json({
        data: {
            banner: banner.replace(".webp", `.${formatData}`).replace(".gif", `.${formatData}`)
        }, success: true
    });
});

module.exports = router;
