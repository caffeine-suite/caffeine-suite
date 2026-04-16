[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

### To-EOL Comments

The standard comment in many 'scripting' langauges, hashtag-to-EOL (end-of-line), are supported with one caveat: they must be followed by whitespace(s).
```coffeescript
# a comment
#
# The line above is also a comment

color = #FF0  # <- #FF0 is a string
```

### Block Comments

```
##
  Everything indented after a double ## is a comment.

  Even #, ##, ###, /* and */.

  ##
    Hooray! This means you can block-comment-out another block-comment.

    You can't have block-comments-within-block-comments in:
      C/C++, Java, JavaScript, Ruby, CoffeeScript,
      Objective-C, Swift, Python, Perl...

    You can kind-of do it in the Clojure language, but Clojure doesn't
    have true block-comments. Clojure's (comment ...) macro is
    nestable, but it can't contain arbitrary text. Still, Clojure
    macros are cool. Kudos to Clojure, for a clever combination
    of macros and comments.

##Also, this is a comment
##      This is a comment
##This
  and this
  are comments.
```

###