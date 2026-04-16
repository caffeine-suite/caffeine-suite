[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Why CaffeineScript over CoffeeScript?](./Why-CaffeineScript-over-CoffeeScript?.md), [Converting from CoffeeScript](./Converting-from-CoffeeScript.md)

I love CoffeeScript. I just want CoffeeScript to be more. I am a visual person, and two aspects of CoffeeScript bugged me from day one:

1) Inconsistent and incomplete block-method invocation:

Block-method function invocation only works if the first parameter (function argument) is an object literal. Change the
parameter order and it breaks:

```coffeescript

# OK in CoffeeScript (and CaffeineScript)
myFunction 
  prop1: 123
  param1
  param2

# swap the first two parameters, and...
# NOT OK in CoffeeScript (but OK in CaffeineScript!)
myFunction 
  param1
  prop1: 123
  param2
```

Disasters can happen when mixing function invocation with other block-types:
```coffeescript
# In CoffeeScript this:
for el in generateElements
    param: 123
  doSomethingWith el

# Should be the same as this:
doSomethingWith el for el in generateElements param: 123

# Instead, it's the same as this:
for el in generateElements
  param: 123
doSomethingWith el
```

2) Block objects, but no block arrays:

```coffeescript
# OK
a =
  foo: 1
  bar: 2

# NOT OK:
b = 
  "one"
  "two"

# Instead you have to fall back on the ugliness of bracket-matching.
# This breaks up the beautiful visual blocking otherwise present in CoffeeScript.
b = [
  "one"
  "two"
]
```

### Why a Complete Rewrite?

A little searching and I found both the above problems were marked "[wontfix](#coffeescripts-wontfixs)." Reading the discussions, it was clear any attempt to fix these problems is problematic in the existing codebase. The more I got into designing CaffeineScript, the more I realized I would have to break CoffeeScript significantly to create the kind of language I wanted.

### Building a Better CoffeeScript

CaffeineScript improvements over CoffeeScript:

* [Better Blocks](#better-blocks)
* [ES6 Support](#es6-support)
* [Should Be Legal and Consistent](#should-be-legal-and-consistent)
* Better Literals
  * implicit, implicit-block and explicit-block [array literals](./Array-Literals.md)
  * block and unquoted [strings](./strings.md)
* Using a Runtime
  * reduces code-generation, increases flexibility
* Eliminating more JavaScript rough-edges (WIP Work In Progress)
  * truth: everything but null, undefined and false is true (Ruby-style-truth)
  * string-interpolation (Ruby-style)
    * null/undefined >> ""
    * [1,2,3] >> '123'
  * comparison operators: 
    * null >= 0 should be false
* operator overloading??? (theoretical)
  * initial tests suggest we can do this without slower runtimes...
* Streamlined CommonJS (NPM Node Package Manager) module support
* automatic this-binding
* comprehension-block-scoping
* improved object and array [structuring](./Structuring.md) and [destructuring](./Destructuring.md)

### ES6 EcmaScript6 Support

The world is going to ES6, and for good reason. Many of ES6's new features came directly from CoffeeScript. When I started, CoffeeScript was being left behind. Since then, CoffeeScript has had some minor updates and the CoffeeScript v2 project was started. However, the goals appear to be to change the language as little as possible, while updating it to work with ES6. I think CoffeeScript needs a major overhaul, but if your only need is CoffeeScript + ES6, take a look at [CoffeeScriptV2](https://rawgit.com/jashkenas/coffeescript/2/docs/v2/index.html#top).

CaffeineScript generates exclusively ES6 code. CaffeineScript output will not run without ES6 support. BUT, for backward compatibility with ES5 EcmaScript5, you can run the output through Babel. It turns out Babel does a better job generating ES5 compliant code than CoffeeScript does.

ES6 Features in CaffeineScript vs CoffeeScriptV2

* ES6-style computed object literal keys: `[foo]: 123`
* ES6, lets and comprehensions: loop variables are automatically scoped to the body of the loop all but eliminating the need for 'do'.
* super
 * Bare `super` still invokes the parent method with all arguments, like CoffeeScript v1.
 * You can use 'super' anywhere inside a class definition, not just instance-methods. This can be useful for custom declarators.
* language-level syntax for streamlined ES6 'Promises' (coming soon)

### Better Blocks

I'm on a mission to eliminate the need to match tokens: [], {}, (), //, etc. I consider them a *major* problem in most languages:

* Visual Clutter: They distract from the critical process of reading and understanding code.
* Non-Trivial: They are non-trivial to fix when wrong, and they are wrong a lot. (So much of my life has been wasted fixing mis-matched brackets and parentheses!)
* Unfriendly to Refactoring: How fast you code is 99% proportional to how fast you can refactor code. Re-ordering code, or moving code in and out of sub-blocks are some of the most common refactoring tasks. Having to update matching-token-pairs can cause these trivial refactors to take 10 to 100 times longer than they otherwise should.
* In an indentation-based language, these refactors *are* trivial. You can just change the order of lines, or change their indentation level, and rarely introduce bugs.
* Not DRY(Don't Repeat Yourself)! - We already indent our code. Indenting *and* bracketing is redundant.

CoffeeScript goes a long way towards eliminating token-pair-matching, but it has glaring omissions like array literals, certain method invocations, comments and strings.

#### New Indentation-Block Types
```coffeescript
# block method invocation
MyComponent
  MySubComponent foo: 1
  MyOtherSubComponent bar: 2

# array blocks
[] 
  1
  2
  3

# string blocks
""
  Hi there!
  Nice eh?
  And no need to escape any quotes!
    " "" """
    ` `` ```
    ' '' '''

# comment blocks
##
  and this is just commented
  right out!
  And no need to worry about your #'s or ##'s or ###'s... 
  It is all good :).

# regex blocks - WIP! Still designing these
# /(foo|bar)[-a-z0-9\[\]\/\\]/
//
  ()      # paren blocks in regex blocks
    foo
    | bar
  []      # character-set blocks in regex
    a-z  
    0-9
    -     # dash doesn't have to be the first thing!
    []    # no need to escape these!
    /
    \\    # still needs an escape
```

### CoffeeScript's Rough Edges

I've built up a very long list of things that should be legal in CoffeeScript. I find many of them surprising. I believe CaffeineScript can fix most if not all of these.

#### Should-Be-Legal in CoffeeScript
Inconsistencies
```coffeescript
# block method invocation should be legal
# swap the order of the args and it works
myFunction
  arg1
  foo: bar

# literal object property values should accept any legal expression
a: b ||
  c: d

# regex regular expression, beginning with a space, should be legal in more places
legal: / *\n[ \t]*\n/
illegal: split / *\n[ \t]*\n/

# super should be useable in any object-literal
class Foo extends CustomBaseClass
  @customDefine
    foo: -> super

# starting a line with a binary operator should be legal
# just move the new-line after the && and it works:
#   a &&
#   b
a
&& b

# catch should support destructuring
try
  foo
catch {e}
  e
```

Control Structures and Expressions
```coffeescript
# empty class declarations should be legal expressions
myFunction class Suite

# 'if' should take any legal expression as its test
if myFunction a: b
  c

# should be able to use a comprehension, anywhere an expression is allowed
myFunction for v in myArray
  v

# for/in should accept any expression after 'in'
for demo in demos.sort (a, b) -> a - b
  demo

# for/of should accept any expression after 'of'
for v, k of a: 1
  v

# Should be able to access properties on the result 
# of an 'if' or other control structure
# just like any other statement.
if a then b else c
.then ->

for demo in demos
  demo
.sort()

# You can somewhat solve control-structure.then problem with parentheses ()s
# BUT, be careful:
# LEGAL:
(if foo 
  barPromise()
).then -> 

# ILLEGAL:
(
if foo 
  barPromise()
).then -> 

# ILLEGAL
switch a
  when 1 then 2
  else if b then c
```

Control Structures and WhiteSpace
```coffeescript
# oneliner try... works, so should try... catch...
try foo catch @bar

# 'switch' requires indents while 'if-else' does not
switch foo
when bar
else baz
```

Object literals with comprehensions or tail control structures are a problem in CoffeeScript. 
```coffeescript
# change the order of @a and @b and this works:
# FIX in CoffeeScript v2!
class ColorProps
  @a: d for e in f
  @b: g

# remove "b &&" and this works:
a: b && for v in b
  v

# remove "if path" to make this legal
a = 
  path: path if path
  label: label if label

```

#### Surprising CoffeeScript

These all compile, but not to what you'd expect. For fun, I've only shown the input without comment. Test your CoffeeScript expertise! Can you guess what these compile to without actually compiling them?

Example A
```CoffeeScript
foo = do
 a
 b
```

Example B
```CoffeeScript
typeof obj is not "function"
```

Example C
```CoffeeScript
foo_bar: a
foo-bar: b
```

Example D
```CoffeeScript
a
  href: uri
  span
    “content”
```

Example E
```CoffeeScript
switch a
  when b then if c then d else e
```

Example F
```CoffeeScript
# FIX in CoffeeScript v2!
a: b if c
d: 1
e: f if g
```

Example G - lines starting with '.'
```CoffeeScript
new Class
.foo

new Class bar: 1
.foo

a for a in b
.sort()

user ? getUser()
.username

myFunction bar: foo
.then ->

myFunction foo
.then ->
```

#### Confusing CoffeeScript Compiler Errors
This is actually illegal in JavaScript, but CoffeeScript gives different and confusing errors. The actual error is "return not allowed in an expression."
```
# ERROR: unexpected newline or unexpected end of input
foo: return null

# ERROR: cannot use a pure statement in an expression
foo: if test then return null
```
