[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related:
* [Good Design and Programming Languages](./Good-Design-and-Programming-Languages.md)
* [Static Typing](./Static-Typing.md)
* [Graphic Design for Languages](./Graphic-Design-for-Languages.md)
* [Productivity by Design](./Productivity-by-Design.md)

TODO: Lots of redundancy in this section; clean it up!


### CaffeineScript's Design

I consider JavaScript to be a language written more for computers than for humans. It is effectively the "assembly language" of the web. It is excessively verbose and has many ways to shoot yourself in the foot. No-one should have to hand-code assembly language. Coding in any assembly language is error-prone and tedious. There is no reason to limit ourselves to only what our assembly language can express.

If you are visual, value reduced syntax and are looking for every productivity advantage, CaffeineScript may be for you.

> CaffeineScript's design goal is to minimize total effort, over a product's lifetime, for the entire team.

#### Primary Design Strategies

* fun & pleasurable to use
* design for reading (we read code 10 to 100 times more often than we write it)
* minimize tokens without sacrificing clarity

#### Principles

Within the broad design strategies above, here is how I prioritize various design options.

1. Utility - Is it crazy-useful? It might even trump consistency.
1. Consistency - Is really important to me, but I've come to appreciate how sometimes natural, human languages achieve increased efficiency (utility) by sacrificing consistency.
1. Minimalist - Though this language isn't particularly minimalist, I have strong minimalist sensibilities. At the end of the day, I think its more important that the code written in a language is minimal, not that the language itself is. Of course, this assumes the language is still clear and understandable. That is why consistency is a higher priority.

#### Philosophy

CaffeineScript is designed for freedom and flexibility. I'm philosophically opposed to language features whose sole purpose is to create restrictions (e.g. [static typing](#static-typing) or const). I'd rather empower the developer to create their own runtime validators and tests.

#### Common Themes

In practice, to meet my lofty goals, CaffeineScript's improvements fall into common themes:

- streamline NPM & CommonJs support
- maximize use of indentation blocks
- eliminate 99% of matching-token use: {}, (), [], "", /* */
- minimize tokens overall
- minimize Javscript's awkward parts

#### Syntax Errors Suggest Opportunities

While using CoffeeScript for many years I've often found places where I thought my code was logically consistent with the language, and yet the compiler reported a syntax error. This suggests to me an opportunity for a more expressive language. You can read about my CoffeeScript specific inspirations [here](./Coming%20from%20CoffeeScript.md#should-be-legal-in-coffeescript). I've also found, while writing CaffeineScript, that my own language's syntax errors sometimes suggest even more opportunities for increased expressiveness.

## Priorities

1. maximize programmer productivity
2. generate fast JavaScript
4. generate lean JavaScript
5. generate human-readable JavaScript

## Syntax Matters

I believe syntax matters. In my experience every line of code written gets edited at least 10 times, and is read at least 100 times, over the product's lifetime. Therefor, every token costs 10 to 100 times more programmer-time overall, compared to the initial cost of adding it.

#### Code is a Liability

The product of code is an asset. It creates value in the world. However, the code itself is a liability. It requires maintenance, reading, understanding, and editing. All of these things *cost* programmer time. A good way to reduce the cost of code is to reduce its size, as long as you can do so without losing clarity. When in doubt, less code is better code.

#### Minimize Tokens

This seemingly over-simplistic goal is actually quite powerful:

- Refactorability is the *only* code quality metric. If your code will literally never change again, it is 'dead' and can be forever ignored. What matters is how easy it is to *change* your code, to fix bugs and meet new requirements.
- Reducing code size is the easiest and often most effective way to improve refactorability.
- Most good programming practices reduce code-size. The rest increase clarity.
- Simple rules are easier to follow, for both novice and expert.

My overriding programming goal is therefore intentionally simple:

> Write less code.

See: [Counting Tokens](./Counting-Tokens.md)

### "Stay Beginner" - Steve Jobs

We, the broad programming community, have become normalized to pain. We are used to dealing with syntax errors throughout the day as we code. It's so common we literally don't think about it anymore. And yet, every syntax error has the potential to trip us out of flow, break our focus and potentially derail the rest of our productivity for the day. Every freaking one. It happens to me all the time. It's time to stop accepting such terrible design, and instead fix our languages.