See [[Destructuring]] for an overview.
See also: [[Assignment-Destructuring]], [[Structuring]] and [[Restructuring]]

## Extract

Introducing `extract`. Key features:

* Data-flow direction is always the same, left-to-right direction: `a extract b extract c`
* Conditional extraction: `a extract? b`
* Returns the last value extracted: `a extract b, c` returns `c`
* Reduced tokens
* Pathed extraction: `a extract b.c, d.e` == `c = a.b.c; e = a.d.e;`

Real-world example:
```coffeescript
# CaffeineScript - 6 tokens
compile() extract compiled extract js
# OR
compile() extract compiled.js

# CoffeeScript - 10 tokens
{compiled:{js}} = compile()
# Or, without pattern assignment, CoffeeScript is actually shorter - 8 tokens
js = compile().compiled.js
```

### Object Extraction
```coffeescript
# CaffeineScript - 7 tokens
Engine extract Elements extract Base, Bitmap
# Or, 6 tokens
Engine extract Elements extract
  Base
  Bitmap

# CoffeeScript - 10 tokens
{Elements:{Base, Bitmap}} = Engine
# Or, 12 tokens
{Elements} = Engine
{Base, Bitmap} = Elements
```


### Conditional Extraction
```coffeescript
# CaffeineScript - 3 tokens
Engine extract? Elements

# CoffeeScript - 7 tokens
{Elements} = Engine if Engine
```

### Nested Conditional Extraction
```coffeescript
# CaffeineScript - 7 tokens
Engine extract? Elements extract? Base, Bitmap

# CoffeeScript - 15 tokens
{Elements:{Base, Bitmap}} = Engine if Engine?.Elements
```

### Pathed Extraction

The old way isn't too bad if you are just pathing the input object:
```coffeescript
# CaffeineScript - 5 tokens
Engine.Elements extract Base

# CoffeeScript - 7 tokens
{Base} = Engine.Elements
```

But when you get just a little more complex, the extract Syntax remains elegant while CoffeeScript/JavaScript starts to get ugly.

```coffeescript
# CaffeineScript - 7 tokens
Engine extract Core, Elements.Base

# CoffeeScript - 10 tokens
{Core, Elements:{Base}} = Engine
```

#### Pathing and Refactoring

Consider two lines of CaffeineScript vs CoffeeScript. Each pair is logically the same before/after of a simple refactor. The CaffeineScript refactor effort is trivial, while the CoffeeScript effort is complex and error prone. The goal of the refactor is to extract Core from Engine in addition to the Elements.

```coffeescript
# CaffeineScript
Engine.Elements               extract Base, Bitmap # before
Engine extract Core, Elements extract Base, Bitmap # after

# CoffeeScript
                {Base, Bitmap}  = Engine.Elements # before
{Core, Elements:{Base, Bitmap}} = Engine          # after
```

### Default Extraction
```coffeescript
# CaffeineScript - 10 tokens
Engine extract? Elements extract?
  Base = default1
  Bitmap = default2

# CoffeeScript - 19 tokens
{Elements:{Base = default1, Bitmap = default2}} = Engine if Engine?.Elements
```

### Extract's Return-Value

Used in an expression, extract returns the last value extracted.

```coffeescript
# CafScript
if MyLib extract foo, bar, baz
  foo bar baz()
else throw new Error "Expected MyLib to have baz!"
```

```coffeescript
# CoffeeScript
{foo, bar, baz} = MyLib
if baz
  foo bar baz()
else throw new Error "Expected MyLib to have baz!"
```

Works like other binary operators
```coffeescript
# CaffeineScript - 4 tokens
... # long, complex expression
extract a, b

# CoffeeScript - 6 tokens
{a, b} = ... # long, complex expression
```

## Coming Soon: Planned Extensions to Extract

### Array Extraction (coming soon)
```coffeescript
# CaffeineScript - 8 tokens
myArray extract [] a, b, c

# CaffeineScript alt - 6 tokens
myArray extract []
  a
  b
  c

# CoffeeScript - 9 tokens
[a, b, c] = myArray
```

### Function Argument Extraction with Defaults (coming soon)
```coffeescript
# CaffeineScript - 7 tokens
(extract? a, b) ->

# CoffeeScript - 13 tokens
(options = {}) ->
  {a, b} = options
```

### Function Argument Extraction with Defaults AND Unextracted Argument Capture (coming soon)

A constant frustration of mine with CoffeeScript is I want to extract some values from an argument, but I also need access to that argument later. There is no good way to do this in CoffeeScript or JavaScript. By separating 'extract' from normal assignment, there is no longer a syntax ambiguity when we want to end up with defaults, extraction and named arguments:

```coffeescript
# CaffeineScript - 14 tokens
(options = {} extract a = 1, b = 2) ->
# OR 12 tokens
(options extract? a = 1, b = 2) ->

# CoffeeScript - 17 tokens
(options = {}) ->
  {a = 1, b = 2} = options
```