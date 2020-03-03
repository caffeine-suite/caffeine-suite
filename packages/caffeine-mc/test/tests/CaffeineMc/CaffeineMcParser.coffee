{CaffeineMcParser} = require 'caffeine-mc'
{log} = Neptune.Art.StandardLib

module.exports = suite:
  noMetaCode: ->
    test "'hi'", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "hi"
      assert.eq !!metaCode, false
      assert.eq !!compilerName, false
      assert.eq code, "hi"

    test "multi-line source", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "hi\nthere"
      assert.eq !!metaCode, false
      assert.eq !!compilerName, false
      assert.eq code, "hi\nthere"

    test "set compiler-name", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "|FooScript\nhi"
      assert.eq !!metaCode, false
      assert.eq compilerName, "FooScript"
      assert.eq code, "hi"

  illegal: ->
    test "|AwesomeScript some meta code on one line without column after compiler-name", ->
      parser = new CaffeineMcParser
      assert.throws -> parser.parse "|AwesomeScript some meta code on one line without column after compiler-name"

  degenerate: ->
    test "|", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "|"
      assert.eq !!metaCode, false
      assert.eq !!compilerName, false
      assert.eq code, ""

    test "|AwesomeScript", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "|AwesomeScript"
      assert.eq !!metaCode, false
      assert.eq compilerName, "AwesomeScript"
      assert.eq code, ""

    test "|AwesomeScript/SubAwesome", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "|AwesomeScript/SubAwesome"
      assert.eq !!metaCode, false
      assert.eq compilerName, "AwesomeScript/SubAwesome"
      assert.eq code, ""

    test "| meta code", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "| meta code"
      assert.eq metaCode, "meta code"
      assert.eq compilerName, undefined
      assert.eq code, ""

    test "|AwesomeScript: meta code", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "|AwesomeScript: meta code"
      assert.eq metaCode, "meta code"
      assert.eq compilerName, "AwesomeScript"
      assert.eq code, ""

    test "|AwesomeScript:\\n  meta code", ->
      parser = new CaffeineMcParser
      {metaCode, compilerName, code} = parser.parse "|AwesomeScript\n meta code"
      assert.eq metaCode, "meta code"
      assert.eq compilerName, "AwesomeScript"
      assert.eq code, ""

  metaCode:
    oneLiner: ->
      test "basic", ->
        parser = new CaffeineMcParser
        {metaCode, compilerName, code} = parser.parse "| some meta-code\nhi"
        assert.eq metaCode, "some meta-code"
        assert.eq !!compilerName, false
        assert.eq code, "hi"

      test "with compilerName", ->
        parser = new CaffeineMcParser
        {metaCode, compilerName, code} = parser.parse "|BooScript: some meta-code\nhi"
        assert.eq metaCode, "some meta-code"
        assert.eq compilerName, "BooScript"
        assert.eq code, "hi"

    block: ->
      test "basic", ->
        parser = new CaffeineMcParser
        {metaCode, compilerName, code} = parser.parse "|\n  my meta code\nmy normal code"
        assert.eq code, "my normal code"
        assert.eq metaCode, "my meta code"
        assert.eq compilerName, undefined

      test "with compilerName", ->
        parser = new CaffeineMcParser
        {metaCode, compilerName, code} = parser.parse "|AwesomeScript\n  my meta code\nmy normal code"
        assert.eq code, "my normal code"
        assert.eq metaCode, "my meta code"
        assert.eq compilerName, "AwesomeScript"

      test "with compilerName and optional colon", ->
        parser = new CaffeineMcParser
        {metaCode, compilerName, code} = parser.parse "|AwesomeScript:\n  my meta code\nmy normal code"
        assert.eq code, "my normal code"
        assert.eq metaCode, "my meta code"
        assert.eq compilerName, "AwesomeScript"

      test "multi lines", ->
        parser = new CaffeineMcParser
        {metaCode, compilerName, code} = parser.parse """
          |AwesomeScript
            # comment

            # blank line above
            some code
              indented
                and some more
          """
        assert.eq code, ""
        assert.eq metaCode,   """
          # comment

          # blank line above
          some code
            indented
              and some more
          """
        assert.eq compilerName, "AwesomeScript"

