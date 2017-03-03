const express = require('express');
const api = express();

const norm = require('./norm');
const zscore = require('./zscore');
const combine = require('./combine');

api
  .use('/norm', norm)
  .use('/zscore', zscore)
  .use('/combine', combine);

api.use((req, res) => res.status(404).end());

module.exports = api;
