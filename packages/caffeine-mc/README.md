![logo](https://raw.githubusercontent.com/wiki/shanebdavis/caffeine-mc/CaffeineMcLogo.png)
# Caffeinated Language Evolution [![Build Status](https://travis-ci.org/shanebdavis/caffeine-mc.svg?branch=master)](https://travis-ci.org/shanebdavis/caffeine-mc)

With CaffeineMC, any language can change *arbitrarily* without breaking existing code. You can select, configure and extend any to-JavaScript compiler, with arbitrary code, on a per-project or per-file basis.

### [CaffeineMC Wiki](https://github.com/shanebdavis/caffeine-mc/wiki)

Go to the [Wiki](https://github.com/shanebdavis/caffeine-mc/wiki) for documentation and more. 

Related: [CaffeineScript Wiki](https://github.com/shanebdavis/caffeine-script/wiki)

### Install

```
npm install caffeine-mc
```

Next: [Get Started](https://github.com/shanebdavis/caffeine-mc/wiki/Get-Started)

### Compatibility

CaffeineMC can work with any to-JavaScript compiler. It works with plain JavaScript, [CoffeeScript](http://coffeescript.org/) and [CaffeineScript](https://github.com/shanebdavis/caffeine-script) out of the box. An example below shows how easy it is to adapt to other compilers or transpilers like [Babel](https://babeljs.io/).

### What is a Meta-Compiler?

It is a compiler for your compiler. CaffeineMC can 'compile' (create) a brand new compiler, on a file-by-file basis. Most the time, though, it is used to select and configure a compiler. For example, see the custom.caf below.

### Why CaffeineMC?

#### Reason 1: Accelerated Language Evolution
When you can change the compiler *programmatically* on a per-file basis, languages can evolve arbitrarily without worrying about breaking existing code. This frees languages to evolve rapidly without constraints.

#### Reason 2: CaffeineMC + CaffeineScript
CaffeineMC really starts to shine when you have a language which is designed to be extensible. [CaffeineScript](https://github.com/shanebdavis/caffeine-script) is a modular programming language designed to take maximum advantage of CaffeineMC's per-project and per-file configurability. (modular-CaffeineScript is coming soon)

#### Reason 3: Custom Source-code 'Views'
Source-code is a "view" into a program's actual semantics. Just like  word-processors or spread sheets let you configure your view on a per-file basis, you should be able to change your code's view, its 'language,' on a per-file basis without affecting other files.

#### Reason 4: Accelerated New Language Development
Focus on writing your new language instead of building all the boiler-plate tools needed to make it useful. CaffeineMC's [caf command-line tool](https://github.com/shanebdavis/caffeine-mc/wiki/caf-Command-Line-Tool), [interactive shell](https://github.com/shanebdavis/caffeine-mc/wiki/Interactive-Shell), [NodeJs-loader](https://github.com/shanebdavis/caffeine-mc/wiki/NodeJs-Loader) and [Webpack-loader](https://github.com/shanebdavis/caffeine-mc/wiki/Webpack-Loader) work for all Caffeine-MC enabled languages. Just create a Caffeine-MC compatible compiler and you get all the standard compiler machinery for free.
