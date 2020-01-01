const express = require('express');
const router = express.Router();

const { getPlaylists } = require('../../db');

router.get('/', async (req, res) => {
  try {
    const playlists = await getPlaylists();
    res.status(200).json(playlists);
    return;
  } catch (ex) {
    res.status(ex.status || 500).json({
      message: ex.message || 'Error',
    });
  }
});

module.exports = router;
