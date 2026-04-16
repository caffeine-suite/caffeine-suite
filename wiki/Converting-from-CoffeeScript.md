Related: [[Coming from CoffeeScript]]

### Classes

CaffeineScript uses ES6 classes. CoffeeScript 1.x classes CANNOT EXTEND ES6 CLASSES. But, ES6 classes CAN extend CoffeeScript classes. So, as you convert your CoffeeScript, start with the leaf-node classes, classes which are not extended, and then work your way up the inheritance tree.

### Semantic Changes

Compiles, but means something different.
* `foo bar: 1, 2` is interpreted as `foo({bar: [1, 2]});` in CaffeineScript

Tail comprehensions are gone. 
```coffeescript
value + 1 array value in myArray

# note above line is interpreted as
value + [1, array value in myArray with value]

# Use instead:
array value in myArray with value + 1
```

### Syntactic Changes

Won't compile.

* `for ... in/of` is gone. Replace 'for' with 'each', or array, depending on what you want the return value to be. The iteration type, 'in' vs 'of', is detected at runtime.

> I have tentative plans for optionally specifying the iteration type for increased runtime performance, but I want to see a concrete example where performance is a problem.

Blocks are more strict. Once you start a block, any de-indentation ends the block:
```coffeescript
#CoffeeScript
# this pattern no longer works:
foo ->
  a
,
  b

# Block-method-invocation solves
# a lot of these problems nicely:
foo
  -> a
  b
```

### Gotchas

As I convert my code bases from CoffeeScript to CaffeineScript, I'm making notes on what tripped me up.

* When converting to word strings, make sure to remove end-quote.
* array/object/find/each keywords are syntactically very flexible in CaffeineScript, so often existing code will still compile by work very differently, if at all, if these were in the original CoffeeScript.
* All """, ''', ### and /// CoffeeScript brackets need to be fixed manually.
* 'when' clause and scoping. Right now the 'when' clause is in its own scope. Assigning a new variable in a 'when' clause will NOT be shared with the with-clause. This is a bug.
* Coffee:`for key, value of myObject ...` vs Caffeine:`array value, key in myObject ...` The order of comprehension-variables is swapped for object iteration. In caffeine-script we prefer consistency: the value always is first, the key always is second, regardless if it is an array or object iteration. 


### CoffeeScript's WontFixs

The main reason I started from scratch, rather than contribute or fork CoffeeScript, is that some of the biggest problems CaffeineScript fixes are categorized as 'wontfix' in CoffeeScript:

* Block invocation
  * https://github.com/jashkenas/coffeescript/issues/575#issuecomment-349631
  * https://github.com/jashkenas/coffeescript/issues/1549
  * https://github.com/jashkenas/coffeescript/issues/3114

* Array Block Syntax / Implicit Arrays
  * [implicit arrays](https://github.com/jashkenas/coffeescript/issues/645#issuecomment-382091)

* Going beyond 'just javascript'
  * [operator overloading](https://github.com/jashkenas/coffeescript/issues/727)


```
NOTES: 
(foo, bar = 132) ->
.length == 1 # CaffieneScript & ES6 & probably CoffeeScriptV2
# This is ES6's definition for length. Personally, I hate it, it should be 2, but CaffeineScript is currently Es6-compatible on this. I may be changing CaffeineScript to CoffeeScriptV1's semantics:
# CoffeeScriptV1, .length == 2
# Why does this matter? The biggest problem is adding or removing defaults should NOT effect the API (i.e. change externally introspect-able things like .length)

Object.keys class Foo
  @bar: ->
== bar: -> # only CaffeineScript and CoffeeScript V1
# ES6 and CoffeeScriptV2 get this wrong, but we get it right. Class members ARE enumerable.
```