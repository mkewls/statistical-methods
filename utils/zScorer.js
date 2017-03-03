const zScorer = (arrayOfDatesValues, inputWindow) => {
  let sampleWindow = Number(inputWindow),
      samplePop = sampleWindow - 1,  // sample population is one less for z-score
      valuesInWindow = [],
      scoredDates = [],    // fn output
      curDateValue,
      curValue,
      curWindow,
      discardedValue,
      sum = 0.0,
      mean = 0.0,
      ssd = 0.0,      // sum of squared deviations
      std = 0.0,      // standard deviation
      score = 0.0;

  while (arrayOfDatesValues.length > 0) {
    curDateValue = arrayOfDatesValues.pop();
    curValue = Number(curDateValue['value']);
    // all cases: advance the window 'head', add dates/vals to datesValuesInWindow
    // unstated case: 'not yet in-window' b/c we do not score or move 'tail'
    valuesInWindow.push(curValue);
    curWindow = valuesInWindow.length;
    sum += curValue;
    // in-window case: we z-score the current date using all stored values
    if (curWindow === sampleWindow) {
      mean = sum / curWindow;
      valuesInWindow.forEach(value => {
        ssd += Math.pow((value - mean), 2);
      });
      std = Math.sqrt(ssd / samplePop);  // sample pop. equation (vice total pop.) 
      score = ((curValue - mean) / std);
      scoredDates.push({ 'date': curDateValue['date'], 'value': score });
      // reset and remove for next iteration
      ssd = 0;
      discardedValue = valuesInWindow.shift();
      sum -= discardedValue;
    }
  }
  return scoredDates;
}

module.exports = zScorer;
