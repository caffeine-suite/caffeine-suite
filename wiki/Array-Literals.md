CaffeineScript makes structured literals lightweight and fun! Examples:

```coffeescript

# Array of 3-element Arrays
a = 
  "Bob"    1976  :male
  "Alice"  1978  :female

# Array of 3 objects
b = 
  foo: 1
  foo: 2
  foo: 3
```

### Arrays Literals
```coffeescript
# JavaScript-style - 19 tokens
a = [
  ["Bob",   1976, "male"],
  ["Alice", 1978, "female"]
]

# matchless: blocks and one-liners
a = []
  [] "Bob",   1976, :male
  [] "Alice", 1978, :female

# implicit arrays
a = 
  "Bob",   1976, :male
  "Alice", 1978, :female

# implicit commas - 8 tokens
a = 
  "Bob"    1976  :male
  "Alice"  1978  :female
```

### All Array Literal Forms for 1D Arrays
```coffeescript
# array one-liners
a =   [1, 2, 3]
a = [] 1, 2, 3  # one-liner array without bracket-matching
a =    1, 2, 3  # array is implicit when there are 2 or more elements
a =    1  2  3  # implicit commas after number and string literals

# array block
a = []
  1
  2
  3

# implicit array block
a = 
  1
  2
  3
```
