# Caffeine.SourceMap

* Primary purpose: Generate source maps
* Secondary purposes:
  * Consume source-maps in a simple-to-understand way, primarily for validation. The *source-map* npm is probably a faster choice for consuming source-maps for real-world uses, but it's clunky.
* Future:
  * Source-map validation
  * Source-map visualization

### Install

```coffeescript
npm install caffeine-source-map
```

### Based on

- source-map npm: https://github.com/mozilla/source-map
- SourceMap Spec: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k

### Why rewrite `source-map npm `?

- Performance:
  - `source-map npm`'s generator isn't very performance-optimized. It creates at least 3 objects per sourcemap segment generated. CaffeineSourceMap generates no extra objects beyond those needed to create the SourceNode tree.
     - CaffeineScript generates a structure of nested arrays. Using source-map, I have to compactFlatten them first, which means creating more objects and iterating over the contents twice. If a SourceNode is JUST a string, no need to create an array.
  - Since CaffeineSourceMap works with sourceIndexes, if we don't actually generate a sourceMap, we never have to compute the lines and columns and yet we can still use CaffeineSourceMap to output the generated code.
- Simplicity:
  - As a single-file compiler, we can dramatically simplify the API.
  - `CaffeineSourceMap.SourceNode` allows `@children` to be:
     - string
     - sourceNode
     - null / undefined
     - or an arbitrarily, nested array-structure of the above.
  - CaffeineSourceMapWe works in sourceIndex-space most the time. Code-generation doesn't have to think about lines and columns. Only CaffeineSourceMap needs to actually worry about lines and columns.
- Consistency:
  - both column AND LINE are 0-based, same as the SourceMapV3 standard. I had so many off-by-one bugs with `source-map npm`!

