### Undefined is Unfortunate

In my opinion, there is no need for two non-values. It just creates confusion without really resolving anything. For example, there are still important semantic differences between: `{a: undefined}` and `{}`. 

### Undefined and CaffeineScript

Since we compile to JavaScript, and we want to be able to interoperate with the rest of the JavaScript community, we can't completely ignore undefined. However, we can project an opinion about how undefined should and should-not be used. My guiding principle is:

* Undefined is reserved for a variable or property which has not been assigned a value.

Which implies the following:

* CaffeineScript returns null for all other types of non-values. UPDATE: since `null >= 0` is true, I'm going to follow CoffeeScripts guide for the time being and return undefined everywhere.
* Good CaffeineScript code avoids assigning undefined to a variable or property.
* A property with a undefined value should be considered non-existent.

### Undefined Exceptions

Another unfortunate concept in JavaScript is that reading a declared-but-not-yet-assigned variable returns an undefined value, but reading a not-yet-defined *global* variable is an exception. On the other hand, reading a property which does not exist, vs one which does exist but has the value *undefined*, both return *undefined* without error.

* CaffeineScript never throws an error for accessing an undefined value.

### Undefined and JSON

Undefined is an illegal JSON value. That's good, but it makes undefined even more of a pain.