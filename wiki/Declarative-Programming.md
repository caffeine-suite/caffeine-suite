Related: [[Functional Oriented Programming]], [[React]]-style programming

### What is Declarative Programming?

> A program that describes what computation should be performed, not how to compute it.

Facebook's [React](https://facebook.github.io/react/) and Imikimi's [ArtReact](https://github.com/imikimi/art-react) are examples of declarative style programming.

### DSL (Domain Specific Languages)

Declarative programming in an imperative language like JavaScript typically takes the form of embedded DSLs. [CaffeineEight](https://github.com/caffeine-suite/caffeine-eight) is a DSL for writing parsers. Below is an example of a complete Json parser using CaffeineEight, written in CaffeineScript.

```coffeescript
class JsonParser extends &CaffeineEight.Parser

  @rule
    root: :array :object

    array:
      "" '[' _? ']'
      "" '[' _? value commaValue* _? ']'

    object:
      "" '{' _? '}'
      "" '{' _? pair commaPair* _? '}'

    commaValue: "" _? ',' _? value
    commaPair:  "" _? ',' _? pair
    pair:       "" string _? ':' _? value

    value: :object :array :number :string :true :false :null

    string: /"(?:[^"\\]|\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4}))*"/
    number: /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/
    true:   /true/
    false:  /false/
    null:   /null/
    _:      /\ +/
```

### CaffeineScript Enhancements for Declarative Programming
* [[Class Definition]] which allows method invocation as well as declaration
* [[Blocks Instead of Brackets]]
* [[Expressive Literals]]
