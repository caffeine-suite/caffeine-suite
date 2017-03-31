![logo](https://raw.githubusercontent.com/wiki/shanebdavis/caffeine-mc/CaffeineMcLogo.png)
# Caffeinated Language Evolution

With CaffeineMC, any language can change *arbitrarily* without breaking existing code. You can select, configure and extend any to-JavaScript compiler, with arbitrary code, on a per-project or per-file basis.

### [CaffeineMC Wiki](https://github.com/shanebdavis/caffeine-mc/wiki)

Go to the [Wiki](https://github.com/shanebdavis/caffeine-mc/wiki) for documentation and more.

### Compatibility

Caffeine-MC can work with any to-JavaScript compiler. It works with plain JavaScript, [CoffeeScript](http://coffeescript.org/) and [CaffeineScript](https://github.com/shanebdavis/caffeine-script) out of the box. An example below shows how easy it is to adapt to other compilers or transpilers like [Babel](https://babeljs.io/).

### What is a Meta-Compiler?

It is a compiler for your compiler. Caffeine-MC can 'compile' (create) a brand new compiler, on a file-by-file basis. Most the time, though, it is used to select and configure a compiler. For example, see the custom.caf below.

### Why Caffeine-MC?

#### Reason 1: Accelerated Language Evolution
When you can change the compiler *programmatically* on a per-file basis, languages can evolve arbitrarily without worrying about breaking existing code. This frees languages to evolve rapidly without constraints.

#### Reason 2: Custom Source-code 'Views'
Source-code is a "view" into a program's actual semantics. Just like  word-processors or spread sheets let you configure your view on a per-file basis, you should be able to change your code's view, its 'language,' on a per-file basis without affecting other files.

#### Reason 3: Write a New, Fully-Enabled Languages Fast
Focus on writing your language instead of building all the boiler-plate tools need to make it useful. Caffeine-MC's command-line tool, REPL, Node-loader and Webpack-loader works for all Caffeine-MC enabled languages. Just create a Caffeine-MC compatible compiler and you get all the standard compiler machinery for free.

#### Reason 4: CaffeineMC + CaffeineScript
Caffeine-MC really starts to shine when you have a language which is designed to be extensible. [CaffeineScript](https://github.com/shanebdavis/caffeine-script) is a modular programming language designed to take maximum advantage of Caffeine-MC's per-project and per-file configurability. (modular-CaffeineScript is coming soon)

### Install

```
npm install caffeine-mc
```


### Try

* [view source in wiki](https://github.com/shanebdavis/caffeine-mc/wiki/Examples)
* [view source in git](https://github.com/shanebdavis/caffeine-mc/tree/master/examples)

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
