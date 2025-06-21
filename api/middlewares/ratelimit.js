const rateLimit = require('express-rate-limit');
const config = require('../../config.json')

const limiter = rateLimit({
    windowMs: config.ratelimit.second * 1000,
    max: config.ratelimit.max_request,
    handler: (req, res) => {
        res.status(429).json({
            message: 'Ratelimited.',
            success: false,
        });
    }
});

module.exports = {
    limiter
};
