const express = require('express');
const router = express.Router();

const { getComments, saveComments } = require('../../db');

router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  res.json(await getComments(playlistId));
});

router.put('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  await saveComments(playlistId, req.body);

  res.json({}); // TODO
});

module.exports = router;
