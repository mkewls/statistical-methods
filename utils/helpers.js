// sort by string dates from most recent to earliest
const sortDescending = (arrayOfDatesValues) => {
  arrayOfDatesValues.sort((x, y) => {
    return y - x;
  })
  return arrayOfDatesValues;
}

module.exports = { sortDescending };
