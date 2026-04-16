

### If

If statements return the last statement of their if-true or else branch. The default else-branch is `undefined`. See [[Null vs Undefined]].

```coffeescript
a = if foo
  bar

# JavaScript
a = foo ? bar : undefined;
```

```coffeescript
a = if foo
  bar
else
  baz

# JavaScript
a = foo ? bar : baz;
```