require 'art-standard-lib'
(Neptune.CaffeinScript ||= {}).Runtime = require '../index.coffee'

require "art-testbench/testing"
.init
  synchronous: true
  defineTests: -> require './tests'
