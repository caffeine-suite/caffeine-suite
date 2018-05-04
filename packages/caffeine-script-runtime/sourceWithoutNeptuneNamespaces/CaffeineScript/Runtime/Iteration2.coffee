# PERFORMANCE INFO: https://jsbench.me/r8jgqj6vpd/1
# Currently, the best possible itterator is 1/2 the speed
# of the best pure-for-loop. (Chrome, May-2018)

{isArrayIterable} = require './IterationBase'

existsTest = (a) -> a?
returnTrue = -> true
returnFirst = (a) -> a
returnSecond = (a, b) -> b

module.exports =
  find: (source, withClause, whenClause) ->
    if source?
      unless whenClause || withClause
        whenClause = existsTest

      if isArrayIterable source
        switch
          when whenClause && withClause
            for v, k in source when whenClause v, k
              return withClause v, k

          when whenClause
            for v, k in source when whenClause v, k
              return v

          when withClause
            for v, k in source
              if result = withClause v, k
                return result

      else
        switch
          when whenClause && withClause
            for k, v of source when whenClause v, k
              return withClause v, k

          when whenClause
            for k, v of source when whenClause v, k
              return v

          when withClause
            for k, v of source
              if result = withClause v, k
                return result

  object: (source, withClause = returnFirst, whenClause = returnTrue, into = {}, keyClause) ->

    if isArrayIterable source
      keyClause ?= returnFirst

      for v, k in source when whenClause v, k
        into[keyClause v, k] = withClause v, k

    else
      keyClause ?= returnSecond

      for k, v of source when whenClause v, k
        into[keyClause v, k] = withClause v, k

    into

  array: (source, withClause = returnFirst, whenClause = returnTrue, into = []) ->

    if isArrayIterable source

      for v, k in source when whenClause v, k
        into.push withClause v, k

    else

      for k, v of source when whenClause v, k
        into.push withClause v, k

    into

  each2: (source, withClause = returnFirst, whenClause = returnTrue, into) ->

    into ?= source

    if isArrayIterable source

      for v, k in source when whenClause v, k
        withClause v, k

    else

      for k, v of source when whenClause v, k
        withClause v, k

    into

  ###
  IN:
    fromValue:  number (required)
    toValue:    number (required)
    byValue:    number (optional)
    into:       object implementing .push(v) (optional)
    withClause: (v) -> value-to-push
    whenCluase: (v) -> truish
    til:        t/f; if true, will stop just before v == toValue
  ###
  arrayRange: (fromValue, toValue, withClause = returnFirst, whenClause = returnTrue, byValue, til, into = []) ->

    if byValue == 0
      throw new Error "CaffeineScript array-range comprehension: 'by' is zero. (from: #{fromValue}, to: #{toValue})"

    byValue ?= if fromValue < toValue then 1 else -1

    v = fromValue

    if til
      if byValue > 0
        while v < toValue
          into.push withClause v if whenClause v
          v += byValue

      else
        while v > toValue
          into.push withClause v if whenClause v
          v += byValue

    else
      if byValue > 0
        while v <= toValue
          into.push withClause v if whenClause v
          v += byValue

      else
        while v >= toValue
          into.push withClause v if whenClause v
          v += byValue

    into