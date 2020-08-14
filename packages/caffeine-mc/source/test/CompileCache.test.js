"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "describe",
      "beforeAll",
      "afterAll",
      "test",
      "mockFs",
      "CompileCache",
      "assert",
      "objectWithout",
      "merge",
      "chainedTest",
      "Metacompiler",
      "WorkingCache",
      "FileCompiler",
      "path",
      "fs",
    ],
    [
      global,
      require("art-standard-lib"),
      require("../CaffeineMc"),
      require("art-testbench"),
      require("caffeine-script"),
      {
        mockFs: require("mock-fs"),
        path: require("path"),
        fs: require("fs-extra"),
      },
    ],
    (
      describe,
      beforeAll,
      afterAll,
      test,
      mockFs,
      CompileCache,
      assert,
      objectWithout,
      merge,
      chainedTest,
      Metacompiler,
      WorkingCache,
      FileCompiler,
      path,
      fs
    ) => {
      let sourceRootName,
        sourceRoot,
        sourcePath,
        sourceFileName,
        sourceFileExtension,
        sourceFile,
        initialFs;
      sourceRootName = "AliceInLove";
      sourceRoot = `/home/alice/${Caf.toString(sourceRootName)}`;
      sourcePath = `${Caf.toString(sourceRoot)}/source/AliceInLove/Lib`;
      sourceFileName = "myFile";
      sourceFileExtension = "caf";
      sourceFile = `${Caf.toString(sourcePath)}/${Caf.toString(
        sourceFileName
      )}.${Caf.toString(sourceFileExtension)}`;
      initialFs = {
        [`${Caf.toString(sourceRoot)}`]: {
          "package.json": "{}",
          source: {
            AliceInLove: {
              Lib: {
                [`${Caf.toString(sourceFileName)}.caf`]: "&standard_import",
              },
              "StandardImport.caf": ":foo",
            },
          },
        },
      };
      return describe({
        basic: function () {
          let fakeInfo;
          beforeAll(() => mockFs(initialFs));
          afterAll(() => mockFs.restore());
          fakeInfo = {
            compiler: { name: "TestCompiler", version: "1.2.3" },
            source: "My source code.",
            sourceFile,
            compiled: { js: "console.log('My source code'.);" },
          };
          test("getFileName", () => {
            let fn;
            fn = CompileCache.getFileName(fakeInfo);
            assert.match(fn, CompileCache.compileCacheFileNameRoot);
            assert.match(fn, "TestCompiler");
            assert.match(fn, sourceRootName);
            assert.match(fn, sourceFileName);
            return assert.match(fn, sourceFileExtension);
          });
          test("cache", () => {
            CompileCache.cache(fakeInfo);
            return assert.eq(
              fakeInfo.compiled,
              CompileCache.fetch(objectWithout(fakeInfo, "compiled")).compiled
            );
          });
          test("different compilerOptions generates different cache filenames", () =>
            assert.neq(
              CompileCache.getFileName(
                merge(fakeInfo, { compilerOptions: {} })
              ),
              CompileCache.getFileName(
                merge(fakeInfo, { compilerOptions: { transpile: true } })
              )
            ));
          return test("compilerOptions with different order still generates same cache filenames", () =>
            assert.eq(
              CompileCache.getFileName(
                merge(fakeInfo, { compilerOptions: { a: 1, b: 2 } })
              ),
              CompileCache.getFileName(
                merge(fakeInfo, { compilerOptions: { b: 2, a: 1 } })
              )
            ));
        },
        FileCompiler: function () {
          beforeAll(() => {
            Metacompiler.CaffeineScript;
            return mockFs(initialFs);
          });
          afterAll(() => mockFs.restore());
          return chainedTest("init", () =>
            WorkingCache.resetWorkingCache()
          ).thenTest(
            [
              "initial",
              () =>
                FileCompiler.compileFile(sourceFile, {
                  cache: true,
                }).then(({ output }) => assert.jsFalse(output.fromCache)),
            ],
            [
              "cached",
              () =>
                FileCompiler.compileFile(sourceFile, {
                  cache: true,
                }).then(({ output }) => assert.true(output.fromCache)),
            ],
            [
              "move moduleDependency triggers recompile",
              () => {
                let outputFilename;
                outputFilename = path.join(
                  path.dirname(sourceFile),
                  "StandardImport.caf"
                );
                return fs
                  .writeFile(outputFilename, ":bar")
                  .then(() => {
                    WorkingCache.resetWorkingCache();
                    return FileCompiler.compileFile(sourceFile, {
                      cache: true,
                    });
                  })
                  .then(({ output }) => assert.jsFalse(output.fromCache));
              },
            ]
          );
        },
      });
    }
  );
});
