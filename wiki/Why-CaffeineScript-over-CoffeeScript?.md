Related: [[Language Comparison]], [[Productivity by Design]]

Below is the short list of why you should use CaffeineScript over CoffeeScript. For a more in-depth discussion: [[Coming from CoffeeScript]].

CoffeeScript has the right ideas: everything should return a value, minimize syntax while improving readability, fix JavaScript's bad semantics. It just didn't go far enough. There is a lot of inconsistency in CoffeeScript, where those ideals have only been partially achieved.

1. CaffeineScript is founded on the idea that it is possible to do Indent-Block parsing *consistently* and *universally* throughout the language. [[Complete Indent-Block Parsing]] enables:
    * unrestricted block [[Function Invocation]]
    * block [[array literals]]
    * block [[comments]]
    * block [[string literals]]
    * and [more](Blocks-Instead-of-Brackets)...
2. [[Streamlined Modules]] reduce module-related code *by over 90%*. It completely changes how modules are used, unleashing their true potential for code organization and refactorability.
4. Improved Readability - You be the judge, but I think CaffeineScript is considerably more readable than even CoffeeScript - which is way better than JavaScript. Approximately 10% less tokens than CoffeeScript overall. Consistent use of [[blocks instead of brackets]], more [[string literals]] and [[optional commas]]
5. Improved Refactorability - increased use of blocks, decreased syntax and refactor/edit-friendly constructs such as [[smart import]], [[smart require]] and [[smart this-binding]].
6. Improved Literals
    * [[Array Literals]] - Example: `a = 1 2 3`
    * [[Object Literals]] - Example: `this.is.an.acceptable.key: 123`
    * [[String Literals]] - Example: `:this.is.a.word-string`
7. Improved [[Comprehensions and Iteration]]
    * `object` returns an object instead of an array
        * Example: `array value from [1,2,3] with value * 2 # returns array: [2,4,6]`
        * Example: `object value from a:1 b:2 c:3 with value * 2 # returns object: a:2 b:4 c:6`
    * `find` returns the first match instead of all matches
        * Example: `find user from users when user.id < 10`
    * `each` returns the from-object/array like Ruby language's .each
    * The `from` value can be an array OR an object, will be detected dynamically and iterated over correctly.
No more subtle `in/of` differences.