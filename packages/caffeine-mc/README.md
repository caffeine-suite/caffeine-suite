# Caffeine MC - a meta-compiler

Select, configure and extend your to-JavaScript compiler, with arbitrary code, on a per file bases from within the file.

### WHY?

1. When you can change the compiler *programatically* on a per-file basis, languages can evolve arbitrailly without worrying about breaking existing code. This frees languages to evolve rapidly without constraints.
2. I consider source-code a "view" into a program's actual semantics. Just like  word-processors or spread sheets let you configure your view on a per-file basis, you should be able to change your code's view, its 'language,' on a per-file basis without affecting other files.
3. You don't need to configure Node or Webpack or whatever packager/loader you are using for each new file-format you want to load. Just add the appropriate Caffeine-MC loader, and then every file can specify its 'loader' itself.
4. Caffeine-MC really starts to shine when you have a language which is designed to be extensible. For example...
  * [CaffeineScript](https://github.com/shanebdavis/caffeine-script)

### Install

```
npm install caffeine-mc
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
|CoffeeScript
  ###
  - Because of '|CoffeeScript' above, this whole block and the rest of the file
    is interpeted as CoffeeScript.
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


### Try in Node

Npm-install `caffeine-mc`, run `node` and paste:

```javascript
require('caffeine-mc/register')
require('caffeine-mc/examples/javascript')
require('caffeine-mc/examples/coffeescript')
require('caffeine-mc/examples/custom')
```

output:
```coffeescript
> require('caffeine-mc/register')
{}
> require('caffeine-mc/examples/javascript')
Hello from JavaScript!
{}
> require('caffeine-mc/examples/coffeescript')
Hello from CoffeeScript!
{}
> require('caffeine-mc/examples/custom')
compiled:
  js:
    """
    module.exports = [
      'This',
      'Converts',
      'MultiWordWords',
      'NoMatterWhatTheyLookLike',
      'To',
      'UpperCamelCase'
    ];
    """

[ 'This',
  'Converts',
  'MultiWordWords',
  'NoMatterWhatTheyLookLike',
  'To',
  'UpperCamelCase' ]
>
```
