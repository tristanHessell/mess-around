const express = require('express');
const endpoints = require('./endpoints');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

const PORT = 5000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use('', endpoints);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
