// Generated by CoffeeScript 1.12.7
(function() {
  var CaffeineMc, FileCompiler, array, caffeineInitFileName, defineModule, each, find, findSourceRoot, findSourceRootSync, fs, getCaffeineInit, getCaffeineInitSync, log, merge, path, present, ref, ref1, w;

  ref = require('art-standard-lib'), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

  fs = require('fs-extra');

  path = require('path');

  CaffeineMc = require('./namespace');

  ref1 = require('./SourceRoots'), getCaffeineInit = ref1.getCaffeineInit, caffeineInitFileName = ref1.caffeineInitFileName, findSourceRoot = ref1.findSourceRoot, getCaffeineInitSync = ref1.getCaffeineInitSync, findSourceRootSync = ref1.findSourceRootSync;

  defineModule(module, FileCompiler = (function() {
    function FileCompiler() {}

    FileCompiler.compileFileSync = function(sourceFile, options) {
      var caffeineInit, source, sourceRoot;
      if (options == null) {
        options = {};
      }
      if (options.outputDirectory) {
        throw new Error("outputDirectory unsupported");
      }
      source = options.source, sourceRoot = options.sourceRoot;
      sourceRoot = sourceRoot ? path.resolve(sourceRoot) : findSourceRootSync(sourceFile);
      caffeineInit = getCaffeineInitSync(sourceRoot);
      source || (source = (fs.readFileSync(sourceFile)).toString());
      return CaffeineMc.compile(source, merge(options, {
        sourceFile: sourceFile,
        sourceRoot: sourceRoot
      }), caffeineInit);
    };

    FileCompiler.compileFile = function(sourceFile, options) {
      var outputDirectory, source;
      if (options == null) {
        options = {};
      }
      outputDirectory = options.outputDirectory, source = options.source;
      return findSourceRoot(sourceFile).then(function(sourceRoot) {
        var result;
        result = {
          readCount: 0,
          writeCount: 0,
          outputFiles: [],
          output: null
        };
        return fs.exists(sourceFile).then(function(exists) {
          if (!exists) {
            throw new Error("sourceFile not found: " + sourceFile);
          }
          return getCaffeineInit(sourceRoot);
        }).then(function(arg) {
          var compiler, config, p;
          compiler = arg.compiler, config = arg.config;
          p = source ? Promise.resolve(source) : fs.readFile(sourceFile);
          return p.then(function(source) {
            source = source.toString();
            result.output = compiler.compile(source, merge(config, options, {
              sourceFile: sourceFile,
              sourceRoot: sourceRoot
            }));
            result.readCount++;
            return Promise.all(array(result.output.compiled, function(text, extension) {
              var basename, outputFilename;
              basename = path.basename(sourceFile, path.extname(sourceFile));
              result.outputFiles.push(outputFilename);
              if (outputDirectory) {
                result.writeCount++;
                outputFilename = path.join(outputDirectory, basename + "." + extension);
                return fs.writeFile(outputFilename, text);
              } else {
                return Promise.resolve(text);
              }
            }));
          });
        }).then(function() {
          return result;
        })["catch"](function(e) {
          log.error("error compiling: " + sourceFile);
          throw e;
        });
      });
    };

    return FileCompiler;

  })());

}).call(this);