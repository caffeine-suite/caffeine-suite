{defineModule, log} = require "art-standard-lib"
Caf = Neptune.CaffeinScript.Runtime

array123 = [1, 2, 3]
objectAbc = a: 1, b: 2, c: 3

defineModule module, suite:
  each2: ->
    test "array123/objectAbc: each2 ...", ->
      assert.same array123,  Caf.each2 array123
      assert.same objectAbc, Caf.each2 objectAbc

    test "array123/objectAbc: each2 v from ... do count += v", ->
      count = 0
      assert.same array123,   Caf.each2 array123,  (v) -> count += v
      assert.eq count, 6

      count = 0
      assert.same objectAbc,  Caf.each2 objectAbc, (v) -> count += v
      assert.eq count, 6

    test "array123/objectAbc: each2 ... into 123", ->
      assert.eq 123, Caf.each2 array123,  null, null, 123
      assert.eq 123, Caf.each2 objectAbc, null, null, 123

  array: ->
    test "array [] 1 2 3", ->
      bar = Caf.array array123
      assert.notSame  array123, bar
      assert.eq       array123, bar

    test "array a: 1, b: 2, c: 3", ->
      assert.eq [1, 2, 3], Caf.array objectAbc

    test "array v, k from a: 1 b: 2 c: 3 with k", ->
      bar = Caf.array objectAbc, (v, k) -> k
      assert.eq bar, ["a", "b", "c"]

    test "array v, k from [1, 2, 3] with k", ->
      bar = Caf.array array123, (v, k) -> k
      assert.eq bar, [0, 1, 2]

    test "array123/objectAbc: array a from ... with a * 2", ->
      expected = (a * 2 for a in array123)
      assert.eq expected, Caf.array array123,  (a) -> a * 2
      assert.eq expected, Caf.array objectAbc, (a) -> a * 2

    test "array123/objectAbc: array ... into [] 4 5 6", ->
      expected = [4, 5, 6, 1, 2, 3]
      assert.same into = [4, 5, 6], Caf.array array123, null, null, into
      assert.eq expected, Caf.array array123,  null, null, [4, 5, 6]
      assert.eq expected, Caf.array objectAbc, null, null, [4, 5, 6]

    test "array123/objectAbc: array a from ... when a % 2 > 0", ->
      expected = [1, 3]
      assert.eq expected, Caf.array array123,  null, (a) -> a % 2 > 0
      assert.eq expected, Caf.array objectAbc, null, (a) -> a % 2 > 0

    test "array123/objectAbc: array v, k from ... with v", ->
      expected = [1, 2, 3]
      assert.eq expected, Caf.array array123,  (v, k) -> v
      assert.eq expected, Caf.array objectAbc, (v, k) -> v

  object: ->
    test "object [] 1 2 3", ->
      assert.eq       1:1, 2:2, 3:3, Caf.object array123

    test "object a: 1, b: 2, c: 3", ->
      assert.notSame  objectAbc, Caf.object objectAbc
      assert.eq       objectAbc, Caf.object objectAbc

    test "object v, k from a: 1, b: 2, c: 3 with-key k + k", ->
      assert.eq aa:1, bb:2, cc:3, Caf.object objectAbc, null, null, null, (v, k) -> k + k

    test "object v, k from [1, 2, 3] with-key :a + k", ->
      assert.eq a0:1, a1:2, a2:3, Caf.object array123, null, null, null, (v, k) -> "a" + k

    test "object v, k from a: 1 b: 2 c: 3 with k", ->
      assert.eq a:"a", b:"b", c:"c",  Caf.object objectAbc, (v, k) -> k

    test "object v, k from [1, 2, 3] with k", ->
      assert.eq 1:0, 2:1, 3:2,        Caf.object array123, (v, k) -> k

    test "array123/objectAbc: object a from ... with a * 2", ->
      assert.eq 1:2, 2:4, 3:6, Caf.object array123, (a) -> a * 2
      assert.eq a:2, b:4, c:6, Caf.object objectAbc, (a) -> a * 2

    test "array123/objectAbc: object ... into d:4, e:5, f:6", ->
      assert.same into = d:4, e:5, f:6,       Caf.object array123,  null, null, into
      assert.eq d:4, e:5, f:6, 1:1, 2:2, 3:3, Caf.object array123,  null, null, d:4, e:5, f:6
      assert.eq d:4, e:5, f:6, a:1, b:2, c:3, Caf.object objectAbc, null, null, d:4, e:5, f:6

    test "array123/objectAbc: object a from ... when a % 2 > 0", ->
      assert.eq 1:1, 3:3, Caf.object array123,  null, (a) -> a % 2 > 0
      assert.eq a:1, c:3, Caf.object objectAbc, null, (a) -> a % 2 > 0

    test "array123/objectAbc: object v, k from ... with v", ->
      assert.eq 1:1, 2:2, 3:3, Caf.object array123, (v, k) -> v
      assert.eq a:1, b:2, c:3, Caf.object objectAbc, (v, k) -> v

  find: ->
    test "array123/objectAbc: find v in ... with v == 2 && k", ->
      assert.eq 1,    Caf.find array123,      (v, k) -> v == 2 && k
      assert.eq "b",  Caf.find objectAbc,     (v, k) -> v == 2 && k

    test "array123/objectAbc: find v in ... when v == 2", ->
      assert.eq 2,    Caf.find array123,  null, (v) -> v == 2
      assert.eq 2,    Caf.find objectAbc, null, (v) -> v == 2

    test "array123/objectAbc: find v, k in ... when v == 2 with k", ->
      assert.eq 1,    Caf.find array123,  ((v, k) -> k), (v) -> v == 2
      assert.eq "b",  Caf.find objectAbc, ((v, k) -> k), (v) -> v == 2

    test "find [] null 2 3", ->
      assert.eq 2, Caf.find [null,2,3]


  reduce: ->
    test "reduce a, v from [1, 2, 3] with a + v",                       -> assert.eq 6, Caf.reduce [1,2,3], (a, v) -> a + v
    test "reduce a, v from [1, 2, 3, 4, 5] with a + v when v % 2 == 0", -> assert.eq 6, Caf.reduce [1,2,3,4,5], ((a, v) -> a + v), (a, v) -> (v % 2) == 0

    test "reduce a, v from [] with a + v",                   -> assert.eq undefined, Caf.reduce [], (a, v) -> a + v
    test "reduce a, v from [] with a + v inject 0",          -> assert.eq 0, Caf.reduce [], ((a, v) -> a + v), null, 0
    test "reduce a, v from [1] with a + v",                  -> assert.eq 1, Caf.reduce [1], (a, v) -> a + v
    test "reduce a, v from [undefined, 1, 2, 3] with a + v", -> assert.eq 6, Caf.reduce [undefined, 1,2,3], (a, v) -> a + v
    test "reduce a, v from [1, undefined, 2, 3] with a + v", -> assert.eq 6, Caf.reduce [1,undefined,2,3], (a, v) -> a + v
    test "reduce a, v from [1, 2, 3, undefined] with a + v", -> assert.eq 6, Caf.reduce [1,2,3,undefined], (a, v) -> a + v
    test "reduce a, v, k", ->
      assert.eq 222,
        Caf.reduce(
          no1: .5
          yes1: 2
          yes2: 200
          yes3: 20
          no2: .25
          (a, v) -> a + v
          (a, v, k) -> /yes/.test k
        )
