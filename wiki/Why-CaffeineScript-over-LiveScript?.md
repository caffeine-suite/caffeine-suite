Related: [[Language Comparison]]

I must admit I had trouble groking the advantages of the LiveScript language from their documentation, so I base my observations on this article:
[Ten Reasons to Switch from CoffeeScript to LiveScript](http://livescript.net/blog/ten-reasons-to-switch-from-coffeescript.html). My main takeaway is LiveScript is an attempt at making a pure-functional JavaScript. I'm more interested in supporting a mix of OO (Object Oriented), FP (Functional Programming), Imperative and Declarative programming styles, so this is a somewhat apples-vs-oranges comparison.

1. Improved Readability
  * dash-case
    * Is dash-case easier to read than lowerCamelCase? It isn't for me, but it may be for others.
    * LiveScript Con: I'm a big fan of consistency, and the fact that the source-code names are different from the generated JavaScript is a problem. The fact that this LiveScript: `a.query-selector = 123` implies `Object.keys(a) == ["querySelector"]` and this LiveScript is true `a.foo-bar != a['foo-bar']` sucks - in my opinion. In my experience, this kind of inconsistency creates endless headaches.
    * LiveScript Pro: Dash-case (and snake_case) are easier to refactor, as I found in the Ruby language. The reason is because search-and-replace refactors have to be done carefully so as not to break the correct upper-case-lower-case sequence for lowerCamelCase. With dash and snake-case, it's all lower-case!
    * LiveScript Con: BUT, LiveScript must run on top of JavaScript, and since the JavaScript runtime names are going to be lowerCamelCase and the source code will be dash-case, search and replace is going to be even harder to do -- assuming there is any reference to the runtime names.
    * lowerCamelCase and UpperCamelCase are the JavaScript standard. For the best interoperability/compatibility with JavaScript, it's just best to stick with the case-standards.
  * Numbers with underscores - Ruby has that too, but I frankly don't find it any more readable than numbers without underscores.
  * Numbers with suffixes - This choice seems odd to me. The suffix of `64000km` is just ignored - which makes them effectively comments. In CaffeineScript `64000km` is treated as a string. This works awesome when working with CSS (HTML's Cascading Style Sheets): `10pt`.
2. Pipe Operator
  * This is perhaps the most interesting feature of LiveScript, but it's not compelling enough for a whole new language. In fact, it's something we could easily add to CaffeineScript if there is demand.
3. Standard Library
  * The Prelude library looks pretty good for programming in a pure-functional style.
4. Partially Applied Operators and Member Access
  * This... is actually super cool :).
5. Constants
  * I've thought a lot about declaring constants - for about 25 years - and I still don't find it a good idea. It's the same problem with the rest of [[static typing]] - it's overly restrictive for little real benefit.
6. Improved Scoping
  * I'm not thrilled with the syntax, but the ability to shadow variables is nice.
7. Improved operators associativity
  * This is comparable in effect to [[binary line starts]]. I think both are nice.
8. Flatten list comprehensions
  * Nice. No equivalent in CaffeineScript yet. However, I'm not convinced flattening is "as it should be." Sometimes it is nice, but in my experience that is not the typical case. For my style of coding, I'm not convinced it is worth a special language feature.
9. Curried Functions
  * I imagine this is nice, but I still, after 20 years, don't get when Curried functions are actually useful. The failure is entirely mine.
10. New idioms
  * Async callbacks (<-) ... It's a nice idea, but callbacks are out of fashion. *Promises* work way better.
