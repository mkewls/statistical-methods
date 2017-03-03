const getSignal = require('./getSignal');

const objectMapQueries = (queryArray) => {
  let err,
      signalID,
      weight,
      objectMappedQueries = {};

  for (let query of queryArray) {
    query = query.split(',');
    if (typeof query !== 'object') {
      err = new Error('Improperly formatted query: lacks comma between'
      + 'signal and weight');
      throw err;
    }
    weight = Number(query[1]);
    if (objectMappedQueries[signalID]) {
      objectMappedQueries[signalID].push(weight);
    } else {
      objectMappedQueries[signalID] = [weight];
    }
  }

  return objectMappedQueries;
};

const getQueriedSignals = (mapOfQueries) => {
  let signalIDsArray,
      promisedSignalRequest,
      requestingSignalsArray = [];

  signalIDsArray = Object.keys(mapOfQueries);  // signalIDs are strs

  for (let id of signalIDsArray) {
    promisedSignalRequest = getSignal(id);
    requestingSignalsArray.push(promisedSignalRequest);
  }

  return requestingSignalsArray;
};

const linearCombination = (signals, mapOfQueries) => {
  let vectorLength,
      combinedScalars,
      sortedSignal,
      signalIDsArray,
      idKey,
      weights,
      weight;

  vectorLength = signals[0].length;
  combinedScalars = new Array(vectorLength);
  signalIDsArray = Object.keys(mapOfQueries);
  // O(kn) where k = # of signals, n = length of vector 
  for (let i = 0; i < signals.length; i++) {
    if (signals[i].length !== vectorLength) {
      err = new Error('Error: vectors are different sizes. Cannot combine.');
      throw err;
    }

    idKey = signalIDsArray[i];       // signalIDs correlate by index to signals
    weights = mapOfQueries[idKey];   // same for weights
    weight = weights.reduce((x,y) => x += y)   // if >1 weight, sum to single scalar
    for (let j = 0; j < vectorLength; j++) {
      if (i === 0) {
        combinedScalars[j] = { 'date': signals[i][j]['date'], 'value': 0 };
      }
      combinedScalars[j]['value'] += (signals[i][j]['value'] * weight);
    }
  }

  return combinedScalars;
};

module.exports = { objectMapQueries, getQueriedSignals, linearCombination };
