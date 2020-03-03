{defineModule, log} = require "art-standard-lib"
Caf = Neptune.CaffeinScript.Runtime

defineModule module, suite: ->
  falseExistsValue = undefined # ultimately this should be false, but for now... because I screwed up and need to refactor...
  test "exists undefined", -> assert.eq falseExistsValue, Caf.exists undefined
  test "exists null",      -> assert.eq falseExistsValue, Caf.exists null
  test "exists 0",      -> assert.eq true, Caf.exists 0
  test "exists ''",      -> assert.eq true, Caf.exists ''
