[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

This is one of CaffeineScript's primary strategies for [eliminating bracket-matching](./Eliminating-Bracket-Matching.md).


### Examples

```coffeescript
turn left || right
&& dont worry
# turn(left || right) && dont(worry)
```

```coffeescript
url || defaultUrl
.split :/
# (url || defaultUrl).split("/")
```

```coffeescript
ageInDays = (epochSeconds) ->
  Date.now() / 1000 - epochSeconds
  / 60 * 60 * 24

# JavaScript:
# let ageInDays = function(epochSeconds) {
#   return (Date.now() / 1000 - epochSeconds) / (60 * 60 * 24);
# };
```

### Benefits

The ability to start a line with a dot (.) or other binary operator reduces syntax and increases readability.

CaffeineScript's binary-operator-line-starts are:
  * Predictable
  * Editable - changing the order of lines has a straightforward result
  * Reduces the need for ()s
  * Works after *all* statements and expressions

### Two Simple Rules

#### 1. Start a line with a Binary or Dot Operator

Starting a line with a binary operator applies the operator to the result of the previous line. Think of it as if the previous line had ()s around the whole line.

```coffeescript
a + b
* c + d
# (a + b) * (c + d)
```

#### 2: Indenting AND Starting a line with a Binary or Dot Operator
When you start an indented line with a binary operator, it acts as if there was no newline. Example:

```coffeescript
a + b
  * c + d
# a + (b * (c + d))
```

#### Note

In both cases, if the line-start-operator is Binary, everything to the right of the line-start-operator is considered to be wrapped in parentheses.

### Dot-Line-Starts
```Coffeescript
# CaffeineScript
new MyClass
.foo()
```

```javascript
// JavaScript
new MyClass().foo();
```

### Indented Dot-Line-Starts
```coffeescript
# CaffeineScript
new MyClass
  .getSomeOtherClass()
```

```javascript
// Javascript
new MyClass.getSomeOtherClass();
```

### Mixed Indented and Non-Indented Dot-Line-Starts
```coffeescript
# CaffeineScript
new MyClass
  .a 1
  .b 2
.foo "hi"
.bar "bye"
```
```javascript
// Javascript
(new MyClass.a(1).b(2)).foo("hi").bar("bye");
```

### With Control Statements
It works after 'if' and all other kinds of control statements.

```coffeescript
# CaffeineScript
if foo
  foo 1
else
  1
.myMethod 123
```

```javascript
// Javascript
(foo ? foo(a) : 1).myMethod(123);
```

### With Assignment
```coffeescript
foo = bar
  .fud()
# foo = bar.fud();
```

And the other way around:
```coffeescript
foo = bar
.fud()
# (foo = bar).fud();
```

To capture the result of a more complex computation, leverage the fact that '=' can take a block for its right-hand-side value (i.e. its "r-value"):
```coffeescript
foo = 
  bar + baz
  .bud()
# foo = (bar + baz).bud();
```

### Other Binary Operators
The exact same logic applies to all binary operators.
```coffeescript
# CaffeineScript - 15 tokens
encodedBitmap
|| file && readAsBinaryString file
|| sourceUrl && RestClient.get sourceUrl
  || defaultUrl
```
```javascript
// Javascript - 24 tokens
encodedBitmap ||
  (file && readAsBinaryString(file)) ||
  (sourceUrl && RestClient.get(sourceUrl || defaultUrl));
```

### Binary Operator Line Ends

When a line ends with a binary operator, one of two things can follow:

* **an unindented expression** is interpreted as if there was no new-line
* **a value-block** returns a single value or, if more than one value is provided, an implicit array

NOTE: You cannot end a line with a dot (.).

```coffeescript
a || b ||
c
# a || (b || c) 

a || b ||
  c
# a || (b || c) 

a || b ||
  c
  d
# a || (b || [c, d]) 
```

### Beneficial for Refactoring

It's easier to refactor the *order* of a chain of lines *starting* with binary operators (CaffeineScript) rather than lines *ending* with binary operators (CoffeeScript). Usually the first line is fixed at the start of a chain of lines. It provides the anchor and context for the other lines. The lines after the first are more likely to need their order changed in some future refactor. Line-start-binary-operators let you re-order all but the first line easily. Line-end-binary-operators let you re-order all lines but the last-line - which I have found less helpful.
