[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

See also: [Destructuring](./Destructuring.md), [Structuring](./Structuring.md), [Extract-Destructuring](./Extract-Destructuring.md) and [Assignment-Destructuring](./Assignment-Destructuring.md)


### Example

```CoffeeScript
# setup
foo = a: 1, b: 2, c: 3, d: 4, e: 5, g: 6

# restructuring:
bar = {a, c, e} = foo

# bar == a: 1, c: 3, e: 5
```

### Purpose

Create a new object out of selected fields from another object. 

### Logic

Restructuring is integral to the **destructuring/restructuring** system. Any destructured assignment returns a newly structured object as shown below. (For those concerned about performance, the structured object is only created if it is used either by capturing it with assignment, as part of an expression, or as the return value of a block or function.)

A **restructuring** statement looks like this:
```CoffeeScript
a = {...} = b
```

It is logically the same as a [destructuring](./Destructuring.md) statement followed by a [structuring](./Structuring.md) statement:

```CoffeeScript
{...} = b
a = {...}
```

Another example:
```coffeescript
extractXAndY = (o) -> 
  {x, y} = o

# means this:
extractXAndY = (o) -> 
  {x, y} = o
  {x, y}
```

### Semantically Different from JavaScript and CoffeeScript 

Note, JavaScript and CoffeeScript both have **destructuring** and **structuring**, but they do not have **restructuring**.

```CoffeeScript
# the following:
a = {...} = b

# is interpreted by JavaScript or CoffeeScript as:
{...} = b
a = b
```

I chose to change the semantics for the following reasons:

#### Problems with JavaScript's Destructuring Return-Value

* Though JavaScript's interpretation is logically consistent along one dimension (assignments return the right-value), it breaks other, logically reasonable expectations: Decomposing `a = b = c`, into `b = c` and then `a = b` doesn't change the semantics. JavaScript's interpretation of the return value of destructuring-assignment, however, *is not consistent under decomposition*. 
* JavaScript's interpretation isn't *useful*. There is no leverage in `a = {...} = b` if it only means `a = b`. My experience is destructuring is therefore only used as a pure statement of the form: `let {...} = b;`
* JavaScript's interpretation does not support [functional programming](./Functional-Programming.md), since it is only useful as a pure statement.
* JavaScript's interpretation isn't as syntactically stable:

```javascript
# given this statement:
foo = {a, b, c}

# adding this below radically changes the interpretation of the line above
= bar
```

#### Benefits of CaffeineScript's Restructuring

* logically consistent under decomposition
* useful in expressions
* supports using destructuring in a pure-functional way
* more syntactically stable (i.e. small edits == small semantic changes)