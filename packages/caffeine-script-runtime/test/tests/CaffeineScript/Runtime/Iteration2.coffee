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

  arrayRange: ->
    # Caf.arrayRange:(fromValue, toValue, withClause = returnFirst, whenClause = returnTrue, byValue, til, into = [])
    test "array from 1 to 3",         -> assert.eq [1,  2,  3           ],    Caf.arrayRange 1, 3
    test "array to 3",                -> assert.eq [0,  1,  2,  3       ],    Caf.arrayRange 0, 3
    test "array to -3",               -> assert.eq [0, -1, -2, -3       ],    Caf.arrayRange 0, -3
    test "array from 5 to 10",        -> assert.eq [5,  6,  7,  8,  9,  10],  Caf.arrayRange 5, 10
    test "array from 10 to 5",        -> assert.eq [10, 9,  8,  7,  6,  5],   Caf.arrayRange 10, 5

    test "array from 10 to 5 by 2",   -> assert.eq [],          Caf.arrayRange 10, 5, null, null, 2
    test "array from 10 to 5 by -2",  -> assert.eq [10, 8, 6],  Caf.arrayRange 10, 5, null, null, -2
    test "array from 5 to 10 by 2",   -> assert.eq [5, 7, 9],   Caf.arrayRange 5, 10, null, null, 2
    test "array from 5 to 10 by -2",  -> assert.eq [],          Caf.arrayRange 5, 10, null, null, -2

    test "array v to 3 with v * 2",   ->
      assert.eq [0, 2, 4, 6], Caf.arrayRange 0, 3, (v) -> v * 2

    test "array v to 3 when v %% 3 == 0",   ->
      assert.eq [0, 3], Caf.arrayRange 0, 3, null, (v) -> v %% 3 == 0

    test "array to 3 into [4, 5, 6]",   ->
      assert.eq [4, 5, 6, 0, 1, 2, 3], Caf.arrayRange 0, 3, null, null, null, null, [4, 5, 6]

    test "array from 1 til 3",        -> assert.eq [1,  2               ],    Caf.arrayRange 1, 3,  null, null, null, true
    test "array til 3",               -> assert.eq [0,  1,  2           ],    Caf.arrayRange 0, 3,  null, null, null, true
    test "array til -3",              -> assert.eq [0, -1, -2           ],    Caf.arrayRange 0, -3, null, null, null, true
