(function () {
  var upperCamelCase;

  upperCamelCase = require("art-standard-lib").upperCamelCase;

  module.exports = {
    compile: function (source) {
      return upperCamelCase(source);
    },
  };
}.call(this));
