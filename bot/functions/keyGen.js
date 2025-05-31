const { db } = require('../../database/connect')
const crypto = require('crypto');

function generateKey() {
  const key = crypto.randomBytes(16).toString('hex');
  return key;
}

module.exports = { generateKey };
