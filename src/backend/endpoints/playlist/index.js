const express = require('express');
const router = express.Router();

const { getPlaylist } = require('../../db');

router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  res.status(200).json(await getPlaylist(playlistId));
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
