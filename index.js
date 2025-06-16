const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const config = require('./config.json')
const client = require('./bot/client.js')
const addPoweredBy = require('./api/middlewares/addPoweredBy');
const { initDatabase } = require('./database/connect');
const { limiter } = require('./api/middlewares/ratelimit.js')
app.use(addPoweredBy);

app.use(limiter);

app.use(cors());

(async () => {
    try {
        await initDatabase();
    } catch (err) {
        console.error('❌ Adatbázis hiba:', err);
    }

    const { startBot } = require('./bot/index.js');
    await startBot()
    app.use('/api/v1', routes);
    app.use(express.json());

    app.get('/', async (req, res) => {
        try {
            const serversCount = client.guilds.cache.size;

            const userIds = new Set();

            for (const guild of client.guilds.cache.values()) {
                const members = await guild.members.fetch();
                members.forEach(member => userIds.add(member.user.id));
            }

            res.json({
                informations: {
                    message: "Welcome on the Latch!",
                    discord_invite: "https://discord.gg/FnPRvGe2xH",
                    author: "Dominikhun250"
                },
                data: {
                    monitored_guild_count: serversCount,
                    monitored_user_count: userIds.size
                }, success: true
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error when we fetched the datas', success: false });
        }
    });

    app.listen(config.port, () => {
        console.log(`✅ Server started: http://localhost:${config.port}`);
    });
})();