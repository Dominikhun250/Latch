module.exports = (req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        if (typeof data === 'object' && data !== null) {
            data.powered_by = 'Latch';
        }
        return originalJson.call(this, data);
    };
    next();
};