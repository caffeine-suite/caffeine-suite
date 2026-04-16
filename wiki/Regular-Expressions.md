TODO - fill in a more detailed description

```coffeescript
# normal javascript regexp work:
/abc/i

# block regexp works mostly like CoffeeScript's except:
#  a) it's in a CaffeineScript block, so you only need the opening ///
#  b) modifiers appear immediately after the initial ///. Ex: "///i matchthis"
#  c) only modifiers, a space or a new-line can follow the initial /// characters.
///i Match THIS but IGNORE CASE
///i
  Match THIS but IGNORE CASE

/// Match THIS with the EXACT CASE
///
  Match THIS with the EXACT CASE
  # oh, and, like CoffeeScript, we you can add comments!

# NOTE: like CoffeeScript, whitespace is ignored except for "\ "
# Therefor, above, we are really matching: /MatchTHISwiththeEXACTCASE/
```

See: [CoffeeScript: Block Regular Expressions](http://coffeescript.org/) for more info. Note, when they say 'block' they mean 'bracketed'