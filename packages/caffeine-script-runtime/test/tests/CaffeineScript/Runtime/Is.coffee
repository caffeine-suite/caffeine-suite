{each, defineModule, formattedInspect} = require 'art-standard-lib'
Caf = Neptune.CaffeinScript.Runtime

defineModule module, suite: ->
  class MyCustomClass

  tests = [
    [{}, Object]
    ["", String]
    [/-/, RegExp]
    [[], Array]
    [null, null]
    [undefined, undefined]
    [(new MyCustomClass), MyCustomClass]
  ]
  each tests, ([obj, klass]) ->
    each tests, ([testObj, testKlass]) ->
      if klass == testKlass
        test "#{formattedInspect obj} is #{testKlass && testKlass.name}", ->
          assert.ok Caf.is(obj, testKlass)
      else
        test "#{formattedInspect obj} isnt #{testKlass && testKlass.name}", ->
          assert.ok !Caf.is(obj, testKlass)
