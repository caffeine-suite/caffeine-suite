# Auto Variable Declaration (Auto-Lets)

Variables are automatically declared in the top-most scope where they are assigned.

Example:
```coffeescript
# CaffeineScript
# global.b == 2
a = -> b = 3
a()
Math.max 1, b # 2

# JavaScript:
let a = function() {
  let b;
  return (b = 3);
};
a();
Math.max(1, global.b);
```
versus:
```coffeescript
# CaffeineScript
b = 2
a = -> b = 3
a()
Math.max 1, b # 3

# JavaScript:
let b = 2;
let a = function() {
  return (b = 3);
};
a();
Math.max(1, global.b);
```

# The Scopes

Each of these constructs define a scope:

* [[Function Definition]]
* [[Class Definition]]
* [[Comprehensions and Iteration]] (`when` and `with/do` blocks define scopes, `from/in` and `into/returning` are evaluated before and outside the comprehension and thus do not)
* [[Control Structures]] (`while` and `until` loops bodies define scopes, `if` and `unless` do not)

# Compared with CoffeeScript

CaffeineScript's auto-lets are much the same as CoffeeScript's, with one big difference: the body of the `with/do` clause of a comprehension also defines a scope.

# Manual Lets and Const

Is there an interest in manual `let` and `const`? If so, let me know. They wouldn't be hard to add.