# Return and Break

As-of v0.69.0 we have basic `return` and `break` support. These work pretty-much everywhere you'd expect *except* in comprehensions. Currently there is no support for return or break in comprehensions. However, `return` works in if-statements, while-statements and function-bodies. `break` works in while statements and has functionality beyond normal JavaScript: it can take a value to return.

Examples:

```coffeescript
count = 0
stopAt = 50
while count < 100
  break if count == stopAt

(stopEarly) ->
  return true if stopEarly
  foo()
```

### Break

```coffeescript
count = 0
stopAt = 50
a = while count < 100
  break 123 if count == stopAt
# a == 123
```