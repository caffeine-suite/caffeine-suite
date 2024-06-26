Compilers = require './Compilers'

CaffeineMcParser = require './CaffeineMcParser'
CaffeineMc = require './namespace'
CompileCache = require './CompileCache'

CaffeineMc.cacheEnabled = true

realRequire = eval 'require'

{ dashCase, formattedInspect, present, isFunction, log, isString, lowerCamelCase, upperCamelCase, merge
  objectWithout
  isArray
  isObject
} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

{checkWorkingCacheExpiration} = require './WorkingCache'

module.exports = class Metacompiler extends BaseClass
  @compile: (code, options = {})=>
    new @().compile code, options

  @classGetter
    CaffeineScript: -> require 'caffeine-script'

  @getter "compiler lastMetacompilerResult",
    current: -> @compiler

  @setter
    ###
      IN:
        string: configure to use one of the CaffeineCompiler classes
        function: compileFunction
        object:
          compiler: custom compiler instance. Must implement:
            compile: compileFunction

      compileFunction: (sourceCode, options) ->
        IN:
          sourceCode: string
          options: {}
        ERROR: throw errors
        OUT:
          evalable-js-string
          OR
          object with at least:
            compiled: js: evalable-js-string
    ###
    compiler: (arg, options) ->
      @_compiler = if isString arg
        @getCompiler arg, options
      else if isFunction arg.compile
        arg
      else if isFunction arg
        compile: arg
      else
        log.error InavlidCompiler: arg
        throw new Error "CaffeineMc: @compiler must be a function or be an object with a .compile method."

  constructor: ->
    super
    @_metaParser = new CaffeineMcParser
    @_metaCompiler = @
    @_compiler = @class.CaffeineScript
    @compilers = {}

  normalizeCompilerResult: (result) ->
    if isString result
      compiled: js: result
    else if isString result?.code
      compiled: js: result.code
    else if isString result?.js
      compiled: result
    else if isString result?.compiled?.js
      result
    else
      log.error normalizeCompilerResult: {result, @compiler}
      throw new Error "CaffeineMc: expected @compiler result to be: (string), {js: string}, or {compiled: {js: string}}. Was: #{formattedInspect result}"

  ###
    IN:
      code: string
      options:
        sourceMap: t/f
        inlineMap: t/f
        sourceFile:
        sourceDir:

    OUT: (an object)
      compiled: extension => output map
        extension: string, ex: "js"
        output: string, ex: "alert();"

        If writing to files, we might do:
        for extension, output of compiled
          write originalFileNameWith(extension), output
  ###
  compile: (code, options)->
    checkWorkingCacheExpiration()
    options = merge CaffeineMc.globalCompilerOptions, options
    throw new Error "prettier does not support sourcemaps" if options.prettier && (options.inlineMap || options.sourceMap)

    if CaffeineMc.cacheEnabled && options.cache && options.sourceFile
      @_compileWithCaching code, options
    else
      @_postprocess options, @_compileWithMetacompiler code, options

  _postprocess: (options, out) ->
    @_postprocesPrettier options, out

  _postprocesPrettier: (options, out) ->
    if options.prettier
      try
        if out.compiled.js?
          out.compiled.js = require("prettier").format out.compiled.js, parser: "babel"
        out.prettier = true
      catch e
        log e.message
        throw e

    out

  _compileWithCaching: (code, options) ->
    options = objectWithout options, "cache"
    cacheInfo =
      compiler:   @compiler
      source:     code
      verbose:    options.verbose
      sourceFile: options.sourceFile

    {prettier, inlineMap} = options

    if prettier || inlineMap
      cacheInfo.compilerOptions = merge {prettier, inlineMap}

    if cachedCompile = CompileCache.fetch cacheInfo
      cachedCompile
    else
      CompileCache.cache merge cacheInfo, @_postprocess options, @_compileWithMetacompiler code, options

  _compileWithMetacompiler: (rawCode, options) ->
    {compilerName, metaCode, code} = @_metaParser.parse rawCode.toString()

    if metaCode || compilerName
      @_lastMetacompilerResult = if metaCode
        result = @normalizeCompilerResult @compiler.compile metaCode
        CaffeineMc.evalInContext result.compiled.js, @

      else
        @setCompiler compilerName, options

      @_compileWithMetacompiler code, options

    else
      @normalizeCompilerResult @compiler.compile code, options

  @getter
    compilerName: -> @compiler.getClassName?() || @compiler.getName?() || @_compilerName || 'unknown-compiler'

  getCompiler: (compilerName, options) ->
    if compilerName.toLocaleLowerCase() == "javascript"
      compilerName = "JavaScript"

    return @compiler unless present compilerName
    return compiler if compiler = Compilers[ucCompilerName = upperCamelCase compilerName]

    @_compilerName = compilerName;
    {absolutePath} = CaffeineMc.findModuleSync compilerName, options
    try
      out = @compilers[absolutePath] ||= realRequire absolutePath
      throw new Error unless isFunction out.compile
    catch
      throw new Error "CaffeineMc: compiler not found for: #{compilerName} (normalized: #{ucCompilerName}, require: #{absolutePath})"
    out
