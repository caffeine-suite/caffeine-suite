[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

```coffeescript
a?.b

# if (a != null) {a.b};

a? b
# if (typeof a == 'function') {a(b);}

a ?= b
# if (a == null) {a = b;}

c = a ? b
# c = a != null ? a : b;
```