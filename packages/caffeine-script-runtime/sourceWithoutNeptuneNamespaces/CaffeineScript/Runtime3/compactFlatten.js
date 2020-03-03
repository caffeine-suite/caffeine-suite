const {isPlainArray} = require('./types');

const doFlattenInternal = (array, output) => {
  for (let i = 0, len = array.length; i < len; i++) {
    const el = array[i];
    if (isPlainArray(el)) {
      doFlattenInternal(el, output);
    } else if (el != null) {
      output.push(el);
    }
  }
  return output;
};

const needsFlatteningOrCompacting = (array) => {
  for (let i = 0, len = array.length; i < len; i++) {
    let el = array[i];
    if (el == null || isPlainArray(el))
      return true;
  }
  return false;
};

module.exports = (array) =>
  needsFlatteningOrCompacting(array)
  ? doFlattenInternal(array, [])
  : array;