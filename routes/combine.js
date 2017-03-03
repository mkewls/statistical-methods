/* -=-= Linear Combination =-=-
  /signals/combine/?signal=<id>,<weight1>&signal=<id2>,<weight2>...
*/
const express = require('express');
const combine = express();
// helper fn's
const getSignal = require('../utils/getSignal');
const { objectMapQueries,
        getQueriedSignals,
        linearCombination } = require('../utils/linearCombination');
const { sortDescending } = require('../utils/helpers');

combine.get('/?', (req, res, next) => {
  let queries = req.query.signal,   // array of str '<id>,<weight>'
      formattedQueries,
      requestingSignalsArray = [];  // promises

  if (typeof queries !== 'object') {   // typeof <array> === Object
    return res.status(500).send('Must include more than one pair of signal and weight'
      + 'to return a combination');
  }

  // parse query strings and structure as an object to better handle
  // multiple weights on a single signal
  formattedQueries = objectMapQueries(queries)
  requestingSignalsArray = getQueriedSignals(formattedQueries);

  Promise.all(requestingSignalsArray)
    .then(signals => {
      let sortedSignal,
          sortedSignals = [],
          combinedScalars;

      signals.forEach(signal => {
        sortedSignal = sortDescending(signal);
        sortedSignals.push(sortedSignal);
      });
      combinedScalars = linearCombination(sortedSignals, formattedQueries);
      return res.send(combinedScalars);
    })
    .catch();
});

module.exports = combine;
