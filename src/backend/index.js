const express = require('express');
const endpoints = require('./endpoints');

const app = express();

const PORT = 5000;

app.use('', endpoints);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
