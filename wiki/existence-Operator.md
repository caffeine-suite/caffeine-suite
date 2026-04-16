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