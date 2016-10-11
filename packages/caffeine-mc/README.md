# Caffeine MC - a meta-compiler

Select, configure and extend your to-JavaScript compiler, with arbitrary code, on a per file bases from within the file.

### WHY?

1. When you can change the compiler *programatically* on a per-file basis, languages can evolve arbitrailly without worrying about breaking existing code. This frees languages to evolve rapidly without constraints.
2. I consider source-code a "view" into programs actual semantics. Just like other programs such as word-processors or spread sheets, you should be able to change your view on a per-file basis without affecting other files.
3. You don't need to configure Node or Webpack or whatever packager/loader you are using for each new file-format you want to load. Configure it once with CaffeineMC and then every file can specify it's 'loader' itself.

### Install

```
npm install caffeine-mc
```

### Example use in Node

```
require('caffeine-mc/register')
require('caffeine-mc/examples/coffeescript')
require('caffeine-mc/examples/javascript')
```

### Examples

##### myFileName1.caf
```javascript
|javascript

// this is JavaScript
(function(){console.log("Hello from JavaScript!")})()
```

##### myFileName2.caf
```coffeescript
|coffee-script

# this is CoffeeScript
do -> console.log "Hello from CoffeeScript!"
```