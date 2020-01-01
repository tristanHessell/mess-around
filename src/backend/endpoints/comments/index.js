const express = require('express');
const router = express.Router();

const { getComments, saveComments } = require('../../db');

router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  try {
    const comments = await getComments(playlistId);
    res.status(200).json(comments);
    return;
  } catch (ex) {
    res.status(ex.status || 500).json({
      message: ex.message || 'Error',
    });
  }
});

// on a technical level, put and post here dont do anything different, put I'm including them both just for completeness
// (Both are idempotent in this case)
router.post('/', async (req, res) => {
  const { playlistId, comments } = req.body;

  await saveComments(playlistId, comments);

  res.status(201).setHeader('Location', `comments/${playlistId}`);
});

router.put('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  const { created } = await saveComments(playlistId, req.body);

  if (created) {
    res.status(201).setHeader('Location', `comments/${playlistId}`);
  }

  // if its not created, it means its updated and no content is required to be sent to client
  res.status(204);
});

module.exports = router;
