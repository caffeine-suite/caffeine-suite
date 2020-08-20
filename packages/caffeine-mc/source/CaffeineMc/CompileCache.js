"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "defineModule",
      "BaseClass",
      "os",
      "path",
      "isString",
      "crypto",
      "Error",
      "formattedInspect",
      "findSourceRootSync",
      "consistentJsonStringify",
      "log",
      "fs",
      "JSON",
      "merge",
      "currentSecond",
      "findModuleSync",
      "glob",
      "Promise",
    ],
    [
      global,
      require("./StandardImport"),
      require("./SourceRoots"),
      require("./ModuleResolver"),
      { crypto: require("crypto"), os: require("os") },
    ],
    (
      defineModule,
      BaseClass,
      os,
      path,
      isString,
      crypto,
      Error,
      formattedInspect,
      findSourceRootSync,
      consistentJsonStringify,
      log,
      fs,
      JSON,
      merge,
      currentSecond,
      findModuleSync,
      glob,
      Promise
    ) => {
      let CompileCache;
      require("chalk");
      return defineModule(
        module,
        (CompileCache = Caf.defClass(
          class CompileCache extends BaseClass {},
          function (CompileCache, classSuper, instanceSuper) {
            this.compileCacheFileNameRoot = "CaffineMcCompileCache";
            this.classGetter({
              compileCachePathRoot: function () {
                return os.tmpdir();
              },
              compileCacheFilePathRoot: function () {
                return (
                  this._compileCacheFilePathRoot ||
                  (this._compileCacheFilePathRoot = path.join(
                    this.compileCachePathRoot,
                    this.compileCacheFileNameRoot
                  ))
                );
              },
            });
            this.compilerSupportsCaching = function (compiler) {
              return (
                isString(compiler.version) && this.getCompilerName(compiler)
              );
            };
            this.getCompilerName = function (compiler) {
              return (
                (Caf.isF(compiler.getName) && compiler.getName()) ||
                compiler.name
              );
            };
            this.getCompilerSignature = function (compiler) {
              return `${Caf.toString(
                this.getCompilerName(compiler)
              )}-${Caf.toString(compiler.version)}`;
            };
            this.makeSha256FilenameFriendly = function (sha256String) {
              return sha256String.replace(/[\/+=]/g, "-");
            };
            this.hashSource = function (source) {
              return this.makeSha256FilenameFriendly(
                crypto
                  .createHmac("sha256", "no need for a real secret")
                  .update(source)
                  .digest("base64")
                  .split("=")[0]
              );
            };
            this.getFileName = function (cachedFileKey) {
              let compiler,
                source,
                sourceFile,
                compilerOptions,
                sourceRoot,
                relativeSourceFile;
              ({
                compiler,
                source,
                sourceFile,
                compilerOptions,
              } = cachedFileKey);
              if (!(compiler && sourceFile && source != null)) {
                throw new Error(
                  "expecting compiler, source and sourceFile: " +
                    formattedInspect({ compiler, source, sourceFile })
                );
              }
              if (!this.compilerSupportsCaching(compiler)) {
                return null;
              }
              sourceRoot = findSourceRootSync(sourceFile);
              relativeSourceFile = path.relative(sourceRoot, sourceFile);
              source = `# sourceFile: ${Caf.toString(
                relativeSourceFile
              )}\n# compilerOptions: ${Caf.toString(
                consistentJsonStringify(
                  compilerOptions != null ? compilerOptions : null
                )
              )}\n${Caf.toString(source)}\n"""`;
              return (
                [
                  this.compileCacheFilePathRoot,
                  path.basename(sourceRoot).replace(/\./g, "-"),
                  path.basename(sourceFile).replace(/\./g, "-"),
                  this.getCompilerSignature(compiler),
                  this.hashSource(source),
                ].join("_") + ".json"
              );
            };
            this.cache = function (cachedFileKey) {
              let fileName, source, compiled, props;
              if ((fileName = this.getFileName(cachedFileKey))) {
                ({ source, compiled, props } = cachedFileKey);
                if (cachedFileKey.verbose) {
                  log({ caching: cachedFileKey.sourceFile });
                }
                fs.writeFileSync(
                  fileName,
                  JSON.stringify(merge({ source, compiled, props }))
                );
              }
              return cachedFileKey;
            };
            this.fetch = function (cachedFileKey) {
              let start, fileName, cacheContents;
              start = currentSecond();
              return (fileName = this.getFileName(cachedFileKey)) &&
                fs.existsSync(fileName)
                ? (cacheContents = (() => {
                    try {
                      return JSON.parse(fs.readFileSync(fileName));
                    } catch (error) {}
                  })()) &&
                  cacheContents.source === cachedFileKey.source &&
                  this.verifyDependencies(cachedFileKey, cacheContents.props)
                  ? ((cacheContents.fromCache = true),
                    cachedFileKey.verbose
                      ? log({
                          cached:
                            `${Caf.toString(
                              ((currentSecond() - start) * 1000) | 0
                            )}ms ` + cachedFileKey.sourceFile,
                        })
                      : undefined,
                    cacheContents)
                  : undefined
                : undefined;
            };
            this.verifyDependencies = function (cachedFileKey, props) {
              return !Caf.find(
                Caf.exists(props) && props.moduleDependencies,
                (cachedRequireString, sourceString) =>
                  findModuleSync(sourceString, {
                    sourceFile: cachedFileKey.sourceFile,
                  }).requireString !== cachedRequireString
              );
            };
            this.reset = function (verbose) {
              return glob(this.compileCacheFilePathRoot + "*").then((list) =>
                Promise.all(
                  Caf.array(list, (item) =>
                    Promise.resolve(item)
                      .then((item) => fs.unlink(item))
                      .tap(() =>
                        verbose
                          ? log(
                              "cache-reset: ".gray +
                                item.green +
                                " (deleted)".gray
                            )
                          : undefined
                      )
                  )
                )
              );
            };
          }
        ))
      );
    }
  );
});
