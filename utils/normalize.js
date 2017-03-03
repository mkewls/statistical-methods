const normalize = (signals) => {
  let max,
      min,
      curValue,
      normalized,
      results;

  max = 0;
  min = Infinity;     // to handle any real number minimum

  signals.forEach(dateValuePair => {
    curValue = dateValuePair['value'];
    max = max > curValue ? max : curValue;
    min = min < curValue ? min : curValue;
  });

  signals.map(dateValuePair => {
    curValue = dateValuePair['value'];
    normalized = 100 * (curValue - min) / (max - min);  // [0,100]
    dateValuePair['value'] = normalized;
    return dateValuePair;
  });

  return signals;
};

module.exports = normalize;
