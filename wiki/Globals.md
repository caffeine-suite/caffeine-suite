Related: [[Semantics]]

![GLOBALS ARE BAD, M'KAY?](https://cdn.meme.am/cache/instances/folder984/500x/76823984/mr-mackey-globals-are-bad-mkay.jpg)

### JavaScript's Accidental Globals

In JavaScript, if you assign a value to an undeclared variable, the resultant new variable is automatically placed/anchored in the global scope. This is a huge source for subtle bugs. A mistyped variable name often passes unit tests only to fail when pulled together with other modules into the final program.

These conflicts can be particularly tricky to track down. They can happen between two third-party libraries, breaking your own program even though there is no bug in your code. Further, these failures are often triggered along unrepeatable, asynchronous execution paths.

### CaffeineScript Handles Globals Differently than JavaScript

* Values read, but not assigned, are imported from the global namespace once, at module load-time.
  * Accessing a global that is not defined returns an `undefined` value. It doesn't raise an exception. Reason: consistency
* Use `global.foo` to directly read or write current, global values.
  * CaffeineScript's runtime defines 'global' for all JavaScript environments - NODE.Js and Browsers.
  * Browsers: `global == window == self`
  * NODE.js: `global` is already defined

### Note for Libs like [Mocha.Js](https://mochajs.org/) Which Define Globals

Mocha.js uses globals extensively. This is generally bad practice, so I recommend finding a library that doesn't use globals. However, I'm still using Mocha.js. Here is how I use it:

```coffeescript
# start of a test module
import &chai
test = (a...) -> global.test a...

suite "foo" ->
  test "bar" -> assert.equal 1, 2
```