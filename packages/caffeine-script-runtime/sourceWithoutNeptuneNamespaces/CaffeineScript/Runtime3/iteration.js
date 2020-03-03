const {isArrayIterable} = require('./types')

module.exports.each = (source, returning, body) => {
  if (source != null) {
    if (isArrayIterable(source)) {
      let {length} = source;
      for (let k = 0; k < length; k++)
        returning = body(source[k], k, returning);

    } else {
      for (let k in source)
        returning = body(source[k], k, returning);

    }
  }

  return returning;
}

module.exports.find = (source, returning, body) => {
  if (source != null) {
    let done = false;
    if (isArrayIterable(source)) {
      let {length} = source;
      for (let k = 0; k < length; k++) {
        [done, returning] = body(source[k], k, returning)
        if (done) break;
      }

    } else {
      for (let k in source) {
        [done, returning] = body(source[k], k, returning)
        if (done) break;
      }

    }
  }

  return returning;
}