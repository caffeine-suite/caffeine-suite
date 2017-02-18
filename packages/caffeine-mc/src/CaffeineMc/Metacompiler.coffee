Foundation = require "art-foundation"
Compilers = require './compilers'

CaffeineMcParser = require './CaffeineMcParser'

{present, isFunction, log, isString, BaseObject, lowerCamelCase, upperCamelCase, merge} = Foundation

evalInContext = (js, context) ->
  # Return the results of the in-line anonymous function we .call with the passed context
  (-> eval js).call context

module.exports = class Metacompiler extends BaseObject
  @fileExtensions: ["caf", "caffeine"]

  @compile: (code, options = {}, caffeineInitJsString)=>
    new @().compile code, options, caffeineInitJsString

  @getter "compiler"
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
    compiler: (arg) ->
      @_compiler = if isString arg
        @getCompiler arg
      else if isFunction arg
        compile: arg
      else if isFunction arg.compile
        arg
      else
        log.error InavlidCompiler: arg
        throw new Error "CaffeineMc: @compiler must be a function or be an object with a .compile method."

  constructor: ->
    super
    @_metaParser = new CaffeineMcParser
    @_metaCompiler = @
    @_compiler = Compilers.CoffeeScript
    @compilers = merge Compilers.modules

  normalizeCompilerResult = (result) ->
    if isString result
      compiled: js: result
    else if isString result?.compiled?.js
      result
    else
      log.error normalizeCompilerResult: {result, @compiler}
      throw new Error "CaffeineMc: expected @compiler result to either be a js-string or result.compiled.js to be a js-string."

  ###
  IN:
    code: string
    options:
      sourceMap: t/f
      inlineMap: t/f
      filename:

  OUT: (an object)
    compiled: extension => output map
      extension: string, ex: "js"
      output: string, ex: "alert();"

      If writing to files, we might do:
      for extension, output of compiled
        write originalFileNameWith(extension), output
  ###
  compile: (code, options = {}, caffeineInit)->
    if caffeineInit
      {@compiler, preCompileJsInitString} = caffeineInit
      evalInContext preCompileJsInitString, @ if preCompileJsInitString

    {compilerName, metaCode, code} = @_metaParser.parse code.toString()

    if compilerName
      @compiler = compilerName

    normalizeCompilerResult if metaCode
      result = normalizeCompilerResult @compiler.compile metaCode
      evalInContext result.compiled.js, @
      @compile code, options
    else
      @compiler.compile code, options

  getCompiler: (compilerName) ->
    return @compiler unless present compilerName
    ucCompilerName = upperCamelCase compilerName
    out = @compilers[ucCompilerName] ||= require compilerName
    throw new Error "CaffeineMc: compiler not found for: #{compilerName} (normalized: #{ucCompilerName})" unless isFunction out.compile
    out
