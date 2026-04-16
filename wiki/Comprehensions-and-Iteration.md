[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Control Structures](./Control-Structures.md) ('while' and 'until' loops are described there)


### Keywords

Each iterates through the source container:

* `array` - returns a new array; values are the results of the with-block
* `object` - returns a new object; values are the results of the with-block
* `find` - stops when the desired result is found; returns the result from the last with-block
* `each` - returns the source container

### Basic Examples

```coffeescript
# new array, with written values doubled before storing them
array  v from 1, 2, 3      with v * 2           # > [2, 4, 6]
array  v from a:1, b:2     with v * 2           # > [2, 4]
array  v from null         with v * 2           # > []

# new object with every property-value doubled
object v from 1, 2, 3      with v * 2           # > 0: 2, 1: 4, 2: 6
object v from a:1, b:2     with v * 2           # > a: 2, b: 4
object v from null         with v * 2           # > {}

# find and return the first value in the source list that is greater than  2
find   v in 1, 2, 3, 2     when v > 2           # > 3
find   v in a:1, b:4, c:1  when v > 2           # > 4

# log or echo each number to the programmer's console
each   v in 1, 2, 3        do console.log v     # > [1, 2, 3]
```

### Comprehensions Translated to English

CaffeineScript's comprehensions are designed to be streamlined versions of English-language sentences.

* `array value, index from source with ...`
  * create a new `array`
  * using each `value` and `index`
  * `from source` 
  * to compute each new element `with ...`

* `object value, key from source with ...`
  * create a new `object`
  * using each `value` and `key`
  * `from source` 
  * to compute each new property-value `with ...`

* `each value, index in source do ...`
  * for `each value` and `index in source`, `do ...`

* `find value in source when ...`
  * `find` the first `value` `in source` `when ...` is true

* `find value in source when ... do ...`
  * `find` the first `value` `in source` `when ...` is true and `do ...`

### Canonical Form

```coffeescript
# one-liner
(array|object|each|find) [myValue[, myKey] from] mySource [into myExpression] [when myExpression] [with myExpression]

# with-block
(array|object|each|find) [myValue[, myKey] from] mySource [into myExpression] [when myExpression] 
  # with-block goes here, last statement is the with-block return-value
  statements
```

### Sources

Sources can be `Arrays`, `Objects`, or false-ish. 

* array-source: values are the array entries, and the keys become the array indices
* object-source: keys and values are the object properties' keys and values. Iteration uses the `for (k in b) {}` method, so it includes own-properties and inherited-properties. To only iterate over own-properties, add a when-clause: `when source.hasOwnProperty key` 
* false-ish values: `when` and `with` are not executed, but the following will be returned for array, object, and find: [], {}, undefined. For 'each', the exact source-value passed in will be returned.

Examples:
* If `mySource` is an array like `[57 12 92]`
  * `myValue` is the value of each element: `57, 12, 92`
  * `myKey` is the index of each element: `0, 1, 2`
* If `mySource` is an object like: `a:57, b:12, c:92`
  * `myValue` is the value of each property: `57, 12, 92`
  * `myKey` is the name of each property: `:a, :b, :c`
* A false-ish `mySource` is treated like an empty array: `[]`

### Default `with` block

The default with-block always returns the current iteration's value:

```coffeescript
array user from users 
# default: with user 
```

There is one special case that follows the rule, but it may surprise you. You can assign to the value-variable in the `when` expression, and that assigned value is what the default-with-block returns:

```coffeescript
# returns username for the first value with a username
find v from users when v = v.username

# returns all usernames, for values with usernames
array v from users when v = v.username

# returns all values that have usernames
array v from users when v.username
```

### Object comprehension `with-key` block

If the comprehension-type is `object`, you can additionally specify a `with-key` block. This works much like the `with` block except its return-value is used as the key when assigned the value to the returned object.

Example:
```coffeescript
object v from 1, 2, 3 with-key :a + v
# out: a1: 1, a2: 2, a3: 3
```

### Into

For `array`, `object`, or `each`, but not 'find', the `into` keyword can override the default return value, and establish the object the values are added to--in the case of `array` or `object`.

```coffeescript
# shall copy into another array
arr1 = 1 2
arr2 = 2 3
array arr2 into arr1
# EFFECT: modifies arr1
# OUT: arr1 
# > 1 2 2 3
```

```coffeescript
# merge one object into another
obj1 = a: 1, b: 2
obj2 = b: 3, c: 3
object obj2 into obj1
# EFFECT: modifies obj1
# OUT: obj1 
# > a: 1, b: 3, c: 3
```

### Range Iteration

If the comprehension type is `array`, instead of iterating over a source array or object, you can instead iterate over a range. To do this, you must specify either a `to` clause or a `til` clause (both is not allowed). There is only one comprehension variable for range iteration, the value of each loop (unlike other iterations where there is a value and key or index).

Range iteration clauses:

* `to`: iterate up to AND INCLUDING its value
* `til`: iterate up to BUT NOT INCLUDING its value
* `from/in`: start-value for the iteration. Default: 0 (yes, unlike any other comprehension, the from-clause is optional for range-iteration)
* `by`: amount to increment, or if negative, decrement, by each iteration. Default: if (toClause || tilClause) > fromClause then 1 else -1.
* `with` and `when`: work just like other comprehensions

Examples:
```coffeescript
array to 5                     # [] 0 1 2 3 4 5
array to -3                    # [] 0 -1 -2 -3
array to 5 by 2                # [] 0 2 4
array til 5                    # [] 0 1 2 3 4
array to 5 with 1              # [] 1 1 1 1 1 1
array a to 5 when a %% 2 == 0  # [] 0 2 4
array from 2 to 5              # [] 2 3 4 5
```

### Examples

#### array
```coffeescript
myArray = 1 2 3

# shallow-clone of myArray
array myArray
# > 1, 2, 3

# with values doubled
array value from myArray with value * 2
# > 2, 4, 6
```

#### object

```coffeescript
# new object where they keys and values are the values from myArray
object myArray
# > 1: 1, 2: 2, 3: 3

# with doubled values
object value from myArray with value * 2
# > 1: 2, 2: 4, 3: 6
```

#### find
```coffeescript
# find the first value greater than 2
find value from myArray when value > 2

# same by using 'with'
find value from myArray with if value > 2 then value
# > 3

# same, but the found-value returned doubled
find value from myArray when value > 2 with value * 2
# > 6
```

#### Shallow Clone 

```coffeescript
# mySource can be an array or object

# OUT: new array of all the values
array mySource
array from mySource
array v from mySource
array v from mySource with v
array v from mySource
  v

# OUT: new object
#   if mySource is an object
#     with all the props from mySource
#   if mySource is an array
#     with all the values mapped to themselves
#     i.e. all the values from the array are
#     assigned with: out[value] = value
object mySource
object from mySource
object v from mySource
object v from mySource with v
object v from mySource
  v

```

### No Tail-Form

Unlike CoffeeScript, *tail-comprehensions are not supported*. They create too many ambiguities, in my opinion don't add significantly to readability, and anyway CaffeineScript has an alternative one-liner-comprehension form using the `with` keyword. 

One big problem with tail-comprehensions is this ambiguity:

```coffeescript
# CoffeeScript
a = v for v in source

# QUESTION: Does CoffeeScript compile the previous line
# to this?
a = for v in source
  v

# or this?
for v in source
  a = v

```

ANSWER: CoffeeScript compiles it to the latter, which, unfortunately, is the least useful option.

CaffeineScript, instead, allows a cleaner and clearer solution:

```coffeescript
# the two options are clearly different:
a = array v from source with v
array v from source with a = v
```

This is one case where having one extra token really helps. However, CaffeineScript gives you ways to streamline common cases:

```coffeescript
# all 3 are the same
a = array v from source with v
a = array v from source
a = array source
```

### Aliases: `with/do`, `in/from` and `into/returning`

Solely for the purpose of readability, two of the keywords have semantically-identical aliases:

* `with` is semantically identical to `do`
* `from` is semantically identical to `in`
* `into` is semantically identical to `returning`

Preferred aliases

Depending on the type of comprehension you are using, different keywords fit natural English better. I suggest using:

```coffeescript
# declarative language:
# 'from' is preferred because it suggests the values and keys are 
#   coming 'from' somewhere and going 'to' somewhere
# 'with' is preferred because it suggests, ideally, that it should be side-effect-free
array ... from ... into ... with
object ... from ... into ... with

# 'do' suggests there is a side-effect 
# (otherwise, 'each' is probably the wrong choice)
each ... in/from ... returning ... do 

# find-in is better english (can a grammar expert tell me why???)
# Maybe because in everyday life you "look in" a box, in order to
# identify its contained objects.
find ... in ... with
find ... in ... when ... do
```