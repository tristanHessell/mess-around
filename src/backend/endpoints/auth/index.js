const express = require('express');
const router = express.Router();

// TODO add proper status codes

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    await authorise(username, password);
    req.sendStatus(200).json({});
  } catch (error) {
    res.sendStatus(500).json({});
  }
});

router.post('/logout', async (req, res) => {
  try {
    //
  } catch (error) {
    res.sendStatus(500).json({});
  }
});

router.post('/signup', async (req, res) => {
  // TODO
});

//eslint-disable-next-line no-unused-vars
async function authorise(username, password) {
  // TODO actually implement authorisation
}

module.exports = router;

