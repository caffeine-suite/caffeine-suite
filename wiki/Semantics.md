![SpaceQuest 3 Death](https://raw.githubusercontent.com/wiki/caffeine-suite/caffeine-script/space_quest_3_death.png)

Does programming JavaScript feel like living a [SpaceQuest Adventure](https://www.youtube.com/watch?v=z2fmsXzXYA4)? CaffeineScript follows CoffeeScript's lead and takes it one step further: almost all of JavaScript's nasty little surprises, mostly due to type and value coercion, are prevented with CaffeineScript.

I'm not the only one to notice this ;). Here is a good list from Oreilly.com's JavaScript Book:
  * [Awful-Parts](http://archive.oreilly.com/pub/a/javascript/excerpts/javascript-good-parts/awful-parts.html)
  * [Bad-Parts](http://archive.oreilly.com/pub/a/javascript/excerpts/javascript-good-parts/bad-parts.html)

### Changes from JavaScript's Semantics

CaffeineScript's semantics are mostly the same as JavaScript's. However, one of CaffeineScript's main goals is to address JavaScript's many dangerous semantics. As of 2018 some have already been addressed, with more to follow. Below are the existing and planned semantic changes in CaffeineScript compared to JavaScript:

* [[Globals]]
* [[Equality]]
* [[String Interpolation]] (done!)
* [[Caffeine Truth]] (coming soon)
* [[Operator Overloading]] (coming soon - if it performs well at runtime)

### Dangerous Semantics Eliminated in CaffeineScript


- '==' means JavaScript's '===' (and '!=' is '!==')
- [[Caffeine Truth]] is Ruby-style: only false, null and undefined are falsy (COMING SOON)
- [[String Interpolation]] converts arrays, null and undefined to useful strings:
  - "#{[1,2,3]}" == "123"
  - "#{undefined}" == ""
  - "#{null}" == ""
- Throw errors from within expressions.
  - Certain keywords are statements only - they can't be used in an expression. Ex: foo ? throw new Error : 123. There is absolutely no need for these limitations.
- No crazy missing-semicolon problems due to semicolon-insertion
- Automatic block-scoping
  - No implied globals
  - Loops, comprehensions as well as functions define scopes.
  - Variables are automatically declared with "let" in the most-specific scope in which they are assigned.
- [[is Operator]] and [[instanceof Operator]], a sane replacement for `typeof`
- All switch-cases are all automatically terminated with 'break'.
- No function hoisting; all functions are defined in expression-form, not statement-form.
- "class Foo {constructor() {super()})" - inconsistent, 'super' is invalid if you aren't extending something. In this case, class Foo actually extends Function, which is odd in its own right. It CLEARLY should extend Object, right? Right?!? So, that's what CaffeineScript does - a class definition without an 'extends' clause defaults to extending Object. Consequently, this makes using 'super' work just fine, even if you aren't extending anything.

#### ES6-Specific Sharp Edges Solvable with CaffeineScript

- () => {} functions don't have 'arguments' but functions(){} do. I object to this introduction of inconsistencies, but I'm OK with deprecating arguments now that we have ... (ellipsis) notation. (COMING SOON: 'arguments' should be illegal)
- Class-declaration don't allow statements or value properties. CaffeineScript solves this by moving all the class definition, except the constructor, out of the JavaScript class-definition-block.
- JavaScript Class-declaration, like its function-declaration, has two identical yet semantically different forms: statement-form vs expression-form. In the former, you can't declare a class with the same name twice. In the latter, it's OK. CaffeineScript only generates expression-form class declarations.
- [a, b...] = c is OK, but [a..., b] = c is not. CoffeeScript solves this. CaffeineScript doesn't right now, since it's considerably more work to do the second case - since ES6 EcmaScript6 doesn't support it.
- `{a = 'default'} = {a: null}` - A should be 'default'. CoffeeScript does this right. ES6 gets this wrong.

### Dangerous Semantics Not (Yet) Addressed by CaffeineScript

#### Potentially Addressable

- undefined vs null
  - Undefined is an unfortunate concept. The semantic difference between 'undefined' and 'null' is negligible. Having two values for non-values is confusing and causes subtle bugs.
  - I'd like to reduce the usage of undefined, but unless we have [[Operator Overloading]], using 'null' everywhere may cause as many new bugs as we fix. For example: "null >= 0" is, incorrectly, true in JavaScript, but "undefined >= 0" is, correctly, false.  Until we can efficiently overload the meaning of >=, CaffeineScript will return undefined in all the places CoffeeScript does.
- Efficient [[Operator Overloading]] may be possible. If so, we can fix all the surprising, overloaded arithmetic operators and comparison operators:
  - "2" + 1 == 2 + "1" == "21"
  - "2" > 1 == true
  - null >= 0 == true
- Unbound functions should always have this == undefined. In JavaScript, this == global, which is an unmitigated disaster.
  - OR - perhaps even better, if you access a function-valued property but don’t immediately invoke it, it is bound to the object you selected it from. BAM! Not sure the runtime for this would be very nice, though... However, it would be powerful:
    - `foo.bar() == (baz = foo.bar, baz())` even if baz accesses @/this
    - `subClassedFooInstance.bar != foo.bar`. They would be the same function, but different this-defaults.
    - which means two big bits of overhead:
      - Whenever you read a property (without invoking it), a runtime check of its type needs to happen.
      - If it is a function, a new wrapper-function needs to be created
      - I suspect the overhead of the invoking the wrapper-function could be optimized away.
  - NOTE: This is DEFAULT-this binding. The .call and .apply methods would still be able to override the binding.

- `[10, 1].sort() == [10, 1]` - array sort converts elements to strings before sorting them! To sort numbers correctly, you need to do: `[10, 1].sort (a, b) -> a - b`

#### ES6-Specific

Probably not solvable with CaffeineScript:
- There is no good way to declare a Class with a runtime-generated-name. (there may be a hacky way)
- Class functions cannot be invoked, but they are still typeof "function". WTF. Really? If they were changing the semantics anyway, either just make them typeof "class" OR, make invoking the class-function trigger a different method than `constructor`, the problem they were presumably trying to solve. It would be awesome if we could provide a custom method to run when invoking: MyClass(). This would be an excellent way to implement the factory-pattern popular in frameworks like React.
- There is no way to detect if an object is a class other than the ridiculously inefficient: /^class/.test(). Typeof is 30x faster, but insufficient: [jsperf](https://jsperf.com/es6-isclass).
- Iterators return a new object for each iteration. My experience is Javascript's most difficult performance challenge is creating too many objects, thus eventually overloading JavaScript runtime's memory garbage collector. Thus iterators in JavaScript are useless, whenever performance matters:
  - Iterators are 10x slower than normal loops: [jsperf](https://jsperf.com/for-vs-iterators-vs-generators/2)
