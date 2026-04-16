Related: [[Semantics]]

### JavaScript to-String Conversion Problems with null and undefined

JavaScript converts `null` and `undefined` to `'null'` and `'undefined'` respectively, which is not very useful. In Ruby, `"Hello #{nil}"` becomes "Hello ". Not the best example, but it can be very useful sometimes to have nil become the empty string for concatenation purposes. I've never seen JavaScript's version be useful, except for exposing an internal bug all the way to the end user.

```javascript
"Hello " + null
# > "Hello null"
```

### JavaScript's problem with converting Arrays to Strings

Another less-than-optimal choice in JavaScript is how it converts arrays to strings:

```JavaScript
"" + [1,2,3]
# > "1,2,3"
```

Inspired by Ruby, again, CaffeineScript makes a much better choice of joining the array with '', i.e. without any added array-element-separator-characters in the final output string. This is particularly useful if you have an array of strings: 

```CoffeeScript
# CaffeineScript
"#{"Hello world.".split ''}"

# CaffeineScript> "Hello world."
# JavaScript> "H,e,l,l,o, ,w,o,r,l,d,."
```

### Syntax

```coffeescript
"Hello, #{username}"

"" Hello, #{username}

"" 
  Hello, #{username}
```

### To-String (Semantic Changes from JavaScript)

Given `"#{a}"`, the string produced depends on `a`:

* Array: `a.join ''` (NOT ',', JavaScript's default)
* Null/Undefined: '' (NOT 'null' or 'undefined', JavaScript's default)
* Otherwise, it is passed to JavaScript's standard interpolation routine which calls `a.toString()`