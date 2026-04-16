Related: [[Comprehensions and Iteration]]

### Single Test: `if` and `unless`
```coffeescript
if foo then bar
if foo then bar else baz
if foo
  bar
else
  baz

unless foo then bar else baz
# if !foo then bar else baz
```

#### Return Values

If and Unless return the value returned by their blocks. If there is no else-block and the test is false-for-if or true-for-unless, then `undefined` is returned.

### Multi-Test: `switch`

```coffeescript
switch a
when b then c
when d
  e
else
  f

switch a
  when b then c
  else d
```

NOTE: unlike coffeescript, indentation is optional.

#### Multi-Test Form

As an alternative to if-then-else chains, you can use the switch statement this way:

```coffeescript
switch
when testA then doA
when testB then doB
else elseC

# same as
if testA then doA
else if testB then doB
else elseC
```

Where testA and testB are arbitrary expressions.

#### Return Values

Switch statements return-values work just like if-statements: If one of the switch's cases is selected, the return-value of that case's then-block is returned. If no cases are found, and there is an else-block, the else-block's return-value is returned. Finally, if no cases are found and there is no else-block, `undefined` is returned.

### Basic Loops: `while` and `until`

These give you direct access to JavaScript's basic looping construct: `while`.

COMING SOON: These blocks will define scopes, just like the Caffeine-Specific [[Comprehensions and Iteration]]. See also: [[Scopes and Variables]].

```coffeescript
while foo do bar
while foo
  bar

unless foo do bar
# while !foo do bar
```

#### Return Values

While and Until return the last value returned by their block. (coming soon)

### Disambiguation with Block Invocation

```coffeescript
if foo
    1
  2
# if foo(1) then 2
```

### Tail Forms: `if`, `unless`, `while`, and `until`

There are four tail-forms available for enhanced code readability:

```coffeescript
foo if bar     # if bar then foo
foo unless bar # if !bar then foo
foo while bar  # while bar do foo
foo until bar  # while !bar do foo
```
