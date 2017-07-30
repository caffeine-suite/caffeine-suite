{defineModule, log} = require "art-standard-lib"
Caf = Neptune.CaffeinScript.Runtime

defineModule module, suite: ->
  test "import basic", ->
    assert.eq Caf.import(["foo"], [foo:123]), foo: 123

  test "imports only requested", ->
    assert.eq Caf.import(["foo"], [foo:123, bar: 456]), foo: 123

  test "import two", ->
    assert.eq Caf.import(["foo", "bar"], [foo:123, bar: 456]), foo: 123, bar: 456

  test "import miss", ->
    assert.eq Caf.import(["foo", "bar"], [foo:123]), foo: 123

  test "import last has priority", ->
    assert.eq Caf.import(["foo"], [{foo:123}, {foo:456}]), foo: 456

  test "import - global has last has priority", ->
    assert.eq Caf.import(["Math"], [{Math:123}]), Math: 123
