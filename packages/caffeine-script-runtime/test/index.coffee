require 'art-standard-lib'
(Neptune.CaffeinScript ||= {}).Runtime = require '../'

require "art-testbench/testing"
.init
  synchronous: true
  defineTests: -> require './tests'
