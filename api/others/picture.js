const client = require('../../bot/client');

async function getImage(userId, format) {
    try {
        for (const [, guild] of client.guilds.cache) {
            try {
                const member = await guild.members.fetch(userId);
                if (!member) continue;

                return member.user.displayAvatarURL({ dynamic: true ,  size: 512 });
            } catch {
                continue;
            }
        }
        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function getBanner(userId, format) {
    try {
        const user = await client.users.fetch(userId);
        if (!user) return null;

        const bannerURL = user.bannerURL({ dynamic: true, size: 512 });
        return bannerURL || null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

module.exports = {
    getImage,
    getBanner
};