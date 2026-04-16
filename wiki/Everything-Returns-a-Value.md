[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

### If

If statements return the last statement of their if-true or else branch. The default else-branch is `undefined`. See [Null vs Undefined](./Null-vs-Undefined.md).

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