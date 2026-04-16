### Value Lists

Value-Lists are used in:

* [[Array Literals]]
* [[Object Literals]]
* [[Function Invocation]]

### Optional Commas in One-Liner-Value-Lists

In all these cases, *commas are optional*:

* following [[Atomic Literals]] - example: `1 2`
* following explicit [[Array Literals]] - example: `[1] [2]`
* following explicit [[Object Literals]] - example: `{a:1} {b:2}`

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