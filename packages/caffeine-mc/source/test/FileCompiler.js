// Generated by CoffeeScript 1.12.7
(function() {
  var CompileCache, compileFile, defineModule, each, log, path, ref, ref1;

  ref = require('art-standard-lib'), defineModule = ref.defineModule, log = ref.log, each = ref.each;

  path = require('path');

  ref1 = Neptune.CaffeineMc, compileFile = ref1.compileFile, CompileCache = ref1.CompileCache;

  defineModule(module, {
    suite: {
      basic: function() {
        setup(function() {
          return CaffeineMcTestHelper.reset();
        });
        return each(CaffeineMcTestHelper.testFiles, function(file) {
          return test("compileFile " + (path.basename(file)), function() {
            return compileFile(file).then(function(out) {
              var filename;
              filename = path.basename(file);
              return assert.eq(CaffeineMcTestHelper.testLog, ["caffeine-mc.config.caf loaded", 'caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined', "caffeine-mc.config.caf ran", "caffeine-mc.config.caf custom compiler used on: " + filename + ", mySpecialConfig: :worked!"]);
            });
          });
        });
      },
      withCache: function() {
        setup(function() {
          CaffeineMcTestHelper.reset();
          return CompileCache.reset();
        });
        return each(CaffeineMcTestHelper.testFiles, function(file) {
          return test("compileFile " + (path.basename(file)), function() {
            var firstCompileOutput;
            firstCompileOutput = null;
            return compileFile(file, {
              cache: true
            }).then(function(out) {
              firstCompileOutput = out;
              return assert.ok(!out.fromCache);
            }).then(function() {
              CaffeineMcTestHelper.reset();
              return compileFile(file, {
                cache: true
              });
            }).then(function(secondCompileOutput) {
              assert.eq(CaffeineMcTestHelper.testLog, ["caffeine-mc.config.caf loaded", "caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined", "caffeine-mc.config.caf ran"]);
              assert.ok(secondCompileOutput.output.fromCache);
              return assert.eq(secondCompileOutput.output.compiled, firstCompileOutput.output.compiled);
            });
          });
        });
      }
    }
  });

}).call(this);
