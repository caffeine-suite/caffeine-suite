// Generated by CoffeeScript 1.12.7
(function() {
  var CaffeineEight, CaffeineMc, cafSourceMaps, getEnv, loaderUtils, log, ref;

  CaffeineMc = require('./index');

  CaffeineEight = require('caffeine-eight');

  loaderUtils = require('loader-utils');

  ref = require('art-standard-lib'), log = ref.log, getEnv = ref.getEnv;


  /*
  TODO: Fix SOURCEMAPS (SBD 2018-07-30 notes)
  'cafSourceMaps' is a temporary hack for testing.
  
  This current code actually works with webpack4/webpack-dev-server3 && Safari,
  but it DOESNT work in Chrome. Chrome seems to actually get the sourcemap correctly,
  but it won't show the original source.
  SO - cafSourceMaps is off by default, but you can turn it on if you want:
  
    > cafSourceMaps=true webpack-dev-server
   */

  cafSourceMaps = getEnv.cafSourceMaps;

  module.exports = function(source) {
    var e, js, out, ref1, sourceFile, sourceMap;
    if (typeof this.cacheable === "function") {
      this.cacheable();
    }
    sourceFile = loaderUtils.getRemainingRequest(this);
    try {
      ref1 = CaffeineMc.FileCompiler.compileFileSync(sourceFile, {
        source: source,
        debug: this.debug,
        sourceRoot: "",
        cache: true,
        inlineMap: !!cafSourceMaps,
        prettier: !cafSourceMaps
      }).compiled, js = ref1.js, sourceMap = ref1.sourceMap;
      return this.callback(null, js, sourceMap);
    } catch (error) {
      e = error;
      if (e instanceof CaffeineEight.CaffeineEightCompileError) {
        out = new Error(e.toString());
        out.stack = "";
        throw out;
      } else {
        log.error({
          "CaffeineMc webpack-loader error": e
        });
      }
      throw e;
    }
  };

  module.exports.separable = true;

}).call(this);
