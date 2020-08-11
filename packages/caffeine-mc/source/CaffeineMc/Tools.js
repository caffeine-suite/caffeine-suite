// Generated by CoffeeScript 1.12.7
(function() {
  var Tools, defineModule, escapeRegExp, log, path, ref, vm;

  ref = require('art-standard-lib'), log = ref.log, escapeRegExp = ref.escapeRegExp, defineModule = ref.defineModule;

  path = require('path');

  vm = require('vm');

  defineModule(module, Tools = (function() {
    function Tools() {}

    Tools.fileExtensions = ["caf", "caffeine"];

    Tools.fileIsCaffeine = function(filename) {
      return /\.(caf|caffeine)$/.test(filename);
    };

    Tools.runInContext = function(js, context, filename) {
      if (context === global) {
        return vm.runInThisContext(js, filename);
      } else {
        return vm.runInContext(js, context, filename);
      }
    };

    Tools.evalInContext = function(js, context) {
      var e;
      try {
        return (function() {
          return eval(js);
        }).call(context);
      } catch (error) {
        e = error;
        console.error("<---> evalInContext: error: js:");
        console.error(js);
        console.error("<--->");
        throw e;
      }
    };

    Tools.displayError = function(e, options) {
      var verbose;
      if (options == null) {
        options = {};
      }
      require('colors');
      if (!e) {
        return;
      }
      verbose = options.verbose;
      if (verbose) {
        return log.error(e);
      } else if ((e.location != null) || (e.sourceFile != null)) {
        if (e) {
          return log(e.message.replace(/<HERE>/, "<HERE>".red));
        }
      } else {
        return log.error(e.stack.split("\n").slice(0, 30).join("\n").replace(new RegExp(escapeRegExp(process.cwd() + "/"), "g"), './').replace(new RegExp(escapeRegExp(path.dirname(process.cwd()) + "/"), "g"), '../'));
      }
    };

    return Tools;

  })());

}).call(this);
