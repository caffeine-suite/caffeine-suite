[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Language Comparison](./Language-Comparison.md), [Productivity by Design](./Productivity-by-Design.md)

Below is the short list of why you should use CaffeineScript over CoffeeScript. For a more in-depth discussion: [Coming from CoffeeScript](./Coming-from-CoffeeScript.md).

CoffeeScript has the right ideas: everything should return a value, minimize syntax while improving readability, fix JavaScript's bad semantics. It just didn't go far enough. There is a lot of inconsistency in CoffeeScript, where those ideals have only been partially achieved.

1. CaffeineScript is founded on the idea that it is possible to do Indent-Block parsing *consistently* and *universally* throughout the language. [Complete Indent-Block Parsing](./Complete-Indent-Block-Parsing.md) enables:
    * unrestricted block [Function Invocation](./Function-Invocation.md)
    * block [array literals](./Array-Literals.md)
    * block [comments](./Comments.md)
    * block [string literals](./String-Literals.md)
    * and [more](Blocks-Instead-of-Brackets)...
2. [Streamlined Modules](./Streamlined-Modules.md) reduce module-related code *by over 90%*. It completely changes how modules are used, unleashing their true potential for code organization and refactorability.
4. Improved Readability - You be the judge, but I think CaffeineScript is considerably more readable than even CoffeeScript - which is way better than JavaScript. Approximately 10% less tokens than CoffeeScript overall. Consistent use of [blocks instead of brackets](./Blocks-Instead-of-Brackets.md), more [string literals](./String-Literals.md) and [optional commas](./Optional-Commas.md)
5. Improved Refactorability - increased use of blocks, decreased syntax and refactor/edit-friendly constructs such as [smart import](./Smart-Import.md), [smart require](./Smart-Require.md) and [smart this-binding](./Smart-This-Binding.md).
6. Improved Literals
    * [Array Literals](./Array-Literals.md) - Example: `a = 1 2 3`
    * [Object Literals](./Object-Literals.md) - Example: `this.is.an.acceptable.key: 123`
    * [String Literals](./String-Literals.md) - Example: `:this.is.a.word-string`
7. Improved [Comprehensions and Iteration](./Comprehensions-and-Iteration.md)
    * `object` returns an object instead of an array
        * Example: `array value from [1,2,3] with value * 2 # returns array: [2,4,6]`
        * Example: `object value from a:1 b:2 c:3 with value * 2 # returns object: a:2 b:4 c:6`
    * `find` returns the first match instead of all matches
        * Example: `find user from users when user.id < 10`
    * `each` returns the from-object/array like Ruby language's .each
    * The `from` value can be an array OR an object, will be detected dynamically and iterated over correctly.
No more subtle `in/of` differences.