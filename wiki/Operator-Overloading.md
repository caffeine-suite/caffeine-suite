Related: [[Semantics]]

# WORK IN PROGRESS

### Motivation

* With operator overloading we can fix JavaScript's broken, weak-typing once and for all.
* With operator overloading we can make custom math and other libraries as elegant to use as built in types.

### Is Operator Overloading, in General, a Good Idea???

I know some people don't like operator overloading. The common objection is that you no longer know what "+", for example, is going to do. While true, I haven't found that to be a problem in Ruby or C++ for two reasons:

* Good libraries use operator overloading in a responsible, logical way, and it's awesome.
* If you consider operators just a short-hand syntax for function invocation, they are no different from any other function. True, you can never know what will happen in any given library, but the vast majority of library authors want to make their libraries useful, so they'll stay as close to the conventions and expectations as possible.

### Operator Overloading Pros

* Massive improvement in code reuse: Libraries can be reused across both built-in and custom types with ease, as long as the custom types use the same basic semantics as the built-in types. This can be a huge boon to math libraries. The reason is because both the built-in types and custom types use the same API.
* Cleaner code. Without operator overloading, custom math libraries are subject to second-class usability. 

Example: Take the Point class from my [ArtAtomic](https://github.com/imikimi/art-atomic) library:

```coffeescript
&ArtAtomic
a = point 1, 2
b = point 3, 4

# no operator overloading (current API)
a.add(b).mul 3   
# > point 12, 18

# operator overloading 
# (works without change to the ArtAtomic library with proposed overloading)
(a + b) * 3
```

And mathish-code-reuse across built-in and custom types is cumbersome to the point of being impractical without overloading. But with operator overloading, it's easy:

```coffeescript
addTimes3 = (a, b) -> a + b * 2

addTimes3 3, 5 
# > 24

addTimes3
  point 1, 2
  point 3, 4
# > point 12, 18
```

### Strategy

For these operators: `+ - * / < <= > >=`, using `+` as an example:

* Only `number + number` and `string + string` are allowed for built-in types, this can be checked with no runtime overhead.
* For `a + b`, if `a` is not a `number` or `string`, `a.add b` will be invoked.

### Operator Overload API

Arithmetic:

* +, .add()
* -, .sub()
* *, .mul()
* /, .div()

Comparison:

* &lt;, .lt()
* &lt;=, lte()
* &gt;, gt()
* &gt;=, gte()

### Performance

Initial tests suggest we can test for built-in types and dispatch the native operator or the operator-method at runtime with essentially no overhead. Further testing needed.

* https://jsperf.com/operator-overloading-sbd

