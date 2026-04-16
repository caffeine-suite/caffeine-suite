[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

See [Destructuring](./Destructuring.md) for an overview.
See also: [Extract-Destructuring](./Extract-Destructuring.md), [Structuring](./Structuring.md) and [Restructuring](./Restructuring.md)


## Destructuring-Assignment (with Brackets) - JavaScript-Style and CoffeeScript-Style

CaffeineScript fully supports [JavaScript destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) syntax and semantics with one important difference. Ellipsis (...) comes *after*, not before. This is CoffeeScript-style as well as common English usage.

Examples

```coffeescript
[a, b] = [10, 20]
# a == 10, b == 20

[a, b, rest...] = 10, 20, 30, 40, 50
# a == 10, b == 20, c == 30, 40, 50

{a, b} = a: 10, b: 20
# a == 10, b == 20
```

NOTE: CoffeeScript destructuring features which are not supported by JavaScript, e.g. an ellipsis on a non-last array element: `[a..., b] = c`, are *not supported* in CaffeineScript either... yet.