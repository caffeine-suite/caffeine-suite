[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

related: [instanceof operator](./instanceof-Operator.md)


### is/isnt - for testing if an object is an exact type

In CaffeineScript, the `is` operator is a little different from CoffeeScript. You can think of it as: "A equals-or-is-typeof B". `isnt` is the same as `!(a is b)`.

* `a is b` is `true` iff one of these are true:
  - `a == b` (JavaScript ===)
  - `a.constructor == b`

This effectively obsoletes JavaScripts broken `typeof` operator.

```coffeescript
"hi" is String    # true. The constructor of "" is indeed String
(->) is Function  # true
[] is Object      # false - yay! The constructor of an array is not Object
[] is Array       # true - yay!
null is Object    # false - yay! No way the constructor of a null is Object
null is undefined # false
undefined is null # false

class Foo
foo = new Foo
foo is Foo        # true - yay!

a = null
a is null         # true (since values match, not because of constructor equality)

1 is 1      # true
1 is Number # true
{} is {}    # false - no deep equality

b = {}
b is b      # true - for any value of b

Type = Array
value = []
value is Type # true
```

Note: The equality-aspect of 'is' was maintained from CoffeeScript because `null is null` requires equality testing, instead of constructor-based testing. Once we've allowed that, it seems illogical to not also allow `1 is 1` to be true.

### UNSUPPORTED: `is Class`

I'd really like to support an is-class test, but JavaScript doesn't have an efficient way to test if something is a class. Further, `Class` isn't defined, unlike all the other types above.