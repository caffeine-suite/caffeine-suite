Foundation = require 'art-foundation'
PatternElement = require './PatternElement'
{Node} = require './nodes'
{BaseObject, log, isPlainObject, isString, compactFlatten, inspect, pad, upperCamelCase, merge} = Foundation
{allPatternElementsRegExp} = PatternElement

module.exports = class RuleVariant extends BaseObject

  constructor: (@options) ->
    @_toString = null

    @options = pattern: @options unless isPlainObject @options
    {@pattern, @rule, @parserClass} = @options
    @_variantNodeClassName = @options.variantNodeClassName
    @_initVariantNodeClass @options
    @parse = @options.parse if @options.parse

  @property
    passThroughRuleName: null

  @setter "variantNodeClassName"
  @getter
    isPassThrough: -> @_passThroughRuleName
    name: -> @variantNodeClassName + "Variant"
    numVariants: -> @rule.numVariants
    patternElements: ->
      @_patternElements ||= @_generatePatternElements()

  _generatePatternElements: ->
    pes =
      if isString @pattern
        parts = @pattern.match allPatternElementsRegExp
        throw new Error "no pattern-parts found in: #{inspect @pattern}" unless parts
        for part in parts
          new PatternElement part, ruleVariant: @
      else
        [new PatternElement @pattern, ruleVariant: @]

    pes = compactFlatten pes
    @passThroughRuleName = pes[0].ruleName if pes.length == 1 && pes[0].isBasicRulePattern
    pes

  inspect: -> @toString()
  toString: -> @_toString ||= "#{@name}: #{@pattern || (@options.parse && 'function()')}"

  ###
  see: BabelBridge.Rule#parse
  ###
  parse: (parentNode) ->
    node = new @VariantNodeClass parentNode, ruleVariant: @

    {parser} = parentNode
    for patternElement in @patternElements
      unless parser.tryPatternElement patternElement, node, @
        return false

    node

  @getter
    variantNodeClassName: ->
      return @_variantNodeClassName if @_variantNodeClassName
      baseName = upperCamelCase(@rule.name) + "Rule" + if @pattern
        upperCamelCase "#{@pattern}".match(/[a-zA-Z0-9_]+/g)?.join('_') || ""
      else if @parse
        "CustomParser"
      @_variantNodeClassName = baseName

  ###
  OPTIONS:

    node / nodeClass
      TODO: pick one, I like 'node' today

    extends / baseClass / nodeBaseClass
      TODO: pick one, I like 'extends' today
  ###
  _initVariantNodeClass: (options) ->
    {rule} = options
    nodeSubclassOptions = options.node || options.nodeClass || options
    nodeBaseClass = options.extends || options.baseClass || options.nodeBaseClass || Node

    @VariantNodeClass = if nodeClass?.prototype instanceof Node
      nodeClass
    else
      nodeBaseClass.createSubclass merge
        name:        @variantNodeClassName
        ruleVarient: @ruleVarient
        nodeSubclassOptions
