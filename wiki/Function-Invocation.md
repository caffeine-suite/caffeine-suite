[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Function Definition](./Function-Definition.md)


### Explicit Function Invocation

```coffeescript
Math.round(123.456)
Math.random()  # functions with no params must be invoked this way
```

### Implicit, One-Line Function Invocation
Any value, A, followed by a value, B, after it on the same line is treated as a function invocation: A(B).

```coffeescript
Math.round 123.456
```

Any value, A, can also be followed by a Value-List, to pass more than one parameter to the function invocation:

```coffeescript
# explicit value list
Math.round 123.456, 0.1
```

Lastly, commas are optional after [atomic literals](./Atomic-Literals.md) (strings, numbers, ...):

```coffeescript
# implicit value list
Math.round 123.456  0.1
```

### Implicit Block Function Invocation
Any value (a) followed by a block invokes (a) as a function. Each statement in the block is an argument to that function.

```coffeescript
Math.round 
  123.456
```


### Block Ambiguities Resolved

Full block-function-invocation have traditionally been hard to implement because of the ambiguities between invocation-blocks and control blocks. 

```coffeescript
# is this:
if foo
  bar

# (a) this? (javascript)
if (foo(bar)) {}

# or (b) this? (javascript)
if (foo) {bar}
```

To resolve this, CaffeineScript gives `if`, or any other similar control-block priority. The above example resolves to option (b). 

Here are some more complex examples:

```coffeescript
if foo
    bar
  baz
# == if (foo(bar)) {baz}

foo
  bar
    baz
# == foo(bar(baz))
```

Tail-ifs followed by a block are no longer tail-ifs:

```coffeescript
a if b
  c
# == a(b ? c : undefined)
```

And the ultimate example:

```coffeescript
# Below not recommended :)
if a
      b
        c
    d
  e
# == if (a(b(c))(d)) {e}
```
