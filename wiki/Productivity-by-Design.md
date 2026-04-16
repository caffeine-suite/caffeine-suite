[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [CaffeineScript Design](./CaffeineScript-Design.md)


# Civilization Progresses by Doing More with Less

All the progress we have made from subsistence living to our modern, rich lives comes down to one thing: do more with less. It is a ratcheting process where incremental, small improvements accumulate over time. The individual improvements may seem trivial, but with accumulation they exponentially increase our productivity. CaffeineScript is an accumulation of trivial improvements culminating in what I believe to be a dramatic productivity boost.

# Productivity and Programming

Programming is the most powerful tool ever invented. It is the only true meta-tool. It is a tool that allows you to create *any other tool*. With any [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) programming-language, you can create any possible program including *any other programming language*, Turing-complete or not.

The meta-nature of programming means any improvement in productivity creates a virtuous feedback loop. When you can write programs faster, you can write tools faster that in turn help you be even more productive. In other words, productivity improvements are exponential.

Programming productivity is the most powerful feedback-loop I know.

#### What about Requirements?

Productivity even supersedes requirements. If a language cannot meet your performance, compatibility or other requirements, then using it is a waste of time. Using it is therefore counterproductive.

### CaffeineScript is Designed for Productivity

Writing hundreds of CoffeeScript files, I've noticed many little things that grind down my daily productivity. So, I wrote CaffeineScript. Here are some of the ways CaffeineScript makes me more productive:

* [blocks instead of brackets](./Blocks-Instead-of-Brackets.md)
  * indent-blocks reduce the need for escape chars
    * you can comment a comment-block without escapes
    * you can quote a quote-block without escapes
  * indent-blocks are faster and less error-prone to refactor
  * indent-blocks collapse nicely in editors
* reduce syntax
  * reduce the need for named temp vars
  * streamlined literals
  * block method invocation
* prevent common JavaScript bugs
  * JavaScript ==
  * JavaScript truth (COMING SOON)
  * JavaScript toString
* prevent common CoffeeScript bugs
  * block [Scopes and Variables](./Scopes-and-Variables.md) for comprehensions and loops
  * [smart this-binding](./Smart-This-Binding.md)
* reduced friction
  * [Auto Variable Declaration](./Auto-Variable-Declaration.md)
  * [eliminating bracket-matching](./Eliminating-Bracket-Matching.md)
  * [smart import](./Smart-Import.md)
* consistency
  * simple logic for blocks
  * simple logic for [binary line starts](./Binary-Line-Starts.md)
* improved refactorability
  * [smart require](./Smart-Require.md)
  * [smart import](./Smart-Import.md)
  * [blocks instead of brackets](./Blocks-Instead-of-Brackets.md)
  * [binary line starts](./Binary-Line-Starts.md)
