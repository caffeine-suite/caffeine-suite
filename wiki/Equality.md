Related: [[Semantics]]

### Never use JavaScript's '=='

The normal JavaScript equality operator is highly unpredictable and can have a significant performance hit. In JavaScript, `'123' == 123` is true, and costly to compute.

### CaffeineScript Fixes Equality

Thankfully, JavaScript also has a high performance, easy-to-understand `===` operator. So CaffeineScript simply translates any '==' to '===':

```coffeescript
# CaffeineScript:
a == b
# translates to JavaScript: a === b

a != b
# translates to JavaScript: a !== b
```

### JavaScript does NOT have `<==`, etc.

However, JavaScript does NOT have an equivalent set of inequality operators.

CaffeineScript has plans to fix this, though it is more challenging. See: [[Operator Overloading]] 