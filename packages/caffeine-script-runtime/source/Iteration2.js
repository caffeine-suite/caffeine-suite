// Generated by CoffeeScript 1.12.7
(function() {
  var existsTest, isArrayIterable, returnFirst, returnSecond, returnTrue;

  isArrayIterable = require('./Types').isArrayIterable;

  existsTest = function(a) {
    return a != null;
  };

  returnTrue = function() {
    return true;
  };

  returnFirst = function(a) {
    return a;
  };

  returnSecond = function(a, b) {
    return b;
  };

  module.exports = {
    isArrayIterable: isArrayIterable,
    find: function(source, withClause, whenClause) {
      var i, j, k, l, len, len1, len2, result, v;
      if (source != null) {
        if (!(whenClause || withClause)) {
          whenClause = existsTest;
        }
        if (isArrayIterable(source)) {
          switch (false) {
            case !(whenClause && withClause):
              for (k = i = 0, len = source.length; i < len; k = ++i) {
                v = source[k];
                if (whenClause(v, k)) {
                  return withClause(v, k);
                }
              }
              break;
            case !whenClause:
              for (k = j = 0, len1 = source.length; j < len1; k = ++j) {
                v = source[k];
                if (whenClause(v, k)) {
                  return v;
                }
              }
              break;
            case !withClause:
              for (k = l = 0, len2 = source.length; l < len2; k = ++l) {
                v = source[k];
                if (result = withClause(v, k)) {
                  return result;
                }
              }
          }
        } else {
          switch (false) {
            case !(whenClause && withClause):
              for (k in source) {
                v = source[k];
                if (whenClause(v, k)) {
                  return withClause(v, k);
                }
              }
              break;
            case !whenClause:
              for (k in source) {
                v = source[k];
                if (whenClause(v, k)) {
                  return v;
                }
              }
              break;
            case !withClause:
              for (k in source) {
                v = source[k];
                if (result = withClause(v, k)) {
                  return result;
                }
              }
          }
        }
      }
      return null;
    },
    object: function(source, withClause, whenClause, into, keyClause) {
      var i, k, len, v;
      if (withClause == null) {
        withClause = returnFirst;
      }
      if (whenClause == null) {
        whenClause = returnTrue;
      }
      if (into == null) {
        into = {};
      }
      if (isArrayIterable(source)) {
        if (keyClause == null) {
          keyClause = returnFirst;
        }
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          if (whenClause(v, k)) {
            into[keyClause(v, k)] = withClause(v, k);
          }
        }
      } else {
        if (keyClause == null) {
          keyClause = returnSecond;
        }
        for (k in source) {
          v = source[k];
          if (whenClause(v, k)) {
            into[keyClause(v, k)] = withClause(v, k);
          }
        }
      }
      return into;
    },
    reduce: function(source, withClause, whenClause, inject) {
      var i, k, len, v;
      if (withClause == null) {
        withClause = returnFirst;
      }
      if (whenClause == null) {
        whenClause = returnTrue;
      }
      if (isArrayIterable(source)) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          if (v !== void 0 && whenClause(inject, v, k)) {
            inject = inject === void 0 ? v : withClause(inject, v, k);
          }
        }
      } else {
        for (k in source) {
          v = source[k];
          if (v !== void 0 && whenClause(inject, v, k)) {
            inject = inject === void 0 ? v : withClause(inject, v, k);
          }
        }
      }
      return inject;
    },
    array: function(source, withClause, whenClause, into) {
      var i, k, len, v;
      if (withClause == null) {
        withClause = returnFirst;
      }
      if (whenClause == null) {
        whenClause = returnTrue;
      }
      if (into == null) {
        into = [];
      }
      if (isArrayIterable(source)) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          if (whenClause(v, k)) {
            into.push(withClause(v, k));
          }
        }
      } else {
        for (k in source) {
          v = source[k];
          if (whenClause(v, k)) {
            into.push(withClause(v, k));
          }
        }
      }
      return into;
    },
    each2: function(source, withClause, whenClause, into) {
      var i, k, len, v;
      if (withClause == null) {
        withClause = returnFirst;
      }
      if (whenClause == null) {
        whenClause = returnTrue;
      }
      if (into == null) {
        into = source;
      }
      if (isArrayIterable(source)) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          if (whenClause(v, k)) {
            withClause(v, k);
          }
        }
      } else {
        for (k in source) {
          v = source[k];
          if (whenClause(v, k)) {
            withClause(v, k);
          }
        }
      }
      return into;
    }
  };

}).call(this);
