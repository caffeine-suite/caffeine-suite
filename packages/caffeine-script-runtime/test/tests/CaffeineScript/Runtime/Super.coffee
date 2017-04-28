{defineModule, log} = require "art-standard-lib"
{BaseClass} = require 'art-class-system'
Caf = Neptune.CaffeinScript.Runtime

defineModule module, suite:
  "coffeeScript classes": ->
    class Foo extends BaseClass
      ;
    class Bar extends Foo
      ;

    class Baz extends Bar
      ;

    test "getSuper extended class object",     -> assert.eq Caf.getSuper(Bar), Foo
    test "getSuper 2x extended class object",  -> assert.eq Caf.getSuper(Baz), Bar
    test "getSuper extended class instance", -> assert.eq Caf.getSuper(new Bar), Foo.prototype

  "es6 classes": ->
    `class Foo extends BaseClass {};`
    `class Bar extends Foo {};`
    `class Baz extends Bar {};`
    test "getSuper extended class object",   -> assert.eq Caf.getSuper(Bar), Foo
    test "getSuper 2x extended class object",  -> assert.eq Caf.getSuper(Baz), Bar
    test "getSuper extended class instance", -> assert.eq Caf.getSuper(new Bar), Foo.prototype
