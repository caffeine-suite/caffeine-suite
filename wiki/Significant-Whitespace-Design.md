[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

## Guiding Principle

If comparing two possible interpretations, compare the two under the lens if common code edits and use the principle of least surprise (POLS).

### Example 1

For example, how should we interpret this?

```coffeescript
foo 
  1, 2

# is it this?
foo(1, 2);        # interpretation 1

# or is it this?
foo([1, 2]);      # interpretation 2
```

Now consider these two edits:

```coffeescript
foo 1, 2

# insert new line and indent thus moving "1, 2"
foo 
  1, 2
```

versus:

```coffeescript
foo 
  1, 2

# add second parameter, not touching "1, 2" at all
foo 
  1, 2
  "alice"
```

1. under interpretation 1
  * Inserting a newline+indent doesn't change the interpretation. In other words, inserting a block doesn't do anything.
  * However, adding a second parameter to an existing block changes `foo(1, 2)` into `foo([1, 2],"alice")`. It changes the interpretation of "1, 2" from two parameters into an implicit array.
2. under interpretation 2
  * converting to a block and moving "1, 2" physically in the code changes its interpretation from `foo(1, 2)` to `foo([1, 2])`
  * adding a second parameter, and not touching "1, 2" at all, doesn't change its interpretation at all: `foo([1, 2])` to `foo([1, 2], "alice")`


### Example 2

For example, how should we interpret this?

```coffeescript
# snippet #1
a = 1
# JavaScript: a = 1;

# ----- versus:

# snippet #2
a =  
  1
# JavaScript: ???

# ----- versus:

# snippet #3
a =
  1
  2
# JavaScript: a = [1, 2];
```

The interpretation of #1 and #3 are already fixed at `a = 1;` and `a = [1, 2];` respectively, but how should #2 be interpreted?

Snippet #2 interpretation options:

* `a = 1;`
* `a = [1];`

If I used exactly the same logic as above, in Example #1, I should choose interpretation #2. However, there is something else going on which applies under POLS: what 'kind of thing' are we interpreting in all 3 cases? 

* In the first example, a function invocation, we are expecting a *list*
* In the second example, an assignment, we are expecting a *value*

Via POLS, I think, when we are expecting a value, the default interpretation should be a single value unless, obviously, more than one value is provided.

* Therefor, the correct interpretation of snippet #2 is `a = 1;`

### Example 3

What is the interpretation of snippet #5, below, given snippet #4's interpretation?

```coffeescript
# snippet #4
a = 1, 2
# JavaScript: a = [1, 2];

# snippet #5
a = 
  1, 2
# JavaScript: ???
```

Options:
* `a = [1, 2](./1,-2.md);`
* `a = [1, 2];`

My answer, based on my own POLS, is the second one - the one with just one array. 

NOTE: This may seem inconsistent with example #1 where adding a block changed the interpretation whereas here, adding a block does not. The difference, again, is that in example #1, the CaffeineScript is expecting a *list*, but here CaffeineScript is expecting a *value*.

### Example 4

```coffeescript
# snippet #6
a = 
  1, 2
# JavaScript: a = [1, 2];

# snippet #7
a = 
  1, 2
  3
# JavaScript: a = [[1, 2], 3];
```

In this example, snippet #7 can no longer be reasonably interpreted as a single array, so it is interpreted as two.