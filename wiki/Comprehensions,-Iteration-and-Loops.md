[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

#### Basic forms
```coffeescript
# all these return a new array, containing every value that was in mySource
array mySource
array myValue in mySource
array myValue in mySource with myValue
array myIndex, myValue in mySource with myValue

# with-clause specified as a block
array myIndex, myValue in mySource
  myValue
```

#### Types

Comprehensions start with a reserved word which indicates the *type* of the comprehension. The types are:

* True Comprehensions
  * `array` returns a new array
  * `object` returns a new object
* Comprehension-like loops
  * `each` returns the fromClause value or the value specified in the variableDefinition
  * `find`
    * with whenClause: returns the value of the first withClause and stops
    * without whenClause: returns the first, present value returned from withClause and stops
    * returns `null` if the iteration completes without finding a value.

#### Syntax

```coffeescript
comprehension: type /from|in/? fromClause optionalClauses
comprehension: type variableDefinition /from|in/ fromClause optionalClauses

type:       /object|array|each|find/
fromClause: expression

optionalClauses: intoClause? byClause? whenClause? withClause?
intoClause: /into/     expression
byClause:   /by/       expression
whenClause: /when/     expression
withClause: /with|do/  expression
withClause: block

variableDefinition: functionParams
```

#### Variable Definition

Variable definition uses the same syntax as function parameters - without the parentheses. Order matters, as does the number of parameters:

* 0 variables - You don't have to specify any variables. Since the with-clause returns the value from each iteration by default, this can be useful. Usually you'll want to be able to access one or more of the loop variables.
* 1 variable: value
* 2 variables: key, value
* 3 variables: key, value, out

Where:
* key: is the index or property-name for the current value
* value: the current value
* out: the value the comprehension will return

Each iteration of the loop sets 'key', 'value' and 'out'.

#### When
```coffeescript
# create a new array
# from every value in mySource
# that is true for: myTest value
array value in mySource when myTest value
```