const config = require('../config.json')

const { QuickDB, MySQLDriver } = require('quick.db');

let db = null;

async function initDatabase() {
    const driver = new MySQLDriver({
        host: config.mysql.host,
        user: config.mysql.username,
        password: config.mysql.password,
        database: config.mysql.database_name
    });

    await driver.connect(); 
    db = new QuickDB({ driver });

    console.log('✅ Database successfully connected!');
}

module.exports = {
    db: () => db, 
    initDatabase
};
