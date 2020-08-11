{
  defineModule, peek, Promise, dashCase, upperCamelCase,
  ErrorWithInfo, log, merge, present, find, each, w
  mergeInto
  currentSecond
} = require 'art-standard-lib'

workingCache = null

cacheExpiresIn = 1 # seconds
workingCacheLastResetAt = currentSecond() - cacheExpiresIn * 10

module.exports =

  checkWorkingCacheExpiration: ->
    if currentSecond() - workingCacheLastResetAt > cacheExpiresIn
      resetWorkingCache()

  resetWorkingCache: resetWorkingCache = ->
      workingCache = {}

  cacheRead:  cacheRead = (key, p) -> workingCache[key]?[p]
  cacheWrite: cacheWrite = (key, p, v) -> (workingCache[key]?={})[p] = v

  cacheable: (key, f) ->
    (p) ->
      if (v = cacheRead key, p)?
        # log "cacheHit #{key}:#{p}"
        v
      else
        # log cacheMiss: {key, p, r: f p}
        cacheWrite key, p, f p

resetWorkingCache()
