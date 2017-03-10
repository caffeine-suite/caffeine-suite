Compilers = require './Compilers'

CaffeineMcParser = require './CaffeineMcParser'
CaffeineMc = require './namespace'

realRequire = eval 'require'

{dashCase, formattedInspect, present, isFunction, log, isString, lowerCamelCase, upperCamelCase, merge} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

evalInContext = (js, context) ->
  # Return the results of the in-line anonymous function we .call with the passed context
  (-> eval js).call context

module.exports = class Metacompiler extends BaseClass
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
    @_compiler = Compilers.JavaScript
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
  compile: (code, options = {}, caffeineInit)->
    if caffeineInit
      {@compiler, config} = caffeineInit
      options = merge config, options

    {compilerName, metaCode, code} = @_metaParser.parse code.toString()

    if compilerName
      @setCompiler compilerName, options

    @normalizeCompilerResult if metaCode
      result = @normalizeCompilerResult @compiler.compile metaCode
      evalInContext result.compiled.js, @
      @compile code, options
    else
      @compiler.compile code, options

  getCompiler: (compilerName, options) ->
    return @compiler unless present compilerName
    return compiler if compiler = Compilers[upperCamelCase compilerName]

    {path} = CaffeineMc.findModuleSync compilerName, options
    out = @compilers[path] ||= realRequire path
    throw new Error "CaffeineMc: compiler not found for: #{compilerName} (normalized: #{ucCompilerName})" unless isFunction out.compile
    out
