{w, array, log, a, peek, shallowClone, compactFlatten} = require "art-standard-lib"
{Parser, Nodes:{Node}, Extensions} = require "../../"
{describe, assert} = require "art-testbench"

createMyBlockParser = ->
  class MyBlockParser extends Parser

    @rule
      root: 'line+'
      line: [
        '/!!!/'
        'end'
        'expression block? end'
      ]
      expression: '/[a-z0-9A-Z]+/'
      end: '/\n|$/'

      block: Extensions.IndentBlocks.getPropsToSubparseBlock()

createMyEolOrBlockParser = ->
  class MyEolOrBlockParser extends Parser

    @rule
      root: 'expression block? end'
      expression: '/[a-z0-9A-Z]+/'
      end: '/\n|$/'

      block: Extensions.IndentBlocks.getPropsToSubparseToEolAndBlock()

createObjectNotationParser = ->
  class IndentBlocksNode extends Node

    toJs: ->
      for match in @matches when match.toJs
        return match.toJs()
      log "no matches have toJs": self: @, class: @class, matches: @matches, parseTreePath: @parseTreePath
      throw new Error "no matches have toJs"

  class ObjectNotationParser extends Parser
    @nodeBaseClass: IndentBlocksNode


    @rules
      root: 'statement+'
      block: Extensions.IndentBlocks.getPropsToSubparseBlock()

      expression: w 'object array block literal'

      literal:
        pattern: w 'string number'
        toJs: -> @text

      end:              ['block end', '/\n+|$/']
      statement:        ['objectStatement end', 'expression end']
      string:           /"([^"]|\\.)*"/
      number:           /-?(\.[0-9]+|[0-9]+(\.[0-9]+)?)/

      array: a
        pattern: "'[]' block"
        toJs: ->
          "[#{(node.toJs() for node in @block.statements).join ', '}]"
        {
          pattern: "'[]' _? arrayElementWithDelimiter* expression"
          toJs: -> "[#{(node.toJs() for node in compactFlatten [@arrayElementWithDelimiters, @expression]).join ', '}]"
        }
        {
          pattern: "'[]'"
          toJs: -> @text
        }

      arrayElementWithDelimiter: "expression _? ',' _?"

      object: [
        "'{}' block"
        pattern: "'{}'? _? objectPropList"
        toJs: -> (@objectPropList || @block).toJs()
      ]

      objectStatement:
        pattern: "objectProp objectPropLine*"
        toJs: -> "{#{(m.toJs() for m in compactFlatten [@objectProp, @objectPropLines]).join ', '}}"

      objectPropLine:
        pattern: "end objectProp"
        toJs: -> @objectProp.toJs()

      objectPropList:
        pattern: "objectProp objectPropListItem*"
        toJs: -> "{#{(m.toJs() for m in compactFlatten [@objectProp, @objectPropListItems]).join ', '}}"

      objectPropListItem:
        pattern: '"," _? objectProp'
        toJs: -> @objectProp.toJs()

      objectProp:
        pattern: 'objectPropLabel _? colon _? expression'
        toJs: -> "#{@objectPropLabel}: #{@expression.toJs()}"

      commaOrEnd: ["',' _?", "end"]
      objectPropLabel:  /[_a-zA-Z][_a-zA-Z0-9.]*/
      colon:            /\:/
      _:                / +/


describe
  toEolSubparsing: ->
    MyParser = null
    beforeEach ->
      class MyParser extends Parser

        @rule
          root: 'line+'
          line: "linePart end"
          linePart: [
            "lineLabel lineEnd"
            "'(' linePart ')'"
          ]
          end: '/\n|$/'

          lineEnd:    Extensions.IndentBlocks.getPropsToSubparseToEol rule: "word", allowPartialMatch: true
          lineLabel:  /[0-9]+\: */
          word:       /[a-z]+/

    test "simple expression", ->
      MyParser.parse "1: hi"
      undefined

    test "partial toEol match works", ->
      MyParser.parse "(1: hi)"
      undefined

    test "extra nesting", ->
      MyParser.parse "((1: hi))"
      undefined

  ifThenElseWithPartialSubBlocks: ->
    IfThenElseParser = null
    beforeEach ->
      class IfThenElseParser extends Parser

        @rule
          root: [
            {pattern: 'ifThenElse', toTestStructure: -> @ifThenElse.toTestStructure()}
            pattern: 'words', toTestStructure: -> @words.toTestStructure()
          ]
          ifThenElse:
            pattern: '/if/ _ testBody:expression _ /then/ _ thenBody:expression _ /else/ _ elseBody:expression'
            toTestStructure: ->
              test: @testBody.toTestStructure()
              then: @thenBody.toTestStructure()
              else: @elseBody.toTestStructure()

          expression:
            pattern: Extensions.IndentBlocks.getPropsToSubparseToEol rule: "words", allowPartialMatch: true
            toTestStructure: -> @matches[0].toTestStructure()

          words:
            pattern: "word*"
            toTestStructure: ->
              for word in @words
                word.toString().trim()

          word:  "_? !/(if|then|else)\\b/ /[a-z]+/"
          _: /\ +/

    test "simple words", ->
      IfThenElseParser.parse "hi there"
      undefined

    test "simple if-then-else", ->
      IfThenElseParser.parse "if a then b else c"
      undefined

    test "more if-then-else", ->
      result = IfThenElseParser.parse "if a b then c d else e f"
      assert.eq result.toTestStructure(),
        test: ["a", "b"]
        then: ["c", "d"]
        else: ["e", "f"]

  absoluteOffset: ->
    MyBlockParser = null

    beforeEach ->
      class MyBlockParser extends Parser

        @rule
          root: 'line+'
          line: [
            'end'
            'expression block? end'
          ]
          expression: '/[a-z0-9A-Z]+/'
          end: '/\n|$/'

          block: Extensions.IndentBlocks.getPropsToSubparseBlock()

    validateAbsoluteOffsets = (node) ->
      {absoluteOffset} = node
      if node.ruleName == "expression"
        sourceValue = node.toString()
        assert.eq absoluteOffset, node.parser.rootSource.indexOf(sourceValue), {sourceValue}
      for child in node.children
        assert.lte(
          absoluteOffset
          validateAbsoluteOffsets child
          message: "parent node's absoluteOffset should be <= all of its children"
          node: node.toString()
          child: child.toString()
        )
      absoluteOffset

    test "simple", ->
      validateAbsoluteOffsets MyBlockParser.parse """
        alpha
        """
      undefined

    test "one block", ->
      validateAbsoluteOffsets MyBlockParser.parse """
        alpha
          beautlful
          colorful
        """
      undefined

    test "nested blocks", ->
      validateAbsoluteOffsets p = MyBlockParser.parse """
        alpha
          beautlful
          colorful
            and
            delightful
        """
      undefined

  blockParsing:
    basic: ->

      test "simple expression", ->
        createMyBlockParser().parse "one"
        undefined

      test "one block", ->
        createMyBlockParser().parse """
          one
            two
          """
        undefined

      test "nested blocks", ->
        createMyBlockParser().parse """
          one
            two
              three
          """
        undefined

    failure_location:
      baseline_without_block: ->
        test "before first line", ->
          parser = new (createMyBlockParser())
          assert.rejects -> parser.parse """
            -abc
            """
          .then (rejectsWith) ->
            # log {rejectsWith, parser}
            assert.eq parser._failureIndex, 0

        test "first line", ->
          parser = new (createMyBlockParser())
          assert.rejects -> parser.parse """
            abc-
            """
          .then (rejectsWith) ->
            # log {rejectsWith, parser}
            assert.eq parser._failureIndex, 3

        test "second line", ->
          parser = new (createMyBlockParser())
          assert.rejects -> parser.parse """
            abc
            foo-
            """
          .then (rejectsWith) ->
            # log {rejectsWith, parser}
            assert.eq parser._failureIndex, 7

      in_block: ->
        test "before line", ->
          parser = new (createMyBlockParser())
          assert.rejects -> parser.parse """
            abc
              -def
              foos
            """
          .then (rejectsWith) ->
            # log {rejectsWith, parser}
            assert.eq parser._failureIndex, 6

        test "first line", ->
          parser = new (createMyBlockParser())
          assert.rejects -> parser.parse """
            abc
              def-
              foos
            """
          .then (rejectsWith) ->
            # log {rejectsWith, parser}
            assert.eq parser._failureIndex, 9

        test "second line", ->
          parser = new (createMyBlockParser())
          assert.rejects -> parser.parse """
            abc
              def
              foos-
            """
          .then (rejectsWith) ->
            # log {rejectsWith, parser}
            assert.eq parser._failureIndex, 16

      in_nested_block: ->
        test "first line", ->
          parser = new (createMyBlockParser())
          assert.rejects -> parser.parse """
            abc
              def
                dood-
              foos
            """
          .then (rejectsWith) ->
            # log {rejectsWith, parser}
            assert.eq parser._failureIndex, 18

        test "second line", ->
          parser = new (createMyBlockParser())
          assert.rejects -> parser.parse """
            abc
              def2
                dood
                goof-
              foos
            """
          .then (rejectsWith) ->
            # log {rejectsWith, parser}
            assert.eq parser._failureIndex, 28

  eolOrBlockParsing:
    basics: ->

      test "simple expression", ->
        createMyEolOrBlockParser().parse "one"
        undefined

      test "simple block", ->
        createMyEolOrBlockParser().parse """
          one
            two
          """
        undefined

      test "simple eol", ->
        createMyEolOrBlockParser().parse """
          one two
          """
        undefined

      test "nested blocks", ->
        createMyEolOrBlockParser().parse """
          one
            two
              three
          """
        undefined

      test "nested eols", ->
        createMyEolOrBlockParser().parse """
          one two three
          """
        undefined

      test "nested eols and blocks", ->
        createMyEolOrBlockParser().parse """
          one two
            three
          """
        undefined

    failure_location: ->
      test "in EOL content", ->
        parser = new (createMyEolOrBlockParser())
        assert.rejects -> parser.parse """
          one -two
          """
        .then (rejectsWith) ->
          assert.eq parser._failureIndex, 4

      test "in block with EOL content", ->
        parser = new (createMyEolOrBlockParser())
        assert.rejects -> parser.parse """
          one two
            -abc
          """
        .then (rejectsWith) ->
          assert.eq parser._failureIndex, 10

      test "in block without EOL content", ->
        parser = new (createMyEolOrBlockParser())
        assert.rejects -> parser.parse """
          one
            -abc
          """
        .then (rejectsWith) ->
          assert.eq parser._failureIndex, 6

  CaffeineScriptObjectNotation:
    "parsing literals": ->
      test "string expression", ->
        createObjectNotationParser().parse '"hi"'
        undefined

      test "number expression", ->
        createObjectNotationParser().parse '.1'
        createObjectNotationParser().parse '0.1'
        createObjectNotationParser().parse '0'
        createObjectNotationParser().parse '-100'
        undefined

    "parsing objects": ->
      test "one line", ->
        createObjectNotationParser().parse 'hi:123'
        createObjectNotationParser().parse 'hi:123, bye:345'
        undefined

      test "object expression", ->
        createObjectNotationParser().parse 'hi:123'
        createObjectNotationParser().parse """
          hi:    123
          there: 456
          """

        createObjectNotationParser().parse """
          {}
            hi:    123
            there: 456
          """
        undefined

      test "nested object expression", ->
        createObjectNotationParser().parse """
          hi:    123
          there:
            one: 123
            two: 456
          """
        undefined

    "parsing arrays": ->
      test "array", ->
        createObjectNotationParser().parse '[]'
        createObjectNotationParser().parse '[] 1'
        createObjectNotationParser().parse """
          []
            1
          """
        undefined

    "toJs literals": ->
      test "string expression", ->
        assert.eq createObjectNotationParser().parse('"hi"').toJs(), '"hi"'

    "toJs objects": ->
      test "simple", ->
        assert.eq createObjectNotationParser().parse('hi: 123').toJs(), "{hi: 123}"

      test "object expression implicit one-liner", ->
        assert.eq createObjectNotationParser().parse('hi: 123, bye:456').toJs(), "{hi: 123, bye: 456}"

      test "object expression explicit one-liner", ->
        assert.eq createObjectNotationParser().parse('{} hi: 123, bye:456').toJs(), "{hi: 123, bye: 456}"

      test "object statement", ->
        p = createObjectNotationParser().parse(
          """
          foo: 123
          bar: "hi"
          baz: .1
          """
        )
        assert.eq p.toJs(), '{foo: 123, bar: "hi", baz: .1}'

      test "object statement with nested object expression", ->
        p = createObjectNotationParser().parse("""
          foo: bar: 123
          baz: 456
        """)
        assert.eq p.toJs(), '{foo: {bar: 123}, baz: 456}'

      test "nested object statements", ->
        parsed = createObjectNotationParser().parse(
          """
          foo: 123
          bar:
            baz: 2
            bud: 3
          """
        )
        assert.eq parsed.toJs(), '{foo: 123, bar: {baz: 2, bud: 3}}'

      test "nested object expression one line", ->
        assert.eq createObjectNotationParser().parse(
          """
          foo: 123
          bar: baz: 2, bud: 3
          """
        ).toJs(), '{foo: 123, bar: {baz: 2, bud: 3}}'

    "toJs array": ->
      test "array", ->
        assert.eq createObjectNotationParser().parse('[]').toJs(), "[]"
        assert.eq createObjectNotationParser().parse('[] 1').toJs(), "[1]"
        assert.eq createObjectNotationParser().parse('[] 1, 2').toJs(), "[1, 2]"
        assert.eq createObjectNotationParser().parse("""
          []
            123
            456
        """
        ).toJs(), "[123, 456]"

    "toJs complex": ->

      test "everything", ->
        assert.eq createObjectNotationParser().parse("""
          myNumber1: .10
          myNumber2: 1
          myNumber3: 1.1

          myArray1: []
            123
            456
          myArray2: [] "hello", "world"

          myObject1: foo: 1, bar: 2
          myObject2: {} foo: 1, bar: 2
        """
        ).toJs(), "{myNumber1: .10, myNumber2: 1, myNumber3: 1.1, myArray1: [123, 456], myArray2: [\"hello\", \"world\"], myObject1: {foo: 1, bar: 2}, myObject2: {foo: 1, bar: 2}}"
