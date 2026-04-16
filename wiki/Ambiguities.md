[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

The nature of a minimal-syntax language like CaffeineScript is there will be more ambiguities. I've attempted to keep them to a minimum. When there were ambiguities, I had to choose which one was going to be the 'correct' interpretation. Often there was only one option that made sense.


# Unary Operators - Following Space has Meaning

Unary operators which are also legal binary operators, e.g. `-a`, must NOT have a space between them and the value they are applying to. If there is a space, they will be interpreted as a binary operator:

```coffeescript
foo = 
  a
  - b
# foo = a - b;

foo = 
  a
  -b
# foo = [a, -b];
```

# If-Blocks and Method Invocation

```coffeescript
if foo
    bar
  baz
# if (foo(bar)) {baz;}

foo
  bar
    baz
# foo(bar(baz));

foo
    bar
  baz
# foo(bar)(baz);
# ...But I don't recommend using CaffeineScript this way.
```