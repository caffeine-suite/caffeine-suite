
### CaffeineScript's Smart-Binding Function Declarations: `->`

The concept is simple. If `->` is defined inside a `this`-bounded context, its `this` should also be bounded to the same object. Specifically:

* `->` is smart 
  * If `->` is inside a function, it binds to the same `@` as the enclosing function
  * If `->` is directly inside a class, it is unbound: `~>` i.e. it will bind to whatever object it is invoked on, which is exactly what you want for both instance and class/static methods.
  * If `->` is not inside a class or function, it is also unbound: `~>`
* `~>` is unbound (visual: the string is loose - i.e. not bound to anything)
* `=>` is bound (visual: two strings means it's firmly bound)

#### Too Confusing? Just Use `->`

The result is you can use `->` virtually everywhere. The only time to use `~>` or `=>` is when you are doing something tricky.

Keep in mind that if your function doesn't contain any `@` references, then it doesn't matter which function-definition 'arrow' you use. 

#### When do I use `=>`?

I use the firmly-bound form with class-methods when a) they need to refer to each other and b) they may be used outside the context of the class. Usually this pattern comes up when building certain kinds of libraries.

```coffeescript
class Foo
  @bar: => @baz()
  @baz: => 123

{bar} = Foo
bar() # == 123
```

#### When do I use `~>`?

Only when I'm really pushing the functional envelope. There are examples in the CaffeineScript source under the Rules directory.

### Motifaction

This fixes a pattern in CoffeeScript that routinely tripped me up. The perfectly reasonable code below doesn't work. It's just one of many scenarios where I'm expecting `->` functions to consistently be bound to the current instance. Instead, in CoffeeScript they are sometimes bound and sometimes not. 

```coffeescript
# In CoffeeScript, this doesn't work, but in CaffeineScript it does:
class Foo
  constructor: -> 
    @bar = 123

  whenReadyPromise: -> 
    new Promise (resolve, reject) -> ...

  getBarPromise: ->
    @whenReadyPromise()
    .then -> 
      @bar 
      # In CoffeeScript, @ doesn't refer to the same
      # object as @whenReadyPromise just two lines above.
      # Instead, it refers to global.bar.
      # In CaffeineScript they are the same.
```

