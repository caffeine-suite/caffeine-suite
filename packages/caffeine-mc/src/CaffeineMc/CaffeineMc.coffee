Foundation = require "art-foundation"
Compilers = require './compilers'

CaffeineMcParser = require './CaffeineMcParser'

{present, isFunction, log, isString, BaseObject, lowerCamelCase, upperCamelCase, merge} = Foundation

evalInContext = (js, context) ->
  # Return the results of the in-line anonymous function we .call with the passed context
  (-> eval js).call context

module.exports = class CaffeineMc extends BaseObject
  @fileExtensions: ["caf", "caffeine"]
  @package: _package = require "caffeine-mc/package.json"
  @version: _package.version

  @compile: (code, options = {})->
    new CaffeineMc().compile code, options

  @getter "compiler"
  @setter
    ###
    IN:
      string: configure to use one of the CaffeineCompiler classes
      object:
        compiler: custom compiler instance. Must implement:
          compile: (sourceCode, options) ->
            IN:
              sourceCode: string
              options: {}
            ERROR: throw errors
            OUT:
              compiled: object
                # Consists of one or more output "files" specified as pairs:
                #   extension: outputString
    ###
    compiler: (arg) ->
      @_compiler = if isString arg
        @getCompiler arg
      else
        arg

  constructor: ->
    super
    @_metaParser = new CaffeineMcParser
    @_metaCompiler = @
    @_compiler = Compilers.CoffeeScript
    @compilers = merge Compilers.modules

  normalizeCompilerResult = (result) ->
    if isString result
      compiled: js: result
    else result

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
  compile: (code, options = {})->
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
