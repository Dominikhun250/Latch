const express = require('express');
const config = require('../../config.json');
const client = require('../../bot/client.js');
const { db } = require('../../database/connect.js')
const router = express.Router();

router.delete('/users/:userId/:customId', async (req, res) => {
  const {userId, customId} = req.params;
  const { apikey } = req.headers;
  if (!apikey) {
    return res.status(400).json({ error: 'Missing apikey in headers!' });
  }

  const apiUser = await db().get("key-" + uuid);
  console.log(apiUser)
  console.log(apikey)
  if (apiUser === apikey) {
    const validateId = await db().get(uuid + "-" + customId)
    if(validateId){
    db().delete(uuid + "-" + customId)

    return res.json({ data: {message: 'Success!', uuid: req.params.uuid, id: req.params.id, apikey }, success: true });
    } else {
    return res.status(400).json({ data: {message: 'Invalid custom id!' }, success: false });
    }
  }

  return res.json({ data: {message: 'The user has been successfully deleted!', uuid: req.params.uuid, id: req.params.id, apikey }, success: true});
});

router.put('/users/:uuid', async (req, res) => {
  const userId = req.params.uuid;
  const { apikey, name, value } = req.headers;
  if (!apikey) {
    return res.status(400).json({ error: 'Missing apikey in headers!' });
  }

  if(!name || !value) {
    return res.status(400).json({ error: 'Missing key or value in headers!' });
  }

  const apiUser = await db().get("key-" + userId);
  if (apiUser === apikey) {
    const szam = await db().get("serial-" + userId) || 0;
    db().set(userId + "-" + szam, [{ [name]: value }])
    return res.json({ data: {message: 'Success!', uuid: req.params.uuid, id: req.params.id, apikey}, success: true });
  }

  return res.json({ data: { message: 'Invalis api key!' }, success: false} );;
});

router.get('/users/:uuid', async (req, res) => {
  const userId = req.params.uuid;
  const allData = await db().all();

  const filtered = allData.filter(entry => entry.id.startsWith(`${userId}-`));

  if (filtered.length === 0) {
    return res.status(404).json({
      data: { message: 'User not founded' },
      success: false
    });
  }

  const reply = {};

  for (const entry of filtered) {
    const subId = entry.id.split('-')[1];
    reply[subId] = {
      value: entry.value
    };
  }

  return res.json(reply);
});



module.exports = router;
