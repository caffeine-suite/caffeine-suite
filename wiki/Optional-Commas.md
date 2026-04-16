[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

### Value Lists

Value-Lists are used in:

* [Array Literals](./Array-Literals.md)
* [Object Literals](./Object-Literals.md)
* [Function Invocation](./Function-Invocation.md)

### Optional Commas in One-Liner-Value-Lists

In all these cases, *commas are optional*:

* following [Atomic Literals](./Atomic-Literals.md) - example: `1 2`
* following explicit [Array Literals](./Array-Literals.md) - example: `[1] [2]`
* following explicit [Object Literals](./Object-Literals.md) - example: `{a:1} {b:2}`

```
a = 1 2 3
b = red: #f00  green: #0f0  blue: #00f
c = functionTaking4Strings :the :quick :brown :fox
```

### Optional Commas in Value-Lists Blocks

```coffeescript
foo
  a,  # optional comma function-invocation block
  b
# foo(a, b)

c = 
  a,  # optional comma in implicit array-literal
  b
# c = [a, b]
```