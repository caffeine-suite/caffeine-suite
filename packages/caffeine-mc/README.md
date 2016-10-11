# Caffeine MC - a meta-compiler

Select, configure and extend your to-JavaScript compiler, with arbitrary code, on a per file bases from within the file.

### WHY?

1. When you can change the compiler *programatically* on a per-file basis, languages can evolve arbitrailly without worrying about breaking existing code. This frees languages to evolve rapidly without constraints.
2. I consider source-code a "view" into programs actual semantics. Just like other programs such as word-processors or spread sheets, you should be able to change your view on a per-file basis without affecting other files.
3. You don't need to configure Node or Webpack or whatever packager/loader you are using for each new file-format you want to load. Configure it once with Caffeine-MC and then every file can specify it's 'loader' itself.
4. Caffeine-MC reqlly starts to shine when you have a language which is designed to be extensible. For example...
  * [CaffeineScript](https://github.com/shanebdavis/caffeine-script)!

### Install

```
npm install caffeine-mc
```

### Examples in Node

```javascript
require('caffeine-mc/register')
require('caffeine-mc/examples/javascript')
require('caffeine-mc/examples/coffeescript')
require('caffeine-mc/examples/custom')
```

### CaffeineMc/Examples

#### javascript.caf
```javascript
|JavaScript

// this is JavaScript
(function(){console.log("Hello from JavaScript!")})()
```

#### coffeescript.caf
```coffeescript
|CoffeeScript

# this is CoffeeScript
do -> console.log "Hello from CoffeeScript!"
```

#### custom.caf
```coffeescript
|CoffeeScript:
  ###
  - Because of '|CoffeeScript:' above, this whole block is interpeted as CoffeeScript.
  - Everything to the end of this indented block runs at compile-time!
  - this/@ is set to the current CaffeineMc instance.
  - A new CaffeineMc instance is created for every .caf/.caffeine file compiled.
  ###

  # Require whatever you want!
  {upperCamelCase, w, log} = require 'art-foundation'

  ###
  Set @compile to an object with a compile function
  to define your own custom complier.
  ###
  @compiler = compile: (source) ->
    strings = for word in w source
      "'#{upperCamelCase word}'"

    log compiled: js:  "module.exports = [\n  #{strings.join ",\n  "}\n];"

This converts multi-word-words, no_matter_what_they_look_like to upperCamelCase
```