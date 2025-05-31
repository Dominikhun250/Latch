const { ActivityType } = require('discord.js');
const config = require('../../config.json');
const { db } = require('../../database/connect')

module.exports = (client) => {
    client.once('ready', () => {

        console.log(`✅ Bot successfully started: ${client.user.tag}`);

        const activityType = ActivityType[config.status_style];

        if (!activityType) {
            console.warn(`⚠️ Érvénytelen status_style: ${config.status_style}. Alapértelmezett: Playing`);
        }

        client.user.setPresence({
            activities: [{
                name: config.status_message,
                type: activityType || ActivityType.Playing,
                url: config.status_style === "Streaming" ? config.status_stream_url : undefined
            }],
            status: config.status
        });
    });
};
