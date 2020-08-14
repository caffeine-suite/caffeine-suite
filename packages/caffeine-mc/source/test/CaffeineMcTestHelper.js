"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseObject",
      "path",
      "process",
      "Neptune",
      "Tools",
      "Metacompiler",
      "mockFs",
    ],
    [
      global,
      require("./StandardImport"),
      { path: require("path"), mockFs: require("mock-fs") },
    ],
    (BaseObject, path, process, Neptune, Tools, Metacompiler, mockFs) => {
      let CaffeineMcTestHelper;
      return (global.CaffeineMcTestHelper = CaffeineMcTestHelper = Caf.defClass(
        class CaffeineMcTestHelper extends BaseObject {},
        function (CaffeineMcTestHelper, classSuper, instanceSuper) {
          this.classProperty({ testLog: [] });
          this.log = (str) => this.testLog.push(str);
          this.reset = () => {
            Neptune.CaffeineMc.SourceRoots._resetSourceRoots();
            return (this.testLog = []);
          };
          this.testFiles = {
            alpha: path.join(
              process.cwd(),
              "test",
              "files",
              "SourceRoots",
              "DotCaffeineRoot",
              "HurlockAlpha.caf"
            ),
            beta: path.join(
              process.cwd(),
              "test",
              "files",
              "SourceRoots",
              "DotCaffeineRoot",
              "SubAwesome",
              "BetaRelease.caf"
            ),
          };
          this.mockFileSystem = () => {
            Tools.__preloadCoffeeScriptForTests();
            Metacompiler.getCaffeineScript();
            return mockFs(this.initialFs);
          };
          this.unmockFileSystem = () => mockFs.restore();
          this.initialFs = {
            test: {
              files: {
                "MyCompiler.caffeine":
                  "|coffee-script:\n  {Parser} = require 'babel-bridge'\n  {compactFlatten} = require 'art-standard-lib'\n\n  class MyParser extends Parser\n    @rule\n      root:\n        pattern: 'word+ _?'\n        node: toJs: -> (w.toWord() for w in @words).join ', '\n\n      word:\n        pattern: '_? wordRegExp'\n        node: toWord: -> @wordRegExp.toString()\n\n      wordRegExp: /[^s]+/\n      _: /s+/\n\n  @compiler = compile: (source) ->\n    myParser = new MyParser\n    root = myParser.parse source\n    compiled: js: \"module.exports = '#{root.toJs()}'\"\n\nthis is how it should work!",
                SourceRoots: {
                  DotCaffeineRoot: {
                    SubAwesome: { "BetaRelease.caf": "b.caf ran" },
                    "caffeine-mc.config.caf":
                      '|CoffeeScript\n  CoffeeScript = require \'coffee-script\'\n  path = require \'path\'\n  {formattedInspect} = require \'art-standard-lib\'\n  CaffeineMcTestHelper.log "caffeine-mc.config.caf loaded"\n\n  @compiler = class ItWorkedCompiler\n    @version: "1.2.3"\n    @compile: (source, options) ->\n      {sourceFile, mySpecialConfig} = options\n      CaffeineMcTestHelper.log "caffeine-mc.config.caf custom compiler used on: #{path.basename sourceFile}, mySpecialConfig: #{formattedInspect mySpecialConfig}"\n      CoffeeScript.compile source, options\n\nCaffeineMcTestHelper.log "caffeine-mc.config.caf ran"\nmodule.exports = mySpecialConfig: "worked!"',
                    "HurlockAlpha.caf": "a.caf ran",
                  },
                  "DotCaffeineRootPeer.caf": "",
                },
              },
            },
          };
        }
      ));
    }
  );
});
