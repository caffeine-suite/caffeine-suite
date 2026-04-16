[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Object literals can be implicit, explicit-to-end-of-line(EOL), explicit-blocks, or traditional JavaScript-style:

```coffeescript

# implicit comma after simple literals
a = foo: 1  bar: 2

# basic implicit form
a = foo: 1, bar: 2

# basic implicit block form
a =
  foo: 1
  bar: 2

# basic explicit block form
a = {}
  foo: 1
  bar: 2

# basic explicit to-eol form
a = {} foo: 1, bar: 2

# JavaScript form
a = {foo: 1, bar: 2}
```

### Arrays of Objects

Sometimes you want an array of objects, not just one object.

```coffeescript
a =
  {} foo: 1
  {} bar: 2
  {} baz: 3

a = [{foo: 1}, {bar: 2}, {baz: 3}]
```

Implicit object-literals with two or more object-literal-properties on one line are 'one-liners':
```coffeescript
# implicit comma after simple literal
a =
  foo: 1  fod: 4
  bar: 2  bad: 4
  baz: 3  bud: 4

a =
  foo: 1, fod: 4
  bar: 2, bad: 4
  baz: 3, bud: 4

a = []
  foo: 1, fod: 4
  bar: 2, bad: 4
  baz: 3, bud: 4

a = []
  {} foo: 1, fod: 4
  {} bar: 2, bad: 4
  {} baz: 3, bud: 4

a = [
  {foo: 1, fod: 4}
  {bar: 2, bad: 4}
  {baz: 3, bud: 4}
]
```

Duplicate property names in object-literals start a new object in the list: (COMING SOON)
```coffeescript
a =
  foo: 1
  bar: 100
  foo: 2
  foo: 3

a =
  {} foo: 1, bar: 100
  {} foo: 2
  {} foo: 3
```
