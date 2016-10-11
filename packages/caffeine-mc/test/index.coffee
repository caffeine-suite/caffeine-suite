{Mocha} = require "art-foundation/dev_tools/test"
require '../index'
Mocha.run ({assert})->
  self.testAssetRoot = "/test/assets"
  require './tests'
