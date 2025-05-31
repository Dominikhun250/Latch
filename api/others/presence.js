const client = require('../../bot/client');

async function getPresenceData(userId) {
    for (const [, guild] of client.guilds.cache) {
        try {
            const member = await guild.members.fetch({ user: userId, force: true });

            if (!member) continue;

            const presence = member.presence || null;

            let onlineMobile = false;
            let onlineWeb = false;
            let onlinePc = false;

            if (presence?.clientStatus?.mobile) onlineMobile = true;
            if (presence?.clientStatus?.web) onlineWeb = true;
            if (presence?.clientStatus?.desktop) onlinePc = true;

            const devices = {
                desktop: presence?.clientStatus?.desktop || 'offline',
                mobile: presence?.clientStatus?.mobile || 'offline',
                web: presence?.clientStatus?.web || 'offline',
            };
            
            return {
                status: presence?.status || 'offline',
                activities: presence?.activities || [],
                devices: devices,
                onlineMobile,
                onlineWeb,
                onlinePc,
                raw: {member}
            };
        } catch (err) {
            continue;
        }
    }

    return {
        status: 'unknown',
        activities: [],
        devices: {},
        onlineMobile: false,
        onlineWeb: false,
        onlinePc: false
    };
}

module.exports = {
    getPresenceData
};
