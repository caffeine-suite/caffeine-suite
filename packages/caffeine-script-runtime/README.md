# caffeine-script-runtime [![Build Status](https://travis-ci.org/shanebdavis/caffeine-script-runtime.svg?branch=master)](https://travis-ci.org/shanebdavis/caffeine-script-runtime)

Runtime module required by [CaffeineScript.com](http://CaffeineScript.com)

### Future?

Operator overloading and ruby-truth support


```
# CaffeineStyle truth (same as Ruby)

returns true if a is anothing other than false, null or undefined
isTrue: isTrue = (a) -> a? && a != false

returns true if a is false, null or undefined
isFalse: isFalse = (a) -> a == false || !a?

gt:     (a, b) -> if typeof a == "number" and typeof b == "number" then a > b else a.gt b
lt:     (a, b) -> if typeof a == "number" and typeof b == "number" then a < b else a.lt b
lte:    (a, b) -> if typeof a == "number" and typeof b == "number" then a <= b else a.lte b
gte:    (a, b) -> if typeof a == "number" and typeof b == "number" then a >= b else a.gte b

add:    (a, b) -> if (typeof  a == "number" and typeof b == "number") || (typeof a == "string" and typeof b == "string") then a + b else a.add b
sub:    (a, b) -> if typeof   a == "number" and typeof b == "number" then a - b else a.sub b
mul:    (a, b) -> if typeof   a == "number" and typeof b == "number" then a * b else a.mul b
div:    (a, b) -> if typeof   a == "number" and typeof b == "number" then a / b else a.div b
```