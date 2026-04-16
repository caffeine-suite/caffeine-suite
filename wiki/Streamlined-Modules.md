[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Three CaffeineScript features come together to dramatically improve working with *CommonJs* modules:

* [Smart Require](./Smart-Require.md)
* [Smart Import](./Smart-Import.md)
* [Auto Export](./Auto-Export.md)


### Example

```coffeescript
import &DomBuilder

Div
  "" Click this link to learn about an awesome language:

  A
    href:  :http://CafScript.com
    style: fontSize: 24px

    :CafScript
```

#### 88% Reduction In Module-Specific Code

Take the example above. It is trivial, yet it has almost 90% less module-specific code than JavaScript. In larger, more real-world examples, CaffeineScript eliminates even more module-specific code relative to JavaScript or CoffeeScript.

After removing all the non-module-specific code from the example above, CaffeineScript has just 2 tokens. JavaScript has 16!

```coffeescript
# CaffeineScript: 2 Tokens
import &DomBuilder
# ...
```

```javascript
// JavaScript: 16 Tokens
let {Div, A} = require( 'dom-builder' );
module.exports = // ...
```

See: [Measuring Tokens](./Measuring-Tokens.md)

## Motivation

> The easier something is, the more it'll get used.

Modularization is good. In fact, it is perhaps our strongest tool for managing complexity. I believe encouraging more modularization is a good idea. I make aggressive use of modules, but even I don't do it as much as I should. I often put too much in one module because of the extra friction it takes to create and maintain each new module.

Imagine the scenario where you have a 1000-line module with two classes in it(\*), and you want to split it into two files, one for each class. Typically you'll keep one class in the old file and create a new file for the other. Typically, the two files will have similar, but not identical imports, and the same exports pattern. Typically you might copy the imports and exports to the new file. Cut and paste the class definition into the new file, and then update its indentation and possibly some () and {}s. It's a non-trivial amount of work, and it's already wrong. You are importing too much in both cases. Determining which imports are actually needed in each file can be an excruciating process of trial-and-error searching. It's so bad that I often don't bother. However, leaving it unfixed has insidious consequences. Unnecessary "include"s can confuse other people reading the file. Their first assumption is *this include is here for a reason*. If they think it's important they may go on a wild goose-chase, in some cases wasting hours, only to figure out it isn't important at all.

Excessive imports have another problem. Project-wide-search and dependency analysis tools are much less helpful, when it seems like there are more dependencies on an import than there actually are.

The other major problem is duplicate imports violate [DRY](./DRY.md) (Don't Repeat Yourself). If you need to refactor the libraries, you may need to update all the imports using those libraries. Worse, if you didn't clean up your imports, you may break files that aren't actually dependent on the changed library.

CaffeineScript's [smart import](./Smart-Import.md), [smart require](./Smart-Require.md) and [auto export](./Auto-Export.md) eliminate 99% of these problems. There is still limited code duplication since each file still needs to list what libraries to import, but imports are much more resilient against breakage due to changes in those libraries. Further, refactoring (e.g. splitting) a class into its own module involves no more than one line of copied code, the imports, and a simple cut-copy-paste-deindent of the class.

(*) Usually there should only be one class per file. Classes are effectively modules, and putting them in separate files promotes code reuse.
