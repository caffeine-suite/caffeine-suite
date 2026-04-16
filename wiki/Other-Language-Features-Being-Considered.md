[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

* smart function @ binding (select -> or => automatically)
* enhanced blocks
  * array blocks
  * function invocation blocks
  * "blocks instead of brackets"
* eliminate the need for token matching ([], {}, "", etc)
* `with`
* improved multi-line binary operator semantics (./+/- etc)
* improved pattern assignment
* Tail catch
  * ```result = doSomethingRisky() catch “it failed”```
* Enhanced class System
  * real class inheritance
    - CoffeeScript copies all class properties from the base class and definition time
      - updates to class properties after definition time are not propagated to child classes
      - @classGetters & @classSetters are not inherited at all
    - requires object instantition to look like Ruby: MyClass.new a, b, c
  * more consistent access to super and prototypes
    - @:: is a confusing concept in CoffeeScript. We can do better.
  * dynamic class creation
    - create classes with names created at runtime
  * default extends class
    - all classes without an explicit extend statement extend the same base class, which in turn extends Object
* streamlined switch statement
* new string literals
  * I’d like to add something like ```:foo == “foo”```, but I want to look at ES6 (EcmaScript6) 'symbols' first
  * I’d like to add some syntax like the Ruby language's: %w{a long word list becomes array of strings}
* efficiency & performance
  * use small runtime to reduce overall code-size and increase functionality
  * reduced overhead with @-binding
  * faster (a...) ->
  * 'real class inheritance' will be faster
* improved literate programming
* operator overloading if it can-be done efficiently
* object key interpolation: "hi#{foo}": 123, ('this' + a): 123
* smart '@' binding
* postCreate for classes
* map, each and for loops
* streamlined "require"
* make ranges more like ruby ranges
  - can be used anywhere
    - j...k
    - {begin: j, end: k, excludeEnd: true}
  - don't need brackets []
    - for i in j...k
* I do like the idea of fixing the "a + b" vs “a +b” ambiguity. Plus as a unary operator is kinda silly. Even minus as a unitary operator may be more pain than it’s worth. When you ever need it (rarely), “0 - foo” is only one more symbol.
* CoffeeScript compiler errors suggests language features
  - I run into this a lot in CoffeeScript. Something I think makes perfect logical sense is illegal because, in my opinion, the compile is incomplete.
  - In general, whenever there is a compiler error for something which is logically consistent with the rest of the language (and parsing rules), that suggests an opportunity for a more expressive language.


# related projects

* [Caffeine](https://www.npmjs.com/package/caffeine) ([git](https://github.com/ich/caffeine))
  - Another project forked from CoffeeScript. It hasn't been updated since 2013.
