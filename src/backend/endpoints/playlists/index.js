const express = require('express');
const router = express.Router();

const { getPlaylists } = require('../../db');

router.get('/', async (req, res) => {
  res.json(await getPlaylists());
});

module.exports = router;
