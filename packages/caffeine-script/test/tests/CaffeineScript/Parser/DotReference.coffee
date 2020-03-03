{CaffeineScript} = Neptune
{log, formattedInspect} = Neptune.Art.StandardLib
{Parser} = CaffeineScript

{parseTestSuite, illegalSyntaxTests} = require '../Helper'

# module.exports = suite: parseTestSuite
#   basic:
#     "-> .":         "(function(a) {return a;});"
#     "(foo) -> .":         "(function(foo) {return foo;});"
#     "(foo) -> ..":    "(function(foo, b) {return b;});"
#     "-> . - ..":    "(function(a, b) {return a - b;});"
#     "-> . ..":      "(function(a, b) {return [a, b];});"
#     "-> . .. ...":  "(function(a, b, c) {return [a, b, c];});"



#     "list.sort -> .. - .":
#       "list.sort(function(a, b) {return b - a;});"

#   withPropertyName:
#     "-> .foo":      "(function(a) {return a.foo;});"

  # assignableDotReference:
  #   "-> .foo = 123":      "(function(a) {return a.foo = 123;});"

  # comprehensions:
  #   "array a with . + 1": "..."
    # """
    # 3
    # 5 ** .
    # """: "let a = 3; Caf.pow(5, a);"
    # """
    # if a
    #   .
    # """: "asdf"

  # condinuationOnFirstStatement:
  #   "-> - ..":      "(a, b) => a - b"
    # "list.sort -> - ..":
    #   "list.sort((a, b) => a - b)"
