[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

ES6 EcmaScript6 added a lot of nice things to JavaScript, but didn't address JavaScript's three biggest shortcomings:

* [syntax](#javascript-syntax)
* [everything should return a value](#Everything-Should-Return-a-Value)
* [sharp edges](#javascripts-sharp-edges)


#### CaffeineScript is a Human Language

* It dramatically reduces the number of tokens required to code.
* It ensures everything returns a value, so you can program in a functional way.
* It avoids JavaScript's pitfalls:
  * JavaScript's == and != are dangerous, so CaffeineScript compiles == and != into ===, and !==.

#### JavaScript ES6 is a Machine Language

JavaScript should be considered a machine-language. It is more machine-friendly than human-friendly. And that's great! Like the JVM, it's a runtime that is available on all platforms. Even better than JVM byte-codes, Javascript is vaguely human-readable. As such, it's easy to inspect the generated code and see what's going on under the CaffeineScript hood.

### Javascript Syntax
I strongly believe 'less is more.' Given that, it's no surprise I think JavaScript's syntax is horrible. We can do so much better:
```coffeescript
# CaffeineScript - 19 tokens including only 2 must-match-tokens: #{ and }
import &MyFramework

class HelloMessage extends Component
  render: ->
    Div "" Hello #{@props.name}.

render HelloMessage name: :Bob
```

```javascript
// ES6 - 55 tokens including 22 must-match-tokens: 5 ()'s, 3 {}'s, and one each of ${}, `` and  ''
var {createFactory, render, Div} = require('MyFramework');

var HelloMessage = (class HelloMessage extends Component {
  render: () => Div(`Hello ${this.props.name}.`);
}).createWithPostCreate();

render(HelloMessage({
  name: 'Bob'
}));
```

### Everything Should Return a Value

It's hard to overestimate the negative impact on a language built on first-class-functions (i.e. functions are also values and can be used anywhere any other value can), that contains so much non-functional syntax, i.e. syntax that doesn't return a value:

* JavaScript functions don't return a value, unless you manually add 'return'
* Some of the many JavaScript constructs that don't return values:
  * if statements
  * try statements
  * switch statements
  * 'while' and 'for' loops

### JavaScript's Dangerous Semantics

Read more about how CaffeineScript addresses JavaScript's dangerous [Semantics](./Semantics.md).
