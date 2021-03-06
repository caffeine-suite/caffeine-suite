// Generated by CoffeeScript 1.12.7
(function() {
  var Caf, defineModule, describe, falseExistsValue, log, ref, ref1, test;

  ref = require("art-standard-lib"), defineModule = ref.defineModule, log = ref.log;

  ref1 = require("art-testbench"), describe = ref1.describe, test = ref1.test;

  Caf = require("../../");

  falseExistsValue = void 0;

  test("exists undefined", function() {
    return assert.eq(falseExistsValue, Caf.exists(void 0));
  });

  test("exists null", function() {
    return assert.eq(falseExistsValue, Caf.exists(null));
  });

  test("exists 0", function() {
    return assert.eq(true, Caf.exists(0));
  });

  test("exists ''", function() {
    return assert.eq(true, Caf.exists(''));
  });

}).call(this);
