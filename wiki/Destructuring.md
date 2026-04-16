[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

See also: [Structuring](./Structuring.md) and [Restructuring](./Restructuring.md)


## The Two Destructuring Forms Supported by CaffeineScript

1. [Extract-Destructuring](./Extract-Destructuring.md): `a extract b`. Extract is more capable and uses less syntax. Extract returns the last value extracted.
2. [Assignment-Destructuring](./Assignment-Destructuring.md): `{b} = a`. Assignment-Destructuring's return-value supports [Restructuring](./Restructuring.md).

Assignment-style will feel familiar to JavaScript and CoffeeScript veterans. With the exception of the return-value, assignment-style is identical to [JavaScript ES6 Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), and is a subset of [CoffeeScript Destructuring Assignment](https://coffeescript.org/#destructuring).

## Beyond JavaScript-Style Destructuring

CoffeeScript and Javascript, as of EcmaScript6 (ES6), have "destructuring assignment." At first it seems cool and elegant, but after using it for a few years, I've found it awkward and largely ineffective in all but the simplest cases:

#### Assignment-Destructuring uses Bracket-Matching

One of CaffeineScript's core goals is [Eliminating Bracket Matching](./Eliminating-Bracket-Matching.md).

#### Nested Assignment-Destructuring Extraction Is Ugly and Verbose
Nesting ends up taking more tokens than the simpler, old-school, non-pattern assignment.
```coffeescript
# Assignment-destructuring:
{a:{b}} = c    # 8 tokens

# old-school
b = a.c        # 5 tokens

# CaffeineScript's `extract`
a extract b extract c  # 5 tokens
```

#### Nested Assignment is Confusing 
Why? Data-flow actually changes directions. In assignment, data flows right-to-left:
```coffeescript
  {a} = c
#  ^----/           # right-to-left data-flow
```

But in with nested assignment-destructuring, data flows left-to-right:
```coffeescript
  {a:{b}} = c  
#  /--^             # left-to-right data-flow
#  \--------/       # right-to-left data-flow
```

With extract, data always flows left-to-right:
```coffeescript
a extract b
a extract b extract c
```

#### JavaScript/CoffeeScript's Destructuring-Assignment's Return-Value is Usually Ignored
CoffeeScript/JavaScript destructuring returns the object being destructured. I have never found that useful. Instead, I usually want the extracted value returned, usually for testing in an if-statement if it is present. In CaffeineScript, instead of one (almost) useless return value, you have two, equally useful options:
* `a extract b, c` returns `c`, the last value extracted
* `{b, c} = a` returns a new object: `{b, c}`, destructuring-Assignment's return-value, if used, provides [Restructuring](./Restructuring.md)
