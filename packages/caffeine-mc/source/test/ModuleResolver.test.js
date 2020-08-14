"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "describe",
      "beforeEach",
      "afterEach",
      "CaffeineMcTestHelper",
      "WorkingCache",
      "test",
      "assert",
      "findModule",
      "afterAll",
      "mockFs",
      "isArray",
      "Error",
      "Object",
      "merge",
      "findModuleSync",
      "getNpmPackageName",
    ],
    [
      global,
      require("./StandardImport"),
      {
        mockFs: require("mock-fs"),
        CaffeineMcTestHelper: require("./CaffeineMcTestHelper"),
      },
    ],
    (
      describe,
      beforeEach,
      afterEach,
      CaffeineMcTestHelper,
      WorkingCache,
      test,
      assert,
      findModule,
      afterAll,
      mockFs,
      isArray,
      Error,
      Object,
      merge,
      findModuleSync,
      getNpmPackageName
    ) => {
      return describe({
        findModule: function () {
          beforeEach(() => {
            WorkingCache.resetWorkingCache();
            CaffeineMcTestHelper.mockFileSystem();
            return CaffeineMcTestHelper.reset();
          });
          afterEach(() => CaffeineMcTestHelper.unmockFileSystem());
          Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`'sub-awesome' in absolutePath.basename('${Caf.toString(
              file
            )}')`, () =>
              /HurlockAlpha\.caf/.test(file)
                ? assert.rejects(
                    findModule("hurlock-alpha", { sourceFile: file })
                  )
                : findModule("hurlock-alpha", { sourceFile: file }).then(
                    ({ requireString, absolutePath }) => {
                      assert.match(
                        requireString,
                        /\..*HurlockAlpha/,
                        "requireString"
                      );
                      return assert.match(
                        absolutePath,
                        /\/.*\/HurlockAlpha/,
                        "absolutePath"
                      );
                    }
                  ))
          );
          Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`'sub-awesome/betaRelease' in absolutePath.basename('${Caf.toString(
              file
            )}')`, () =>
              findModule("sub-awesome/betaRelease", { sourceFile: file }).then(
                ({ requireString, absolutePath }) => {
                  assert.match(
                    requireString,
                    /\..*\/BetaRelease$/,
                    "requireString"
                  );
                  return assert.match(
                    absolutePath,
                    /\/.*\/SubAwesome\/BetaRelease$/,
                    "absolutePath"
                  );
                }
              ))
          );
          Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`'hurlock-alpha.caf' in absolutePath.basename('${Caf.toString(
              file
            )}')`, () =>
              findModule("hurlock-alpha.caf", { sourceFile: file }).then(
                ({ requireString, absolutePath }) => {
                  assert.match(
                    requireString,
                    /\.\/HurlockAlpha\.caf$/,
                    "requireString"
                  );
                  return assert.match(
                    absolutePath,
                    /DotCaffeineRoot\/HurlockAlpha\.caf$/,
                    "absolutePath"
                  );
                }
              ))
          );
          Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`'DotCaffeineRoot' in absolutePath.basename('${Caf.toString(
              file
            )}')`, () =>
              findModule("DotCaffeineRoot", { sourceFile: file }).then(
                ({ requireString, absolutePath }) => {
                  assert.match(requireString, /\.\/$/, "requireString");
                  return assert.match(
                    absolutePath,
                    /DotCaffeineRoot$/,
                    "absolutePath"
                  );
                }
              ))
          );
          Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`'hurlock' in absolutePath.basename('${Caf.toString(
              file
            )}') should not match because it is only partial`, () =>
              assert.rejects(() => findModule("hurlock", { sourceFile: file })))
          );
          Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`'DotCaffeineRootPeer.caf' in absolutePath.basename('${Caf.toString(
              file
            )}') should not match because it is a peer of the root`, () =>
              assert.rejects(() =>
                findModule("DotCaffeineRootPeer.caf", { sourceFile: file })
              ))
          );
          return Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`'SourceRoots' in absolutePath.basename('${Caf.toString(
              file
            )}') should not match because it is the parent of the root`, () =>
              assert.rejects(() =>
                findModule("SourceRoots", { sourceFile: file })
              ))
          );
        },
        npmModules: function () {
          test("npm module", () =>
            findModule("ArtStandardLib", { sourceDir: "." }).then(
              ({ requireString, absolutePath }) => {
                assert.eq(requireString, "art-standard-lib");
                return assert.match(absolutePath, /art-standard-lib$/);
              }
            ));
          return test("pathed npm module", () =>
            findModule("ArtStandardLib/types", { sourceDir: "." }).then(
              ({ requireString, absolutePath }) => {
                assert.eq(requireString, "art-standard-lib/Types");
                return assert.match(absolutePath, /art-standard-lib\/Types$/);
              }
            ));
        },
        stubbedFindModule: function () {
          let dirReaderFromDirMap;
          beforeEach(() => WorkingCache.resetWorkingCache());
          afterAll(() => mockFs.restore());
          dirReaderFromDirMap = (structure) => {
            let findDir;
            findDir = (dir, current = structure) => {
              let first, rest;
              if (dir.length === 0) {
                return current;
              }
              [first, ...rest] = isArray(dir) ? dir : dir.split("/");
              return findDir(rest, structure[first]);
            };
            return {
              dirReader: {
                read: (dir) => {
                  let found;
                  found = findDir(dir);
                  if (!found) {
                    throw new Error(`missing dir: ${Caf.toString(dir)}`);
                  }
                  return Object.keys(found);
                },
                isDir: (dir) => !!findDir(dir),
                resolve: (dir) => dir,
              },
            };
          };
          test("stubbed", () => {
            mockFs({ ArtStandardLib: { alpha: {}, beta: {} } });
            return findModule(
              "ALPHA",
              merge({
                sourceDir: "ArtStandardLib/beta",
                sourceRoot: "ArtStandardLib",
              })
            ).then(({ requireString, absolutePath }) => {
              assert.eq(requireString, "../alpha");
              return assert.match(absolutePath, "ArtStandardLib/alpha");
            });
          });
          test("MyDottedDir finds My.DottedDir", () => {
            mockFs({ myRoot: { "My.DottedDir": { MySubdir: {} } } });
            return findModule(
              "MyDottedDir",
              merge({
                sourceDir: "myRoot/My.DottedDir/MySubdir",
                sourceRoot: "myRoot",
              })
            ).then(({ requireString, absolutePath }) =>
              assert.eq(requireString, "../")
            );
          });
          test("DottedDir does not find My.DottedDir", () => {
            mockFs({
              myRoot: { "My.DottedDir": { MySubdir: {} }, MyDottedDir: {} },
            });
            return assert
              .rejects(
                findModule(
                  "DottedDir",
                  merge({
                    sourceDir: "myRoot/My.DottedDir/MySubdir",
                    sourceRoot: "myRoot",
                  })
                )
              )
              .then((rejectsWith) =>
                assert.match(rejectsWith.message, /Could not find.*DottedDir/i)
              );
          });
          return test("findModuleSync does not resolve to the sourceFile the request came from", () => {
            let found;
            mockFs({
              myRoot: {
                MySubdir: { "StandardImport.caf": "&StandardImport" },
                "StandardImport.caf": "&ArtSuite",
              },
            });
            found = findModuleSync("StandardImport", {
              sourceDir: "myRoot/MySubdir",
              sourceFile: "StandardImport.caf",
              sourceRoot: "myRoot",
            });
            assert.eq(found.requireString, "../StandardImport");
            return assert.isString(found.absolutePath);
          });
        },
        regressions: function () {
          test("getNpmPackageName", () =>
            assert.eq(getNpmPackageName("three", ["build", "three.min"]), {
              requireString: "three",
              absolutePath: require
                .resolve("three/build/three.min")
                .split(/\/build/)[0],
            }));
          return test("findModuleSync 'three/build/threeMin' - should return same as require.resolve", () =>
            assert.eq(
              {
                requireString: "three/build/three.min",
                absolutePath: require
                  .resolve("three/build/three.min")
                  .split(/\.js$/)[0],
              },
              findModuleSync("three/build/threeMin")
            ));
        },
      });
    }
  );
});
