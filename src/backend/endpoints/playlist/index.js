const express = require('express');
const router = express.Router();

const { getPlaylist } = require('../../db');

router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playlist = await getPlaylist(playlistId);
    res.status(200).json(playlist);
    return;
  } catch (ex) {
    res.status(ex.status || 500).json({
      message: ex.message || 'Error',
    });
  }
});

// router.post('/', (req, res) => {
//   //
// });

// router.put('/:playlistId', (req, res) => {
//   const { playlistId } = req.params;

// });

// router.delete('/:playlistId', (req, res) => {
//   const { playlistId } = req.params;
// });

module.exports = router;
