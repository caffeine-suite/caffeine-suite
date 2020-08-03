# PERFORMANCE INFO: https://jsbench.me/r8jgqj6vpd/1
# Currently, the best possible itterator is 1/2 the speed
# of the best pure-for-loop. (Chrome, May-2018)

{isArrayIterable} = require './Types'

existsTest = (a) -> a?
returnTrue = -> true
returnFirst = (a) -> a
returnSecond = (a, b) -> b

module.exports =
  isArrayIterable: isArrayIterable
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
    null

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

  reduce: (source, withClause = returnFirst, whenClause = returnTrue, inject) ->
    if isArrayIterable source

      for v, k in source when v != undefined && whenClause inject, v, k
        inject = if inject == undefined then v
        else withClause inject, v, k
    else

      for k, v of source when v != undefined && whenClause inject, v, k
        inject = if inject == undefined then v
        else withClause inject, v, k

    inject

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
