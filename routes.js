const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const endpointsDir = path.join(__dirname, 'api', 'endpoints');

fs.readdirSync(endpointsDir).forEach(file => {
    if (file.endsWith('.js')) {
        const route = require(path.join(endpointsDir, file));
        const routePath = `/${file.replace('.js', '')}`;
        router.use(routePath, route);
        //console.log(`Betöltve: ${routePath}`);
    }
});

module.exports = router;
