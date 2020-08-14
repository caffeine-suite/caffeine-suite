// Generated by CoffeeScript 1.12.7
(function() {
  var SourceRoots, WorkingCache, _resetSourceRoots, defineModule, each, findSourceRoot, getCaffeineInit, log, path, ref, ref1;

  ref = require('art-standard-lib'), defineModule = ref.defineModule, log = ref.log, each = ref.each;

  path = require('path');

  ref1 = Neptune.CaffeineMc, WorkingCache = ref1.WorkingCache, SourceRoots = ref1.SourceRoots;

  getCaffeineInit = SourceRoots.getCaffeineInit, findSourceRoot = SourceRoots.findSourceRoot, _resetSourceRoots = SourceRoots._resetSourceRoots;

  defineModule(module, {
    suite: function() {
      setup(function() {
        WorkingCache.resetWorkingCache();
        return CaffeineMcTestHelper.reset();
      });
      each(CaffeineMcTestHelper.testFiles, function(file) {
        return test("findSourceRoot " + (path.basename(file)), function() {
          return findSourceRoot(file).then(function(out) {
            return assert.eq(path.relative(process.cwd(), out), "test/files/SourceRoots/DotCaffeineRoot");
          });
        });
      });
      return each(CaffeineMcTestHelper.testFiles, function(file) {
        return test("getCaffeineInit " + (path.basename(file)), function() {
          return findSourceRoot(file).then(function(sourceRoot) {
            return getCaffeineInit(sourceRoot);
          }).then(function(caffeineInit) {
            assert.eq(CaffeineMcTestHelper.testLog, ["caffeine-mc.config.caf loaded", 'caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined', "caffeine-mc.config.caf ran"]);
            assert.eq(caffeineInit.config, {
              mySpecialConfig: "worked!"
            });
            return assert.isFunction(caffeineInit.compiler.compile);
          });
        });
      });
    }
  });

}).call(this);