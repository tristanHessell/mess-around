const express = require('express');
const router = express.Router();

const { getComments, saveComments } = require('../../db');

router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  res.json(await getComments(playlistId));
});

router.put('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;
  const { comments } = req.body;

  await saveComments(playlistId, comments);

  res.sendStatus(200); // TODO
});

module.exports = router;
