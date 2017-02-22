require 'art-foundation'
(Neptune.CaffeinScript ||= {}).Runtime = require '../'

require "art-foundation/testing"
.init
  synchronous: true
  defineTests: -> require './tests'
