Foundation = require "art-foundation"
Compilers = require './compilers'

{present, isFunction, log, isString, BaseObject, lowerCamelCase} = Foundation

evalInContext = (js, context) ->
  # Return the results of the in-line anonymous function we .call with the passed context
  (-> eval js).call context

module.exports = class CaffeineMc extends BaseObject
  @fileExtensions: ["caf", "caffeine"]
  @package: _package = require "caffeine-mc/package.json"
  @version: _package.version

  @metaCompilerEscapeFirstLineRegexp:
    ///
    ^\s*[|]        # escape signal

    ([-_a-zA-Z0-9]*)        # language: require(this-match).compile(sourceCode) -> string or object

    (?:[:](.*))?    # the rest of the line if a ":" is used

    [ ]*(?:$|\n)      # ignore to the end of the line

    ((?:\n|.)*)$           # rest of the code
    ///
  # @oneLineMetaCompiledSectionRegExp:   /^(?:\s*\n|)###<>([^\n]*)(?:\n((?:.|\n)*)|$)/
  # @multiLineMetaCompiledSectionRegExp: /^(?:\s*\n|)###<\s*\n((?:.|\n)*)\n###>(?:\n((?:.|\n)*)|$)/

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
    @_metaCompiler = @
    @_compiler = new Compilers.CoffeeScript
    @compilers = javaScript: compile: (source) -> source

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
    code = code.toString()

    normalizeCompilerResult if match = @matchMetaCompileBlock code
      {compilerName, metaCode, code} = match
      # log metaCompile: match

      @compiler = @getCompiler compilerName
      if present metaCode
        result = normalizeCompilerResult @compiler.compile metaCode
        evalInContext result.compiled.js, @
      @compile code, options
    else
      # log finalCompile: code: code, options: options
      @compiler.compile code, options


  matchMetaCompileBlock: (code) ->
    # log matchMetaCompileBlock:
    #   code: code
    #   regexp: CaffeineMc.metaCompilerEscapeFirstLineRegexp
    if match = code.match CaffeineMc.metaCompilerEscapeFirstLineRegexp
      [_, compilerName, metaCode, code] = match
      if indentBlock = matchIndentBlock code

        metaCode = "#{metaCode}\n#{indentBlock.indentedCode}"
        code = indentBlock.remainingCode

      compilerName: compilerName
      metaCode: metaCode
      code: code || ""

  blockStartRegExp = /^( +)/y
  matchIndentBlock = (code) ->
    if match = code.match blockStartRegExp
      [__, indent] = match
      length = indent.length
      [__, indentedCode, remainingCode] = match = code.match r = ///
        ^
        ((?:#{indent}[^\n]*(?:\s*(?:$|\n)))+)
        (.*)
        $
        ///

      indentedCode: indentedCode.replace ///(^|\n)#{indent}///g, "\n"
      remainingCode: remainingCode

  getCompiler: (compilerName) ->
    return @compiler unless present compilerName
    lcCompilerName = lowerCamelCase compilerName
    out = @compilers[lcCompilerName] ||= require log "require", compilerName
    throw new Error "CaffeineMc: compiler not found for: #{compilerName} (normalized: #{lcCompilerName})" unless isFunction out.compile
    out
