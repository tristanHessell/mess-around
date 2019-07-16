const express = require('express');
const router = express.Router();

router.use('/comments', require('./comments'));
router.use('/playlist', require('./playlist'));
router.use('/playlists', require('./playlists'));

module.exports = router;
