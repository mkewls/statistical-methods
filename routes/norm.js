/* -=-= Normalization =-=-
  /signals/norm/<id>
*/
const express = require('express');
const norm = express();
// helper fn's
const getSignal = require('../utils/getSignal');
const normalize = require('../utils/normalize');

norm.get('/:id', (req, res, next) => {
  let reqID = req.params.id,
      gettingSignals;

  if (reqID < 1 || typeof reqID !== 'number') {
    return res.status(500).send('ID is invalid');
  }

  gettingSignals = getSignal(reqID);   // returns a promise

  gettingSignals
    .then(signals => {
      normalizedSignals = normalize(signals);
      return res.send(normalizedSignals);
    })
    .catch();
});

module.exports = norm;
