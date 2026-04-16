[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

### Why Count Tokens?

Tokens are the smallest meaningful element in code. Tokens are a more objective measure of code size since lines can have any number of tokens. Measuring tokens also ignores white-space and comments. Last, measuring tokens doesn't penalize using clear names. ‘Occupations’ is just as good a name under the token metrics as ‘occus’ or other hard to understand abbreviations.

> Don't abbreviate words. Saving keystrokes only saves writing the code. It doesn't save edits or reading. Abbreviations make reading harder. Since reading code dominates our time, abbreviations are a losing proposition. Only use shortened words if the shortened version is used at least as commonly in speech.

Measuring tokens is a simple, effective metric that lets us make decisions quickly and get on with solving problems and delivering value.

### Counting Tokens, instead of Lines, to judge Code-Size/Code-Effort

Goal in designing token-counting-rules:
* simple, easy rule to apply
* the token-count is roughly proportional to the effort it takes to read the code, let alone refactor it.

Additional Guidelines
* A token is an indivisible sequence of characters. A token cannot be split into two or more subsequences without making it meaningless or affecting compile-time semantics.
* A token is counted if it has **compile-time semantic meaning**. In other words, does the character-sequence effect the semantics of compiling in any way. For example, given a string `"foo"`, adding more words: `"foo bar"` doesn't semantically change compiling. The output is logically identical - just the string is longer. However, removing either quote (") hugely affects compiling, so both are counted as tokens.

# Special Cases

### Why :Foo is 1 Token and !Foo is 2

Some source-strings can be reasonably be parsed as one *or more* tokens. It is a somewhat-arbitrary compiler-design decision. However, when counting tokens, we'd like an objective answer for what constitutes a token.

My answer, when a sequence could be considered one or two tokens, is this:

> If the sequence could be interpreted as two tokens, does removing one token substantially change the interpretation of the other? If, so, they are one token.

* With `:Foo`, `Foo` is substantially different with and without the colon:
  * `Foo` is a variable reference
  * `:Foo` is a string
* With `!Foo`, `Foo` is the same with or without the exclamation-mark:
  * `Foo` is a variable reference in both cases

#### One-Tokens in CaffeineScript

* word-strings: `:foo`
* hash-strings: `#foo`
* object-literal property-names: `foo:`

#### Two-Tokens in CaffeineScript

* Property accessors: '.foo'

### Why `()` is 1 Token Instead of 2

I consider `[]`, `{}` and `()` keywords, and count them as such. They each could work just as well replaced with actual keywords:

* `b()` could be `invoke b`
* `[] 1` could be `array 1`
* `{} a: 1` could be `object a: 1`

NOTE: `array` and `object` are already used in CaffeineScript to mean something different.

NOTE: `(a)` is 3 tokens because, even replaced with keywords, it would still be 3 tokens: `open a close`

### Strings

I count `"hi"` as two tokens, one for each quote, because it is definitely harder to maintain than `:hi`, which I count as one. Caffeine-script to-eol(end-of-line)-strings and block-strings also count as one each:

```coffeescript
# 2 tokens:
"" to eol
""
  block
  of
  text
```

#### Escape Characters

Each escape-character counts as a token because the parser has to interpret it specially, and we, as humans, have to think extra:

```coffeescript
# 6 tokens, 4 in the string
curchLadySays = "Well isn't that \"special.\"" 
```

#### Interpolated Strings

Interpolated strings follow logically: `'hi #{name}'` is 5 tokens. To-eol-interpolatation inside a to-eol-string: `"" hi #{} name` is 3.

### TODO: Merge

I'm still refining what I consider a token. Strictly, it's what the tokenizer of a parser recognizes, but depending on how you write your tokenizer, you can alter the count.

The edge cases below could be parsed by a tokenizer in a couple of ways.

* 1 token: empty brackets ```{}, [], ""```
  * Conceptually these are single entities and, when reading code, are understood as a single, simple thing
* 1 tokens: labels ```foo: 123``` (this example is 2 tokens - the label and the number)
  * Removing ':' usually breaks parsing, if not, it results in radically different semantics.
  * `"foo"` and `foo` are both obviously 1-token, therefor `foo:` should also be counted as 1-token.
* 2 tokens: trailing questionmark: ```foo?```
  * Why? Removing the '?' results in another legal parse with different semantics

Below are some examples where there should be no controversy. There is only one way a tokenizer could parse them:

* This is 3 tokens: ```[1]```

#### Not All Tokens are Equal Mental Burden

To keep things simple, I generally count tokens using the guidelines above. However, I consider some tokens bigger mental burdens than others. They are harder to read and harder to refactor. Examples:

* Matching tokens, Example: `[1, 2]`. The brackets in this example carry more mental burden than the 3 tokens between them. You have to scan code to find the start and end of these brackets, which can become very difficult when they span more than a few tokens.
* Name repetition: `{a, b} = Foo if Foo`. The repetition of `Foo` in this example is more costly than just an extra token. If Foo changes, both need to be changed in exactly the same way. It also requires the reader to understand they are identical. CaffeineScript's alternative pattern assignment significantly reduces the mental burden: `Foo extract? a, b`

### TODO: Merge


#### Token-Cost Accounting

TODO: merge with [Counting Tokens](./Counting-Tokens.md)

I measure code size in tokens. It is an objective measure that is roughly proportional to the semantic complexity of the code - unlike line counts. It enables us to make objective choices, and have objective conversations about code quality. The qualification 'without sacrificing clarity' *is* subjective, though. How much reduction is too much is a question of language-brain-fit, and it'll be different for everyone. That's OK. Choose the language that fits your brain.

Here's how I assess the cost of code:

##### KISS (Keep It Simple, Stupid)

Most of the time, I just count all tokens the same, but what is a "token"?

> A token is an atomic, semantic unit of code.

Here are my guidelines:

  * any operator, identifier, keyword is a token
  * white space is not a token, even though it has semantic meaning
  * Exceptions. These are all counted as 1 token:
    * empty bracket-pairs are one token each: (), {}, []
    * property names, essentially an indentifier followed by a colon, are one token: "foo: 123" is 2 tokens

##### Less Simple, Design-Focused Token Accounting

There are some tokens which are harder to refactor than others. As such, when designing a language, I try harder to eliminate high-cost tokens:

* Non-empty matching brackets: [ 1, 2, 3 ] are technically 7 tokens, but I think the brackets cost *at least* double in terms of mental effort to read and edit. So that sequence is at least a 9 mental-token-cost. I think they cost more than double if they are on separate lines - something CaffeineScript fully eliminates.
* Repeated identifiers can trip you up when refactoring and can violate DRY (don't repeat yourself). Ex: {a, b} = c; d = {a, b} - create a new object out of the a and b fields of c. This one is a bit tricky since most identifiers are used at least twice (otherwise you wouldn't need them). I count both uses twice, IF the second use really is redundant, as in the example above. A good test as to whether some code contains redundancy is: can you describe that code in plain English without using the indentifier name twice?
* Temp variables are an especially costly form of repeated-identifiers. They cost the programmer mental effort to come up with their names. And, since low-mental-cost temp names are often opaque ("temp"), temp-variable names often take further extra effort to comprehend while reading.
