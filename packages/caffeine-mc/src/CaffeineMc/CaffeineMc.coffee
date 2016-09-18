Foundation = require "art-foundation"
Compilers = require './compilers'

{log, isString, BaseObject} = Foundation

evalInContext = (js, context) ->
  # Return the results of the in-line anonymous function we .call with the passed context
  (-> eval js).call context

module.exports = class CaffeineMc extends BaseObject
  @fileExtensions: ["caf", "caffeine"]
  @package: _package = require "caffeine-mc/package.json"
  @version: _package.version

  @oneLineMetaCompiledSectionRegExp:   /^(?:\s*\n|)###<>([^\n]*)(?:\n((?:.|\n)*)|$)/
  @multiLineMetaCompiledSectionRegExp: /^(?:\s*\n|)###<\s*\n((?:.|\n)*)\n###>(?:\n((?:.|\n)*)|$)/

  @compile: (code, options = {})->
    new CaffeineMc().compile code, options

  @getter "compiler metaCompiler"
  @setter "metaCompiler",
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
        new Compilers[arg]
      else
        arg

  constructor: ->
    super
    @_metaCompiler = @
    @_compiler = new Compilers.CoffeeScript

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
    code = code.toString()

    if match = @matchMetaCompileBlock code
      {metaCode, code} = match
      evalInContext @compiler.compile(metaCode).compiled.js, @
      @metaCompiler.compile code, options
    else
      @compiler.compile code, options

  matchMetaCompileBlock: (code) ->
    if match = code.match(CaffeineMc.multiLineMetaCompiledSectionRegExp) ||
        code.match(CaffeineMc.oneLineMetaCompiledSectionRegExp)
      [_, metaCode, code] = match
      metaCode: metaCode
      code: code || ""

