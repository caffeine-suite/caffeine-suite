Related: [[Blocks-Instead-of-Brackets]], [[Significant-Whitespace-Design]]

CaffeineScript is founded on the idea that it is possible to do Indent-Block parsing consistently and universally throughout the language. Other indent-based languages (Python, CoffeeScript) do a pre-pass where they essentially insert "{" and "}" brackets around any detected block. The problem is the parser doesn't actually understand indents, and the pre-pass doesn't understand grammatical structure. I found this approach complex and error-prone, particularly for grammars such as string-blocks with interpolation.

* [Parsing Python](http://blog.nullspace.io/obvious-python-parser.html)
* [CoffeeScript's Lexer](https://github.com/jashkenas/coffeescript/blob/master/src/lexer.coffee) (search for 'INDENT' and 'OUTDENT')

It took me several months to figure out how to achieve "complete indent-block parsing" efficiently. My answer was to combine [parsing-expression-grammars (PEG)](https://en.wikipedia.org/wiki/Parsing_expression_grammar) with 'sub-parsing.' Basically, while parsing, when a block-start is expected and detected, a new parser is instantiated and run over the contents of the *deindented* block source-text. While subparsing is relatively straightforward, it only works with PEGs, which combine both the lexing and parsing into one step.

Subparsing Example:

```coffeescript
# input:
if foo
  bar()
  baz ""
    boom()
  bam()

# deindented, subparsed block #1, parsing rule: statements
bar()
baz ""
  boom()
bam()

# deindented, subparsed block #2, parsing rule: string
boom()
```

Output:

```javascript
if (foo) {
  bar();
  baz("boom()");
  bam();
}
```

Because a new subparser is started for each block, that block can be parsed arbitrarily. CaffeineScript uses this for string-blocks, comment-blocks and regexp-blocks.

The result is my [Caffeine8](https://github.com/caffeine-suite/caffeine-eight) parser library. This library stands on its own. You can use it to write your own parsers, optionally with complete-indent-block-parsing support.