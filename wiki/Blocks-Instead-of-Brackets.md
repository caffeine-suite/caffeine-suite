This is one of CaffeineScript's primary strategies for [[eliminating bracket-matching]].

Related: [[Complete Indent-Block Parsing]]

## Definitions: What is an Indent-Block? ('Block' for short)

An indent-block is a sequence of lines in code with the same number of spaces at the start of the line. (With one exception: sub-blocks, see below.)

Lines with no spaces at the start are sometimes referred to as "at the root" (... 'of the tree').

Example:

```
This line is not in an indent-block because it has no spaces.
  This line starts an indent-block.
  This one is in the middle of the block.
  This line is at the end of the indent-block.

This line is back at the "root."
  This line starts the second indent-block.
```

### Spaces, Tabs and Indents

The 'indent' of a line is the number of spaces at its start. A line with more 'indentation' has more spaces.

I'll always use the word 'spaces' to talk about blocks and their indents, but tabs are accepted too. However, CaffeineScript has a special limitation: all your indents must either be all-spaces OR all-tabs. You can't mix them. Why? Because both are invisible or 'white-spaces' - and it can lead to terrible confusion for a language which uses the *count* of tabs or spaces to determine indent-levels. Don't worry, the compiler will make it clear if you mix them. 

I *highly* recommend, however, that you always use spaces and never tabs. It's a personal preference. I like my code to look the same no matter what editor or console I view it in. Since tabs can be interpreted differently in different views, tab-based indents don't present consistently in all cases. It just makes it harder for me to read the code.

### Subblocks and "Nesting"

Blocks can have blocks inside them. They are sometimes referred to as "sub", "nested" or "child" blocks. A sub-block has at least one more space or tab at the beginning of the line than its "parent" or "enclosing" block. Sub-blocks are considered to be "in" or "a part of" their parent block.

Example:

```
This is at the root level.
  This is in the first block.
  This is too.
    This is in a sub-block.
    Still in the sub-block
  Back to the first block.

Back to the root.
  Starting the second block.
    Starting a sub-block in the second-block.
  Back to the second block.

Back to the root.
```

## CaffeineScript Features Using Blocks
* [[String Literals]]
* [[Object Literals]]
* [[Array Literals]]
* [[Comments]]
* [[Function Invocation]]
* [[Comprehensions and Iteration]]
* [[Control Structures]]

### New Block-Types in CaffeineScript
#### Block [[Function Invocation]]
```coffeescript
Div
  'Click this link to learn about an awesome language: '
  A href: 'http://CafScript.com', 'CafScript'
```

  
#### Block [[String Literals]]
```coffeescript
log ""
  The rest of this indented area is in the string.
  Even this: '"" """'
  Because it is indented, almost nothing needs to be escaped.
```

#### Block [[Array Literals]]
```coffeescript
log []
  1
  2
  3
```


#### Block Comments
```coffeescript
##
  All indented lines after a double ## are escaped!
  All characters are legal, including any sequence of: / * #
```

#### Syntax Highlighting Note

This is github's CoffeeScript syntax highlighting. It's close enough to help, I think, but please excuse when it is wrong for CaffeineScript. I look forward to github syntax highlighting support for CaffeineScript! If you, like me, want to see custom syntax highlighting supported on GitHub, contribute to this [GitHub conversation](https://github.com/github/linguist/issues/2598).

### Code-Collapsing Editors

A surprising advantage (to me) of going 100% with indented blocks is the code-collapsing feature of editors like SublimeText work perfectly for *everything*. Not only can you collapse code-blocks, but you can collapse string-blocks and comment blocks with equal ease.
