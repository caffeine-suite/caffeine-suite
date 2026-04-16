[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

The most significant improvements over CoffeeScript.

I count tokens in many examples below, to show how CaffeineScript improves over CoffeeScript and JavaScript ES6. Learn more about [Counting Tokens](./Counting-Tokens.md).


## Core Improvements

(I'm factoring this page out into multiple, focused pages.)

* [Blocks Instead of Brackets](./Blocks-Instead-of-Brackets.md)
* [Extract](./Extract.md)
* [Strings](./Strings.md)
* [Array and Object Literals](./Array-and-Object-Literals.md)
* [CommonJs](./CommonJs.md)
* [Include](./Include.md)
* [Binary Operator Line Starts](./Binary-Operator-Line-Starts.md)

### Block method invocation

Invoke a method by following it with an indented list of arguments on separate lines:

```coffeescript
# CaffeineScript
method
  arg1
  arg2
  arg3
  arg4

# CoffeeScript
method arg1,
  arg2
  arg3
  arg4

# Javascript
method(arg1, arg2, arg3, arg4);
```






# Other Improvements / Refinements

### Auto 'do'
Do you ever have bugs because you forgot a "do"? I do all the time. I think defaulting to 'do' will cause less bugs.

(This needs performance testing and semantic refinement.)

```coffeescript
# CoffeeScript
for a in b
  do (a) ->
    -> a

# CaffeineScript
# for-block is an implicit closure
# If a function is created in the for-block, wrap all variables
# in a closure so each iteration gets its own copy.
# Only capture variables first-assigned in the for-block and not used outside.
for a in b
  -> a
```

### Smart '@' binding

Basically, make '->' work more consistently with other languages. Most the time we shouldn't have to think about '@' binding for instance variables. Only in rare occasions should we have to override the default.

* In class definitions and not inside other explicit functions, -> works like CoffeeScript
* Inside an explicit function definitions, -> binds '@' to its enclosing scope. (like => in CoffeeScript)
* Overrides
  * ~> is always unbounded (-> in CoffeeScript)
  * => is always bounded (just like in CoffeeScript)

```coffeescript
# CoffeeScript
class Foo extends Art.Foundation.BaseObject
  @setter
    baz: (a) -> ...

  bar: (list) ->
    list.each (a) =>
      @baz = a

# CaffeineScript
class Foo extends Art.Foundation.BaseObject
  @setter
    baz: (a) -> ...

  bar: (list) ->
    list.each (a) ->
      @baz a
```

### map, each and for loops

CoffeeScript's 'for' loop is actually a 'map' operation. Sometimes you don't want that. Unwanted creation and population of an array is both a performance problem and a semantic problem.

```coffeescript
# CoffeeScript
# create and return new array
(list) ->
  for element in list
    element.foo

# return list; doesn't create a new array
(list) ->
  for element in list
    @add element
  list

# CaffeineScript
# create and return new array
(list) ->
  array element from list
    element.foo

# return list; doesn't create a new array
(list) ->
  each element in list
    @add element
```

### Extended unquoted labels:

```coffeescript
# CoffeeScript
foo: 1
'foo.bar': 2
'foo-bar': 3

# CaffeineScript
foo: 1
foo.bar: 2
foo-bar: 3
```
