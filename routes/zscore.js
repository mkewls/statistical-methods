/* -=-= Z-Scores =-=-
  /signals/zscore/<id>?window=<window>
*/
const express = require('express');
const zscore = express();
// helper fn's
const getSignal = require('../utils/getSignal');
const zScorer = require('../utils/zScorer');
const { sortDescending } = require('../utils/helpers');

zscore.get('/:id?', (req, res, next) => {
  let reqID = req.params.id,
      reqWindow = req.query.window,
      gettingSignal;

  if (reqID < 1 || typeof reqID !== 'number') {
    return res.status(500).send('ID is invalid');
  }

  if (reqWindow <= 1) {
    return res.status(500).send('Window must be greater than 1');
  }

  gettingSignal = getSignal(reqID); // promise

  gettingSignal
    .then(signal => {
      let sortedData, scoredData;

      sortedData = sortDescending(signal);   // sort by date
      scoredData = zScorer(sortedData, reqWindow);
      return res.send(scoredData);
    })
    .catch();
});

module.exports = zscore;
