# Caffeine MC - a meta-compiler

Select, configure and extend your to-JavaScript compiler, with arbitrary code, with a per-project config file and on a per file from within the file itself.

Caffeine-MC can work with any to-JavaScript compiler. It works with plain JavaScript, [CaffeineScript](http://coffeescript.org/) and [CaffeineScript](https://github.com/shanebdavis/caffeine-script) out of the box. An example below shows how easy it is to adapt to other compilers or transpilers like [Babel](https://babeljs.io/).

### What is a Meta-Compiler?

It is a compiler for your compiler. Most the time Caffeine-MC is used to select and configure a compiler, but it can 'compile' (create) a brand new compiler, on a per-file basis. For example, see the custom.caf below.

### WHY?

##### Unconstrained Language Evolution
When you can change the compiler *programmatically* on a per-file basis, languages can evolve arbitrarily without worrying about breaking existing code. This frees languages to evolve rapidly without constraints.

##### Custom Source-code 'Views'
Source-code is a "view" into a program's actual semantics. Just like  word-processors or spread sheets let you configure your view on a per-file basis, you should be able to change your code's view, its 'language,' on a per-file basis without affecting other files.

##### Write a New, Fully-Enabled Language Fast
You don't need to configure Node or Webpack or whatever packager/loader you are using for each new file-format you want to load. Just add the appropriate Caffeine-MC loader, and then every file can specify its 'loader' itself.

##### CaffeineMC + CaffeineScript
Caffeine-MC really starts to shine when you have a language which is designed to be extensible. [CaffeineScript](https://github.com/shanebdavis/caffeine-script) is a modular programming language designed to take maximum advantage of Caffeine-MC's per-project and per-file configurability.

### Install

```
npm install caffeine-mc
```


### Try

In node:

```javascript
require('caffeine-mc/register')
require('caffeine-mc/examples/javascript')
require('caffeine-mc/examples/coffeescript')
require('caffeine-mc/examples/custom')
```

output:

```coffeescript
> require('caffeine-mc/register')
Neptune.CaffeineMc
> require('caffeine-mc/examples/javascript')
Hello from JavaScript!
{}
> require('caffeine-mc/examples/coffeescript')
Hello from CoffeeScript!
{}
> require('caffeine-mc/examples/custom')
[ 'This',
  'Converts',
  'MultiWordWords',
  'NoMatterWhatTheyLookLike',
  'To',
  'UpperCamelCase' ]
```

#### Try with Babel

Install:

```
npm install babel-core
npm install babel-preset-es2015
```

In node:

```javascript
require('caffeine-mc/register')
require('caffeine-mc/examples/babel')
```

output:
```javascript
> require('caffeine-mc/register')
Neptune.CaffeineMc
> require('caffeine-mc/examples/babel')
'Hello from ES6 => ES5 curtesy of Babel.'
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
    is interpreted as CoffeeScript.
  - Everything to the end of this indented block runs at compile-time!
  - this/@ is set to the current CaffeineMc instance.
  - A new CaffeineMc instance is created for every .caf/.caffeine file compiled.
  ###

  # Require whatever you want!
  {upperCamelCase, w, log} = require 'art-standard-lib'

  ###
  Set @compile to an object with a compile function
  to define your own custom complier.
  ###
  @compiler = compile: (source) ->
    strings = for word in w source
      "'#{upperCamelCase word}'"

    "module.exports = [\n  #{strings.join ",\n  "}\n];"

This converts multi-word-words, no_matter_what_they_look_like to upperCamelCase
```

#### babel.caf
```JavaScript
|
  var
    Babel   = require('babel-core'),
    es2015  = require('babel-preset-es2015');

  this.compiler = class BabelWrapper {
    static compile(source) {
      return Babel.transform(source, {
        presets: [es2015]
      });
    }
  };

module.exports = class Foo {
  static bar() {return "Hello from ES6 => ES5 curtesy of Babel."}
}.bar();
```
