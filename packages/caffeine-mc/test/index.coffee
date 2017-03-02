require '../caffeine-mc'
require "art-foundation/testing"
.init
  synchronous: true
  defineTests: ->
    require './tests'
